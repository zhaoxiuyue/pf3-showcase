// Copyright 2026 Xiuyue Zhao (Elara)
// SPDX-License-Identifier: Apache-2.0
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import Ajv2020 from 'ajv/dist/2020.js';
import { createHandoff } from '../demo/handoff.mjs';

const root = new URL('../', import.meta.url);
const readJSON = async path => JSON.parse(await readFile(new URL(path, root), 'utf8'));
const schema = await readJSON('protocol/handoff.schema.json');
const ajv = new Ajv2020({ strict: true, allErrors: true });
const validate = ajv.compile(schema);
let messages = 0;

const check = (value, label) => {
  assert.equal(validate(value), true, `${label}: ${ajv.errorsText(validate.errors)}`);
  messages += 1;
};

for (const [filename, definition] of [
  ['state.json', 'state'],
  ['write-request.json', 'writeRequest'],
  ['write-conflict.json', 'writeConflict'],
]) {
  const message = await readJSON(`protocol/examples/${filename}`);
  check(message, filename);
  const validateType = ajv.compile({ $ref: `${schema.$id}#/$defs/${definition}` });
  assert.equal(validateType(message), true, `${filename}: ${ajv.errorsText(validateType.errors)}`);
}

const trace = await readJSON('protocol/examples/exchange-trace.json');
assert.equal(validate(trace), false, 'The exchange trace wrapper is not a single protocol message');
check(trace.initial, 'trace.initial');
const handoff = createHandoff(trace.initial);

for (const [index, step] of trace.steps.entries()) {
  if (step.request) check(step.request, `trace.steps[${index}].request`);
  check(step.result, `trace.steps[${index}].result`);
  assert.deepEqual(handoff[step.action](step.request), step.result, `Replay mismatch at step ${index + 1}`);
}

console.log(`Schema/examples: ${messages} valid messages; ${trace.steps.length} exchange steps replayed; trace wrapper correctly rejected.`);

// Copyright 2026 Xiuyue Zhao (Elara)
// SPDX-License-Identifier: Apache-2.0
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
const script = fileURLToPath(new URL('../demo/run.mjs', import.meta.url));
const run = (...args) => execFileSync(process.execPath, [script, ...args], { encoding: 'utf8' });
const blocks = output => [...output.matchAll(/^(\{[\s\S]*?^\}|\[[\s\S]*?^\])/gm)].map(match => JSON.parse(match[0]));
test('the default CLI stays English through conflict and recovery', () => {
  const output = run();
  assert.doesNotMatch(output, /\p{Script=Han}/u);
  assert.match(output, /No models, MCP or complete PF3 service are connected/);
  const [initial, accepted, conflict, fresh, continued, receipts] = blocks(output);
  assert.equal(initial.revision, 1);
  assert.deepEqual(fresh, accepted.state);
  assert.equal(conflict.error.code, 'cas_conflict');
  assert.match(conflict.error.message, /reread/);
  assert.equal(continued.state.revision, 3);
  assert.equal(receipts.length, 2);
  assert.equal(receipts[1].actor, 'B');
});
test('the Chinese entry follows the same transitions and receipt identities', () => {
  const english = blocks(run());
  const output = run('zh');
  assert.match(output, /状态已变化；重新读取后再决定怎样继续/);
  const chinese = blocks(output);
  assert.deepEqual(chinese[5], english[5]);
  assert.deepEqual(chinese[3], chinese[1].state);
  assert.equal(chinese[4].state.revision, english[4].state.revision);
  assert.equal(chinese[2].error.code, english[2].error.code);
});

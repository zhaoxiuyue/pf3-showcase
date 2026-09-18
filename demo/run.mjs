// Copyright 2026 Xiuyue Zhao (Elara)
// SPDX-License-Identifier: Apache-2.0
import { createHandoff } from './handoff.mjs';
import { messages } from './messages.mjs';

const language = process.argv[2] ?? 'en';
if (process.argv.length > 3 || !Object.hasOwn(messages, language)) {
  console.error('Usage: node demo/run.mjs [en|zh]');
  process.exit(2);
}
const text = messages[language];
const stateText = ([summary, nextStep]) => ({ summary, nextStep });
const handoff = createHandoff(stateText(text.initial));
const print = (label, value) => {
  // Localize the displayed error only, without changing the reference result.
  const display = value?.error?.code === 'cas_conflict'
    ? { ...value, error: { ...value.error, message: text.conflict } }
    : value;
  console.log(`\n${label}\n${JSON.stringify(display, null, 2)}`);
};
console.log(text.title);
console.log(text.scope);
const aRead = handoff.read();
const bRead = handoff.read();
print(text.labels[0], aRead);
const accepted = handoff.write({ actor: 'A', expectedRevision: aRead.revision, ...stateText(text.first) });
print(text.labels[1], accepted);
const stale = handoff.write({ actor: 'B', expectedRevision: bRead.revision, ...stateText(text.stale) });
print(text.labels[2], stale);
const fresh = handoff.read();
print(text.labels[3], fresh);
const continued = handoff.write({ actor: 'B', expectedRevision: fresh.revision,
  summary: fresh.summary + text.continued, nextStep: text.next });
print(text.labels[4], continued);
print(text.labels[5], handoff.readReceipts());
if (!accepted.ok || stale.ok || stale.error.code !== 'cas_conflict' || !continued.ok) {
  console.error(text.failure);
  process.exitCode = 1;
}

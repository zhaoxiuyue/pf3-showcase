// Copyright 2026 Xiuyue Zhao (Elara)
// SPDX-License-Identifier: Apache-2.0
import { createHandoff } from '../../demo/handoff.mjs';

function freezeOutput(value) {
  if (value !== null && typeof value === 'object') {
    for (const child of Object.values(value)) freezeOutput(child);
    Object.freeze(value);
  }
  return value;
}

// Positive control: the reference already returns detached values.
// Freeze only those public outputs, preserving the underlying behavior.
export function createFrozenHandoff(initial) {
  const handoff = createHandoff(initial);
  return {
    read: () => freezeOutput(handoff.read()),
    write: request => freezeOutput(handoff.write(request)),
    readReceipts: () => freezeOutput(handoff.readReceipts()),
  };
}

// Copyright 2026 Xiuyue Zhao (Elara)
// SPDX-License-Identifier: Apache-2.0
// Independent example; this is not the private PF3 state model or command layer.

function requireText(value, name) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new TypeError(`${name} must be a non-empty string`);
  }
}

export function createHandoff({ summary, nextStep }) {
  requireText(summary, 'summary');
  requireText(nextStep, 'nextStep');
  let current = { revision: 1, summary, nextStep };
  const receipts = [];

  return {
    read() {
      return structuredClone(current);
    },

    write({ expectedRevision, summary, nextStep, actor }) {
      requireText(summary, 'summary');
      requireText(nextStep, 'nextStep');
      requireText(actor, 'actor');
      if (!Number.isSafeInteger(expectedRevision) || expectedRevision < 1) {
        throw new TypeError('expectedRevision must be a positive integer');
      }
      if (expectedRevision !== current.revision) {
        return {
          ok: false,
          error: {
            code: 'cas_conflict',
            expectedRevision,
            currentRevision: current.revision,
            message: '状态已变化；重新读取后再决定怎样继续。',
          },
        };
      }
      const receipt = {
        id: `demo_receipt_${receipts.length + 1}`,
        actor,
        beforeRevision: current.revision,
        afterRevision: current.revision + 1,
      };
      current = { revision: receipt.afterRevision, summary, nextStep };
      receipts.push(receipt);
      return { ok: true, receipt: structuredClone(receipt), state: structuredClone(current) };
    },

    readReceipts() {
      return structuredClone(receipts);
    },
  };
}

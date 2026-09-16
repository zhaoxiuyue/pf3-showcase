// Copyright 2026 Xiuyue Zhao (Elara)
// SPDX-License-Identifier: Apache-2.0
import test from 'node:test';
import assert from 'node:assert/strict';

export function registerHandoffContractTests(createHandoff) {
  const fresh = () => createHandoff({ summary: '已确定任务', nextStep: '验证第一次交接' });
  const write = (handoff, expectedRevision, actor = 'A') => handoff.write({
    expectedRevision, actor, summary: `${actor} 的进度`, nextStep: '接着读最新状态',
  });

  test('两个客户端持有同一版本时，后写入不会覆盖先写入的结果或产生成功回执', () => {
    const handoff = fresh();
    const a = handoff.read();
    const b = handoff.read();
    const accepted = write(handoff, a.revision);
    const beforeConflict = structuredClone(handoff.read());
    const receiptsBeforeConflict = structuredClone(handoff.readReceipts());
    const refused = write(handoff, b.revision, 'B');
    assert.equal(accepted.ok, true);
    assert.equal(accepted.receipt.actor, 'A');
    assert.equal(accepted.receipt.beforeRevision, 1);
    assert.equal(accepted.receipt.afterRevision, 2);
    assert.deepEqual(accepted.state, handoff.read());
    assert.equal(refused.ok, false);
    assert.equal(refused.error.code, 'cas_conflict');
    assert.equal(refused.error.currentRevision, 2);
    assert.equal(refused.error.expectedRevision, 1);
    assert.equal(typeof refused.error.message, 'string');
    assert.ok(refused.error.message.trim());
    assert.deepEqual(handoff.read(), beforeConflict);
    assert.deepEqual(handoff.readReceipts(), receiptsBeforeConflict);
  });

  test('被拒绝的客户端重读后，可以根据新进度续接，回执按顺序衔接', () => {
    const handoff = fresh();
    write(handoff, 1);
    assert.equal(write(handoff, 1, 'B').ok, false);
    const latest = handoff.read();
    assert.equal(latest.summary, 'A 的进度');
    const continued = handoff.write({
      actor: 'B', expectedRevision: latest.revision,
      summary: latest.summary + '；B 接着完成', nextStep: '共同验收',
    });
    assert.equal(continued.ok, true);
    assert.equal(handoff.read().revision, 3);
    assert.equal(handoff.read().summary, 'A 的进度；B 接着完成');
    assert.deepEqual(handoff.readReceipts().map(r => [r.beforeRevision, r.afterRevision]), [[1, 2], [2, 3]]);
    const ids = handoff.readReceipts().map(r => r.id);
    assert.ok(ids.every(id => typeof id === 'string' && id.trim()));
    assert.equal(new Set(ids).size, ids.length);
  });

  test('调用者修改读取快照或返回回执，不能绕过写入口改变共享状态', () => {
    const handoff = fresh();
    const beforeRead = structuredClone(handoff.read());
    const snapshot = handoff.read();
    snapshot.summary = '擅自修改快照';
    assert.deepEqual(handoff.read(), beforeRead);
    assert.deepEqual(handoff.readReceipts(), []);

    const accepted = write(handoff, 1);
    const beforeMutation = structuredClone(handoff.read());
    const receiptsBeforeMutation = structuredClone(handoff.readReceipts());
    accepted.state.revision = 99;
    accepted.state.summary = '擅自修改写入响应';
    accepted.state.nextStep = '跳过正式写入';
    assert.deepEqual(handoff.read(), beforeMutation);

    accepted.receipt.afterRevision = 99;
    assert.deepEqual(handoff.readReceipts(), receiptsBeforeMutation);

    const receipts = handoff.readReceipts();
    receipts[0].actor = '改名';
    receipts.push({});
    assert.deepEqual(handoff.read(), beforeMutation);
    assert.deepEqual(handoff.readReceipts(), receiptsBeforeMutation);
  });

  test('每一次无效写入都保持完整状态与回执不变', () => {
    const handoff = fresh();
    // Clone the baseline independently: a faulty read() may expose shared state.
    const assertRejectedWithoutMutation = request => {
      const before = structuredClone(handoff.read());
      const receiptsBefore = structuredClone(handoff.readReceipts());
      assert.throws(() => handoff.write(request), TypeError);
      assert.deepEqual(handoff.read(), before);
      assert.deepEqual(handoff.readReceipts(), receiptsBefore);
    };
    for (const revision of [undefined, 0, -1, 1.2, '1', NaN, Infinity, Number.MAX_SAFE_INTEGER + 1]) {
      assertRejectedWithoutMutation({ actor: 'A', expectedRevision: revision, summary: '进度', nextStep: '继续' });
    }
    for (const field of ['actor', 'summary', 'nextStep']) {
      for (const invalidText of ['', ' \t\n', undefined, null, 42]) {
        assertRejectedWithoutMutation({ actor: 'A', expectedRevision: 1, summary: '进度', nextStep: '继续', [field]: invalidText });
      }
    }
  });

  test('初始化要求非空的摘要与下一步', () => {
    for (const field of ['summary', 'nextStep']) {
      for (const invalidText of ['', ' \t\n', undefined, null, 42]) {
        assert.throws(() => createHandoff({ summary: '已确定任务', nextStep: '验证第一次交接', [field]: invalidText }), TypeError);
      }
    }
    const handoff = fresh();
    assert.deepEqual(handoff.read(), { revision: 1, summary: '已确定任务', nextStep: '验证第一次交接' });
    assert.deepEqual(handoff.readReceipts(), []);
  });

  test('两个独立示例不会共享状态', () => {
    const first = fresh();
    const second = fresh();
    write(first, 1);
    assert.equal(first.read().revision, 2);
    assert.equal(second.read().revision, 1);
    assert.deepEqual(second.readReceipts(), []);
  });
}

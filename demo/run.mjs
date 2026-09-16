// Copyright 2026 Xiuyue Zhao (Elara)
// SPDX-License-Identifier: Apache-2.0
import { createHandoff } from './handoff.mjs';

const handoff = createHandoff({
  summary: '已确定要演示的任务：让两个客户端接着同一份状态工作。',
  nextStep: '完成第一次写入，并观察旧版本会发生什么。',
});
const print = (label, value) => console.log(`\n${label}\n${JSON.stringify(value, null, 2)}`);

console.log('PF3 Showcase · 独立交接示例');
console.log('合成任务；一个进程模拟 A/B 两个客户端；不连接模型、MCP 或私有 PF3。');
const aRead = handoff.read();
const bRead = handoff.read();
print('1. A 与 B 都读取 revision 1', aRead);

const accepted = handoff.write({
  actor: 'A',
  expectedRevision: aRead.revision,
  summary: 'A 已完成首次写入，下一位接手者应该基于这个结果继续。',
  nextStep: '让 B 检查它读取的版本是否仍有效。',
});
print('2. A 写入成功：revision 1 → 2', accepted);

const stale = handoff.write({
  actor: 'B',
  expectedRevision: bRead.revision,
  summary: 'B 还拿着旧摘要，尝试写下另一份进度。',
  nextStep: '这一条不应该覆盖 A 的结果。',
});
print('3. B 的旧版本被拒绝，当前状态没有改变', stale);

const fresh = handoff.read();
print('4. B 重新读取，看到 A 留下的进度', fresh);
const continued = handoff.write({
  actor: 'B',
  expectedRevision: fresh.revision,
  summary: `${fresh.summary} B 已读取并接着处理。`,
  nextStep: '选择一个自己的真实小任务，讨论需要怎样接入现有流程。',
});
print('5. B 基于新版本继续：revision 2 → 3', continued);
print('留下的两张写入回执', handoff.readReceipts());

if (!accepted.ok || stale.ok || stale.error.code !== 'cas_conflict' || !continued.ok) {
  process.exitCode = 1;
}

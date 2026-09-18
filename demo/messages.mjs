// Copyright 2026 Xiuyue Zhao (Elara)
// SPDX-License-Identifier: Apache-2.0
// Presentation text only; both languages use the same unchanged reference implementation.
export const messages = {
  "en": {
    "title": "PF3 Showcase · Protocol demo",
    "scope": "Synthetic task; one process simulates clients A/B. No models, MCP or complete PF3 service are connected.",
    "initial": [
      "The task is agreed: let two clients continue from the same shared state.",
      "Complete the first write and observe what happens to a stale version."
    ],
    "first": [
      "A completed the first write. The next client should continue from this result.",
      "Ask B to check whether its previously read version is still current."
    ],
    "stale": [
      "B is still using the old summary and tries to record different progress.",
      "This write must not overwrite A’s result."
    ],
    "continued": " B reread the state and continued the work.",
    "next": "Inspect the protocol and adapt the example to a small task of your own.",
    "labels": [
      "1. A and B both read revision 1",
      "2. A writes successfully: revision 1 → 2",
      "3. B’s stale write is refused; shared state is unchanged",
      "4. B rereads and sees the progress left by A",
      "5. B continues from the fresh version: revision 2 → 3",
      "The two write receipts"
    ],
    "conflict": "The state has changed; reread it before deciding how to continue.",
    "failure": "Protocol demo failed: an expected outcome was not observed."
  },
  "zh": {
    "title": "PF3 Showcase · 协议示例",
    "scope": "合成任务；一个进程模拟 A/B 两个客户端；不连接模型、MCP 或完整 PF3 服务。",
    "initial": [
      "已确定要演示的任务：让两个客户端接着同一份状态工作。",
      "完成第一次写入，并观察旧版本会发生什么。"
    ],
    "first": [
      "A 已完成首次写入，下一位接手者应该基于这个结果继续。",
      "让 B 检查它读取的版本是否仍有效。"
    ],
    "stale": [
      "B 还拿着旧摘要，尝试写下另一份进度。",
      "这一条不应该覆盖 A 的结果。"
    ],
    "continued": " B 已读取并接着处理。",
    "next": "阅读协议，并把示例用于一个自己的小任务。",
    "labels": [
      "1. A 与 B 都读取 revision 1",
      "2. A 写入成功：revision 1 → 2",
      "3. B 的旧版本被拒绝，当前状态没有改变",
      "4. B 重新读取，看到 A 留下的进度",
      "5. B 基于新版本继续：revision 2 → 3",
      "留下的两张写入回执"
    ],
    "conflict": "状态已变化；重新读取后再决定怎样继续。",
    "failure": "协议示例失败：未观察到预期结果。"
  }
};

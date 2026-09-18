# Evidence and scope

[中文](#实测证据与范围) · [Showcase overview](../README.md)

- **Runnable checks:** the independent protocol demo, contract tests and schema examples verify the behavior they execute. They do not connect to the private PF3 service.
- **Real project records:** the [MountainRS case](mountainrs.md) includes the original September 17 interface capture, the September 18 resume output with rules and asset locations, and separate node reads at the same project and route revisions. These are recorded reads, not a transcript of an AI completing the project.
- **Research artifacts:** [MountainRS is public](https://github.com/zhaoxiuyue/MountainRS/blob/main/README.en.md), including reports and selected Stage 7.6 result tables. Most large inputs and outputs remain outside Git; the repository alone does not support a full research rerun.
- **Earlier synthetic check:** the CAS image and [recorded refusals](recorded-refusals.json) below come from synthetic in-memory calls to full PF3 v0.28.6 on September 12. Actors were simulated; this is a different implementation from the public protocol example.
- **Historical scale:** the author's September 11 snapshot counted 12 projects, 224 nodes and 1,776 receipts. These counts are not adoption, customer or third-party validation figures. Current experience is one owner working with multiple AI clients.

# 实测证据与范围

| 材料 | 来源 | 能验证什么 |
|---|---|---|
| 协议、`demo/`、`conformance/` 与 `tests/` | 本仓库的独立实现 | 可亲自运行一个小范围的版本交接闭环，或替换实现后运行契约测试 |
| [MountainRS 项目树](mountainrs.zh-CN.md) | 2026-09-17 获所有者授权读取的真实项目；项目 revision 6、路线 revision 100 | 查看真实界面截图、英文译文和 36 个节点的状态；两条失败路线及一条暂停路线保留原因原文 |
| [MountainRS 续接读取](mountainrs.zh-CN.md#从续接包读到原始记录) | 2026-09-18 实时读取，项目 revision 6、路线 revision 100 | 真实续接包原文、英文翻译和另外三次节点读取；包含规则正文与资产位置，不是模型执行实录 |
| 下方 CAS 截图与 JSON 摘录 | 完整 PF3 v0.28.6，2026-09-12 合成内存库调用 | 作者当时观察到的成功与旧版本拒绝返回 |
| 使用统计 | 作者 2026-09-11 的历史快照 | 项目背景，不是外部客户采用或第三方核验 |

运行本仓库不会连接私有 PF3。读取记录文件也不是重新执行一次完整产品测试。这个包包含获准公开的 MountainRS 记录摘录；完整实现、内部测试和其他运行数据仍不在分发范围内。

[MountainRS 科研仓库](https://github.com/zhaoxiuyue/MountainRS)现已公开，可查看报告、精选结果表与项目管理复盘；多数大型输入与输出仍不随仓库分发。

## 同一旧版本，两次写入

![A 成功后，B 携带旧 revision 的写入收到 cas_conflict](screenshots/cas-conflict.png)

A、B 都基于 revision 1。A 的回执记录 1 → 2，B 返回 `cas_conflict` 并报告当前 revision 2。截图是实际命令返回的排版展示；调用者由合成 actor 模拟。

[JSON 摘录](recorded-refusals.json)保留精选字段，ID 省略；错误文字与版本值保持记录原值。完整 PF3 的返回结构与公开小协议并不相同，不能用该摘录当作公开协议的消息样例；单条协议消息见 [write-conflict.json](../protocol/examples/write-conflict.json)，完整交接过程见[消息轨迹](../protocol/examples/exchange-trace.json)。

## 使用规模与局限

作者历史快照：12 个项目、224 个节点、1776 张回执。回执数量不是独立用户、付费客户、正确结论或全部可撤销写入的数量。

完整 PF3 当前的使用场景是单个所有者、多 AI 客户端。外部可迁移性、多人流程与企业接入需要具体场景验证。可以从 [合作说明](../COLLABORATE.md) 中的一次小范围验证开始。

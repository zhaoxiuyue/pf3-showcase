# PF3 Showcase · Project Forest 3

**多个 AI 窗口，接着同一份项目状态干活。**

[English](README.md) · [设计说明](docs/design.zh-CN.md) · [运行示例](#几分钟跑通交接) · [交接协议](protocol/README.zh-CN.md) · [与 Elara 合作](COLLABORATE.md)

PF3 帮助新 AI 窗口接续长期项目：找到当前任务，理解已有决定和失败尝试，再留下下一位接手者可以使用的结果。

项目模型用路线组织工作，以五种节点状态区分进度与结论。已执行的尝试保留结论，规则有明确作用范围，续接包汇集当前任务、适用约束和写回所用的版本。[设计说明](docs/design.zh-CN.md)解释这些选择及其代价。

我是 **Elara**，PF3 的设计与建设者。我做 **AI 协作流程设计、MCP 与工具接入、定制原型开发**，希望找到有真实问题、愿意一起验证结果的合作伙伴。

这个 Showcase 把设计说明与可运行的**交接协议草案、JSON Schema、独立参考实现与契约测试**放在一起。示例通过乐观版本校验，展示其中一项性质：旧窗口的写回无法静默覆盖更新后的共享状态。

![PF3 合成项目视图：失败原因、暂停原因、当前任务与后续节点](docs/screenshots/demo-tree.png)

*使用合成 PF3 项目的产品视图。见[范围与证据](#范围与证据)。*

## 几分钟跑通交接

需要 **Node.js ≥ 24**。演示与契约测试只使用 Node 内置模块，在本地运行。

```sh
git clone https://github.com/zhaoxiuyue/pf3-showcase.git
cd pf3-showcase
npm run demo
npm test
```

测试命令会对参考实现与 frozen 返回值的合法对照实现，各运行同样的六项契约检查。见 [v0.2.3 对照验证](docs/contract-audit-v0.2.3.md)。

你会看到：

1. A、B 都读取 revision 1 的摘要和下一步。
2. A 写入新进展，收到回执，状态变为 revision 2。
3. B 带旧 revision 1 写入，被 `cas_conflict` 拒绝，原状态保持不变。
4. B 重读 revision 2，理解 A 的进展后继续，状态变为 revision 3。

示例数据保存在内存里，随进程结束。

## 工程检查

```sh
npm ci
npm run verify
```

`npm ci` 安装 lockfile 固定的开发用 Schema 校验器。`npm run verify` 依次运行原有契约测试、Schema/示例验证与消息轨迹重放，再核对导出清单的文件列表、字节数和 SHA256。

[CI](https://github.com/zhaoxiuyue/pf3-showcase/actions/workflows/ci.yml) 在 Linux、macOS、Windows 上分别使用 Node 24 和 26 执行三项检查。见[工程验证记录](docs/engineering-v0.2.4.md)。

## 从哪里开始看

展示包版本为 **0.2.6**，协议为 **PF3 Handoff v0.1 draft**。Schema 本轮未改动，`$id` 仍固定到 `v0.2.1`；[协议文档](protocol/README.zh-CN.md#版本与示例)说明单条消息与交接轨迹的区别。

| 内容 | 可以拿来做什么 |
|---|---|
| [设计说明](docs/design.zh-CN.md) | 五状态、路线版本、执行记录保留与规则分层背后的取舍 |
| [交接协议 v0.1 草案](protocol/README.zh-CN.md) | 理解读状态、声明版本、写入、拒绝与重读的行为约定 |
| [JSON Schema](protocol/handoff.schema.json)、[单条消息](protocol/examples/state.json)与[交接轨迹](protocol/examples/exchange-trace.json) | 检查字段结构，制作自己的接入样例 |
| [独立参考实现](demo/handoff.mjs) | 修改摘要与下一步，观察版本和回执如何变化 |
| [可复用契约测试](conformance/handoff.mjs) | 将自己的同步 JavaScript 实现接到同一组行为检查 |
| [实测材料与范围](docs/evidence.md) | 区分可亲自运行的示例、作者记录与实际产品能力 |

![合成库的实际命令返回：先写成功，后写因旧版本被拒绝](docs/screenshots/cas-conflict.png)

*2026-09-12 完整 PF3 命令返回的并排排版。[返回摘录与上下文](docs/evidence.md)。*

## 范围与证据

- **可运行的内容：** PF3 Handoff v0.1 草案、Schema、独立内存实现和有限范围的契约测试。它们覆盖公开的交接行为；传输、持久化、权限与完整 PF3 服务接入，需要另外实现和验证。
- **概念与演示：** 设计说明和合成截图介绍完整 PF3 的项目模型。完整实现与运行数据保留私有；可运行示例实现其中的小型交接约定，通过测试只为实际执行的用例提供证据。
- **目前的使用经验：** PF3 用于作者自己的多项目、多 AI 客户端工作流。[实测记录与局限](docs/evidence.md)区分作者记录和可复现检查；团队与企业场景通过具体试点评估。

## 从作品到合作

适合带来的问题：换窗口后反复解释、AI 与现有工具接不上、结果散落难以接手、工作完成后难以核验。

优先从一个**范围清楚、能运行、有验收标准的付费验证**开始。了解现有流程与可提供的材料后，再约定报价和排期。也欢迎联合开发，请说明你能提供的场景、技术、用户或持续投入。

**[合作方向与联系模板](COLLABORATE.md)** · **Elara：[XiuyueZhao@outlook.com](mailto:XiuyueZhao@outlook.com)**

## 许可

除 `docs/` 外，随包分发的协议、Schema、参考代码与测试采用 [Apache-2.0](LICENSE)；`docs/` 下的文字、记录与图片采用 [CC BY 4.0](docs/LICENSE-docs.md)。另见 [NOTICE](NOTICE)。后续证据里程碑见[路线图](docs/roadmap.md#中文)。

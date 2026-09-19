# PF3 Showcase · Project Forest 3

**在网页里设计和审查，在本地推进实现，共用一份项目状态。**

[English](README.md) · [真实协作案例](#一个真实项目mountainrs) · [设计说明](docs/design.zh-CN.md) · [Protocol demo](#几分钟跑通交接)

PF3 用一棵共享项目树连接架构讨论、路线审计与本地执行，保存任务、决定、适用规则和执行结果。

这个仓库提供 **MountainRS 真实协作案例、PF3 原始界面截图、设计说明，以及可以本地运行的独立协议示例**。

## 从网页讨论到本地执行

一个方案在网页讨论里可能很完整，但它依赖的前提，在本地文件里未必存在。执行中发现了缺口，讨论窗口也需要读到发生了什么。

接入 PF3 的网页 chat 与本地客户端，围绕同一份项目状态工作：

1. **设计与审查：** 读取目标、路线、当前契约与相关历史，提出设计或指出缺失的前提。
2. **核验与执行：** 检查本地文件、验证假设并推进约定工作，记录结果、问题与依据引用。
3. **再次审查：** 读取这些发现，决定路线怎样调整，把决定留给下一位参与者。

人和 Agent 把有用的发现写入 PF3，新窗口读取已保存的状态，再按需查看引用。谁能处置提议，取决于所有者的决定、各客户端可用的工具与该项目的规则。

## 一个真实项目：MountainRS

在 Elara 的 MountainRS 科研工作流中，**ChatGPT 网页、Claude Code 与 Codex 使用同一棵 PF3 树**。[项目管理复盘](https://github.com/zhaoxiuyue/MountainRS/blob/b609450b8c1cea920df2bc256dbab1e55683c302/docs/one-tree-three-clients.md#三三个角色一个真相源)记录了网页讨论、本地事实检查与所有者裁决的分工。

其中一次往返是这样的：

- **方案中的前提：** Stage 7.3 合同依赖上游已经提供空间评估块所需的七项定义。
- **本地发现：** 读取四份冻结文档后，发现这些定义缺失，前置检查阻止激活。
- **作出的决定：** 所有者批准 core-topology 子协议，执行前修订合同③与⑧。
- **留在树上的内容：** 进展记录保留了缺失的前提、获批的补充方案及其回执引用，后来者可以查看方案怎样变得可执行。

![PF3 原始 Stage 7.3 进展：claude-code 记录定义缺失、所有者批准子协议及合同修订](docs/screenshots/mountainrs-stage7.3-progress.zh-CN.png)

*2026 年 9 月 19 日截取的原始界面局部，展示 8 月 8 日的进展。[原始依据与英文翻译](docs/mountainrs.md#stage-73)。客户端分工来自复盘；这张图展示本地执行记录。*

查看[完整案例与公开科研文件](docs/mountainrs.zh-CN.md#stage-73)，包括 preflight manifest 中的阻断历史与获批子协议。案例分别标明公开文件和作者记录的协作历史。

树也保留此前失败的路线与暂停的工作：

![MountainRS 原始项目树：暂停的调试路线下保留两次失败尝试](docs/screenshots/mountainrs-tree.zh-CN.png)

*2026 年 9 月 17 日真实界面截图，布局、颜色和节点关系保持原样。[记录说明](docs/mountainrs.zh-CN.md#先看树上的一段) · [可见内容的英文翻译](docs/mountainrs.md#read-the-original-tree)。*

## 新窗口会收到什么

同一份项目状态既支持正在进行的讨论，也支持之后的交接。PF3 在窗口读取时组装上下文。

| 工作中留下什么 | 下一位参与者怎样读到 |
|---|---|
| 任务、契约与进展属于项目节点。 | 当前任务、意图与选出的最新进展。 |
| 已执行尝试保留结论，暂停工作保留原因。 | 相关结论与进一步读取节点详情的引用。 |
| 规则有全局或项目范围，约束指向节点。 | 当前节点适用的规则与待处置约束。 |
| 写入更新共享版本并留下回执。 | 写回版本、变更引用与旧版本写入拒绝。 |

[设计说明](docs/design.zh-CN.md)解释这些机制怎样支持讨论、执行和审查。在 9 月 18 日的 MountainRS 快照中，没有 active 任务；恢复工作首先需要所有者决定方向。

直接查看[实际续接包原文，包含规则正文与资产位置](docs/mountainrs-resume.zh-CN.md)（[英文翻译](docs/mountainrs-resume.en.md)）。这是 Elara 在 MountainRS 中的工作配置，不是 PF3 默认制度；详见[适用范围](docs/mountainrs.zh-CN.md#从续接包读到原始记录)。

## 几分钟跑通交接

让两个客户端读同一份状态：先写的成功，后写的旧版本被拒绝，再重读新状态继续。这个独立示例实现本仓库公开的小型交接约定。

需要 **Node.js ≥ 24**。演示与契约测试只使用 Node 内置模块，在本地运行。

```sh
git clone https://github.com/zhaoxiuyue/pf3-showcase.git
cd pf3-showcase
npm run demo:zh
npm test
```

测试命令会对参考实现与 frozen 返回值的合法对照实现，各运行同样的六项契约检查。见 [v0.2.3 对照验证](docs/contract-audit-v0.2.3.md)。

你会看到：

1. A、B 都读取 revision 1 的摘要和下一步。
2. A 写入新进展，收到回执，状态变为 revision 2。
3. B 带旧 revision 1 写入，被 `cas_conflict` 拒绝，原状态保持不变。
4. B 重读 revision 2，理解 A 的进展后继续，状态变为 revision 3。

`npm run demo` 默认输出完整英文；`npm run demo:zh` 输出中文，两者共用同一个参考实现。

这是 Protocol demo（独立协议示例）：一个进程模拟两个客户端，不连接模型、MCP 或完整 PF3。示例数据保存在内存里，随进程结束。上方真实项目材料属于 PF3 walkthrough（产品演示）；本仓库目前不提供完整产品安装或试用访问。

## 工程检查

```sh
npm ci
npm run verify
```

`npm ci` 安装 lockfile 固定的开发用 Schema 校验器。`npm run verify` 依次运行原有契约测试、Schema/示例验证与消息轨迹重放，再核对导出清单的文件列表、字节数和 SHA256。

[CI](https://github.com/zhaoxiuyue/pf3-showcase/actions/workflows/ci.yml) 在 Linux、macOS、Windows 上分别使用 Node 24 和 26 执行三项检查。见[工程验证记录](docs/engineering-v0.2.4.md)。

## 从哪里开始看

展示包版本为 **0.2.14**，协议为 **PF3 Handoff v0.1 draft**。Schema 本轮未改动，`$id` 仍固定到 `v0.2.1`；[协议文档](protocol/README.zh-CN.md#版本与示例)说明单条消息与交接轨迹的区别。

| 内容 | 可以拿来做什么 |
|---|---|
| [MountainRS 真实案例](docs/mountainrs.zh-CN.md) | 查看网页与本地协作、Stage 7.3 前提缺失及修订、原始界面与对应文件 |
| [设计说明](docs/design.zh-CN.md) | 讨论、执行与审查怎样共用项目状态，以及五状态、规则分层与续接的取舍 |
| [交接协议 v0.1 草案](protocol/README.zh-CN.md) | 理解读状态、声明版本、写入、拒绝与重读的行为约定 |
| [JSON Schema](protocol/handoff.schema.json)、[单条消息](protocol/examples/state.json)与[交接轨迹](protocol/examples/exchange-trace.json) | 检查字段结构，制作自己的接入样例 |
| [独立参考实现](demo/handoff.mjs) | 修改摘要与下一步，观察版本和回执如何变化 |
| [可复用契约测试](conformance/handoff.mjs) | 将自己的同步 JavaScript 实现接到同一组行为检查 |
| [实测材料与范围](docs/evidence.md) | 区分可亲自运行的示例、作者记录与实际产品能力 |

## 范围与证据

- **可运行的内容：** PF3 Handoff v0.1 草案、Schema、独立内存实现和有限范围的契约测试。它们覆盖公开的交接行为；传输、持久化、权限与完整 PF3 服务接入，需要另外实现和验证。
- **概念与案例：** 设计说明介绍完整 PF3 的项目模型，所有者授权公开的 MountainRS 快照展示真实项目的工作流记录。完整实现保留私有；可运行示例实现其中的小型交接约定，通过测试只为实际执行的用例提供证据。
- **目前的使用经验：** PF3 用于作者自己的多项目、多 AI 客户端工作流。[实测记录与局限](docs/evidence.md)区分作者记录和可复现检查。

## 许可

除 `docs/` 外，随包分发的协议、Schema、参考代码与测试采用 [Apache-2.0](LICENSE)；`docs/` 下的文字、记录与图片采用 [CC BY 4.0](docs/LICENSE-docs.md)。另见 [NOTICE](NOTICE)。后续证据里程碑见[路线图](docs/roadmap.md#中文)。

由独立开发者 **Elara（Xiuyue Zhao）** 设计与建设。[联系与合作](COLLABORATE.md)。

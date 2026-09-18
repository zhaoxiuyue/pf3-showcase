# PF3 Showcase · Project Forest 3

**让长期 AI 项目保持可续接。**

[English](README.md) · [续接上下文](#新窗口会收到什么) · [真实案例](#一个真实项目mountainrs) · [运行示例](#几分钟跑通交接) · [设计说明](docs/design.zh-CN.md)

PF3 将任务、决定、失败和约束保存在共享项目状态中，为新窗口组装继续工作所需的上下文。

这个仓库提供**设计说明、MountainRS 真实工作流快照，以及可以本地运行的独立交接示例**，并附协议草案、JSON Schema 与契约测试。

## 换窗口时，工作断在哪里

换了 AI 窗口，代码和报告可能都还在。新窗口动手前，还需要弄清：

- 当前是哪项任务，哪些路已经试过？
- 之前为什么停下，什么条件变化后才值得回来？
- 哪些约束仍然适用，写回时所读的状态版本是否还有效？

这些决定散落在聊天里时，接手者就得重新拼起来。PF3 把它们记在对应的工作上：路线组织任务，已执行的尝试保留结论，规则有明确作用范围，续接包汇集当前上下文和写回版本。[设计说明](docs/design.zh-CN.md)解释这些选择及其代价。

## 新窗口会收到什么

人和 Agent 在工作中记录决定与证据。新窗口读取时，PF3 从已保存的项目状态中组装续接包。

| 工作中留下什么 | 下次接手时怎样读到 |
|---|---|
| 任务与进展属于项目节点。 | 当前任务、意图与选出的最新进展放在一起。 |
| 失败尝试保留结论，暂停工作保留原因。 | 被引用的结论进入上下文，其他节点细节仍可按需读取。 |
| 规则有全局或项目范围，约束指向节点。 | 续接包包含生效的全局规则、项目规则和指向当前节点的待处置约束。 |
| 写入更新共享版本并留下回执。 | 接手者获得写回版本；旧版本写入被拒绝后，需要重读。 |

这减少了每次换窗口重新组织交接材料的工作。及时记录有用证据、核验所引用的文件，仍是执行者的工作。见[设计说明](docs/design.zh-CN.md#哪些由系统组装哪些仍需执行者判断)。

在 **MountainRS** 的当前续接中，首先出现的是一个具体事实：**没有 active 任务**。新窗口动手前需要与所有者确认工作方向，再按需读取以前为什么失败、暂停工作何时才可恢复。

直接查看[实际返回的续接包原文](docs/mountainrs-resume.zh-CN.md)（[英文翻译](docs/mountainrs-resume.en.md)），规则正文与资产位置均保留，顺序与真实返回一致；节点原因随后按需读取。

## 一个真实项目：MountainRS

MountainRS（山地遥感物理基座）是用 PF3 管理的遥感研究项目。它的树保留了两条失败的数据入口路线：过于复杂的 GEE 预筛，以及当前数据窗中没有任何单景能满足的覆盖要求。缩小 ROI 的调试路线则保持暂停，并写明恢复条件。下图直接展示这些记录在 PF3 中的样子。[科研仓库](https://github.com/zhaoxiuyue/MountainRS)现已公开，提供报告、精选结果表与项目管理复盘。

![MountainRS 真实 PF3 界面：两条失败路线保留原因，暂停路线注明恢复条件，后续主线继续完成](docs/screenshots/mountainrs-tree.zh-CN.png)

*2026 年 9 月 17 日真实界面截图，已展开历史失败尝试。[案例与项目树记录](docs/mountainrs.zh-CN.md) · [截图内容的英文翻译](docs/mountainrs.md#read-the-original-tree)。*

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

展示包版本为 **0.2.13**，协议为 **PF3 Handoff v0.1 draft**。Schema 本轮未改动，`$id` 仍固定到 `v0.2.1`；[协议文档](protocol/README.zh-CN.md#版本与示例)说明单条消息与交接轨迹的区别。

| 内容 | 可以拿来做什么 |
|---|---|
| [MountainRS 真实案例](docs/mountainrs.zh-CN.md) | 查看真实项目树截图、对应英文翻译与实际续接包 |
| [设计说明](docs/design.zh-CN.md) | 五状态、路线版本、执行记录保留与规则分层背后的取舍 |
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

# MountainRS：一棵真实项目树

[English](mountainrs.md) · [Showcase 首页](../README.zh-CN.md)

MountainRS（山地遥感物理基座）是 Elara 的遥感研究项目。PF3 的树记录了做过的工作、失败的路线和恢复工作的条件。以下材料来自 **2026 年 9 月 17 日**读取的真实记录，所有者已授权公开这棵项目树。

## 一个状态标签还没说清什么

新 AI 窗口看到 Stage 6.5.1-D 标着 `paused`，只靠这个标签，还判断不了该不该回来续。记录中的原因给出了条件：仅在导出器或本地读取链出现新的技术故障时恢复。前面两次失败尝试也各自保留结论，下一窗口可以查看它们为什么停下。

这个案例展示接手时可以读到的信息：状态、原因，以及继续工作的条件。下面是具体记录。

## 从续接包读到原始记录

**2026 年 9 月 18 日**实时读取返回项目版本 **6**、路线版本 **100**，与已公开的项目树快照一致。下图是该调用与随后三次节点读取的精选文档视图：

![MountainRS：先读当前续接状态，再读取三个真实节点保留的原因](screenshots/mountainrs-handoff.zh-CN.svg)

1. `pf3_resume` 返回 `no_active_node`。项目部分记录生命周期为 `abandoned`，项目由所有者停工。顺序上首个 planned 节点是 Stage 7.9；这只是路线位置，不是激活许可。
2. 路线标出了失败与暂停节点。随后三次 `pf3_read_node` 取得原因原文：两次失败结论与调试路线的恢复条件。
3. 续接包提供需要版本校验的写入所用的项目、路线版本。真正写回前仍须重读当前状态，不能拿这张日期快照里的数字作为当前凭据。

[精选原始字段](mountainrs-handoff.json)保留来源操作、节点 ID、原因原文与版本。图中将几次读取组合为文档视图，并非单份原始续接包、完整界面截图或模型完成工作的调用实录。公开摘录不包含规则正文和资产位置。

## 先看树上的一段

![MountainRS 真实 PF3 界面：保留两次失败尝试，调试路线暂停，后续主线继续完成](screenshots/mountainrs-tree.zh-CN.png)

*真实界面直接截图，已展开两次失败尝试。*

1. **复杂 GEE 预筛失败了。** Stage 6.5.0-X 留下结论：停止继续修复杂 audit JS；Google Earth Engine（GEE）只做低太阳角、coverage 与 QA 简筛，near-zero / shadow ratio 回到本地 Python 判断。
2. **覆盖要求找不到合格的单景。** Stage 6.5.1-X 记录：当前数据窗下，不存在满足“大 ROI + 95% 单景覆盖”强约束的影像。这个约束不再承担最终数据入口。
3. **缩小 ROI 的调试路线保留为暂停。** Stage 6.5.1-D 写明：仅在导出器或本地读取链出现新的技术故障时恢复。后续主线上，Stage 7.0 与 Stage 7.1-R 则记录为 done。

新窗口能直接读到：哪些路已经失败、结论是什么、什么情况下才值得回来续。记录保留了这些区别，而不只是一个完成百分比。

## 英文读者看到什么

![同一段 MountainRS 真实记录的人工英文译文视图](screenshots/mountainrs-tree.en.svg)

英文图对选中的记录作了人工翻译和摘要，采用更简洁的阅读布局；节点状态、阶段身份和原因的含义保持一致。PF3 产品界面目前是中文，这张图是文档译文。原来的五状态合成教学案例仍保留在[设计说明](design.zh-CN.md)中。

## 快照与范围

| 记录项 | 值 |
|---|---|
| 项目 | `proj_6cbeea3266ff`，revision **6** |
| 路线 | `rt_f634f0ab72fb`，revision **100** |
| 节点 | **36**：23 done、2 failed、1 paused、10 planned、0 active |
| 项目生命周期 | `abandoned`；所有者于 9 月 10 日停工，等待外部合作 |

[项目树记录摘录](mountainrs-tree.json)列出全部 36 个节点的 ID、标题和状态，并保留两条失败节点与一条暂停节点的原因原文。它从本次获授权的实时读取中精选展示字段，不是对外定义的 PF3 API 返回格式。

这是作者记录的真实项目工作流。节点 done 表示该项工作已关闭，不等于科研假设得到支持。[MountainRS 科研仓库](https://github.com/zhaoxiuyue/MountainRS)已于 2026 年 9 月 18 日公开，可直接查看报告、[Stage 7.6 精选结果表](https://github.com/zhaoxiuyue/MountainRS/tree/main/stage7_real_weak_closure/stage7_6_optical_operator/outputs)与[项目管理复盘](https://github.com/zhaoxiuyue/MountainRS/blob/main/docs/one-tree-three-clients.md)。多数大型输入与产物仍不随 Git 分发，因此仅靠仓库尚不能端到端重跑科研全过程。[路线图](roadmap.md#中文)区分本次材料公开与未来新客户端续接的实测证据。

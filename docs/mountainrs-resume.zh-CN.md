# PF3 续接包 · `proj_6cbeea3266ff`

> 按序读完再动手；写回凭据在第 4 段。体量（估算）：9089 tokens（rules 3624tk/40% · project 1590tk/17% · current_node 856tk/9% · handoff 385tk/4% · assets 2634tk/29%）

## 1 · 适用规则

- 【principle】**规则措辞｜优先正向指令** `rr_162f0440a4cb`@rev2
  编写或修订 PF3 项目规则时，优先用正向动作、优先级、成功条件与期望状态表达：写清做什么、先做什么、何时进入下一步。只有安全红线、授权门禁、fail-closed、隐私、结果盲等必须明确阻止特定行为时，才使用“不得/禁止/不要”等负向措辞。
  触发：创建或修订 PF3 项目规则、长期执行提示或同类面向继任 Agent 的约束文本时。；约束：PF3 项目规则及承担长期 Agent 行为引导作用的规则文本措辞。；不约束：安全、权限、隐私、数据完整性、结果盲、停止条件等硬边界；这些场景以清晰、无歧义为最高优先。普通对话、事实记录和引用原文不受本规则约束。
- 【procedure】**影子课程｜项目拽课，原理入库** `rr_45a64711a332`@rev5
  接管别的项目窗口，先读补完计划节点清单，把可能牵引的知识格写进首条进展。撞上机制就开小课：读那格约束续讲，先预测再观察再解释，一课一机制，项目节奏优先。课毕用节点约束记在那格：讲到哪、证据在哪、还欠什么。知识层只写原理层（机制、因果、边界、证据），判断留给所有者，标题两到五字；写前查重、先提案，所有者同意后由 Opus 写入和维护。
  触发：pf3_resume 续接了《补完计划》以外的项目窗口；执行中撞上机制性问题（并发、I/O、网络、部署、环境差异、显存、数值、安全等）；或要把经验沉淀进知识层。；约束：项目窗口续接时的对照动作；小课的开法、上限与记录格式；知识条目的写法（原理层、不下判断、短标题）、写入前查重与提案、写入和维护的执行分工（Opus 主力，不分项目）。；不约束：《补完计划》自身的窗口（按其项目规则走）；知识格的通关判定（归补完计划的 Gate 规则）；项目目标与顺序（项目拽课，不是课拽项目，不为拽课改项目目标或开新项目）；记录不改 planned 节点的意图字段，也不激活它。
- 【procedure】**外部集成排障：先观测，再改实现** `rr_e8690799ca61`@rev5
  外部集成失败时，先建立观测。在我方日志证实请求已到达之前，不许照对方的报错改我方实现——那段文案是对方的推测，不是事实。
  触发：与外部系统集成失败，且链路中有我方看不见的环节：对方后端、网络路径、平台出网策略。；约束：排障顺序：先加观测还是先改代码。以及外部报错文案的证据地位。；不约束：我方内部错误（栈追踪、失败测试、我方日志）是一手证据，可直接据以修改。观测就位后基于日志的修改不受限。不要求预先建设可观测性，只要求失败后动手前补上。
- 【procedure】**执行续接与状态写回** `rr_becf2efb6c0f`@rev8
  执行手续接后，以 PF3 当前状态为唯一依据行动：不要求所有者转述历史或搬运口令；写回执行状态时，只保存影响下一步的最小充分信息与证据引用。
  触发：续接执行，或写回执行状态时。；约束：续接后的信息来源；写回的密度。；不约束：原始证据与正文的保存；PF3 状态不足时，向所有者显式提问不受限。

项目规则（只收紧，不放宽）：
- **文件组织** `pr_2d5d0c9acc35`@rev2：按「谁产生、能否再生、是否已被合同钉住」分区存放，不按主题分。

一、历史证据区（stage7_real_weak_closure/）冻结不迁。凡被冻结合同、审计器或 append-only journal 按路径引用的历史证据——export manifest、evidence/、attempts journal、协议文档、catalog request——一律原地不动、字节不改。要出新版本就 supersede 另立文件，不覆盖旧的。任何整理、重构、收敛都绕开这个区；区内只有 .DS_Store 这类 Finder 产物可以清走。

二、科研工作包区（stages/<stage>/）每个 stage 是自足容器，内部按职能分槽：配置、原始输入、文档、可复算证据、程序产物、人读报告、代码各占一槽。容器内代码定位根目录只许用「从自己往上数 N 层」，禁止写仓库名、容器名或绝对路径——这样整包平移不断引用。跨 stage 只引用兄弟容器，不跳出工作包区。

三、路径解析只有一个可改的间接层：.pf/resource-registry.yaml。文件搬了先改它，绝不改证据来迁就磁盘。

四、本机派生物（.cache/）永不搬迁。venv 这类把绝对路径写死在自身内部的东西，要动就删掉重建，不搬。

五、新产物落点按性质走：代码进 scripts，配置进 configs，原始输入进 data，程序产物进 outputs，人读报告进 reports，可复算的证据 JSON 进 evidence。

六、仓库外归档目录 ~/ResearchArchive 只进不出，两个用途：Mac 自动分流的下载件，以及退役物归档（~/ResearchArchive/<年>/<月>/mountainrs-attic/，镜像原相对路径）。下载件不算产物，取得后必须先移入该资源 alias 声明的 canonical 落点再开始审计，不许在归档目录里就地读用，也不许让 alias 指向归档目录。退役物不删只归档，全量进哈希清单——归档不是丢失；需要真删时停手问所有者。

七、一次性整理的操作记录进 _ops/<日期>-<动作>/：搬前搬后全量哈希清单加 migration-manifest，搬完即封存，不再改。历次迁移的逐条改动、计数与核验结论只存在于该目录，不复述进本规则——规则回答「以后怎么放」，不保存「上次搬了什么」。

八、每个容器根放一份 README.md 作为指针，只回答三件事：本容器做什么、产物落在哪个槽、依赖哪些兄弟容器与冻结件。只写指针不抄目录树——目录清单是派生信息，动一次文件就失真。判据是新窗口进入该容器后只读 README 即可开工；做不到说明指针不合格，补指针而不是补清单。
- **关闭前激活预检与结果盲冻结时序** `pr_d4a37fa568df`@rev3：当 active 节点已形成其合同允许的闭集终态候选且审计通过，并存在唯一的 planned 直接后继时，执行手必须在申请或执行当前节点关闭前，对该后继完成一次结果盲、只读的 activation preflight。预检只核对已冻结的上游身份、定义、合同、依赖、资源与停止条件能否唯一编译后继的激活协议；除写入预检裁决外，不得修改节点或路线对象，不得运行后继实验、候选模型或制造新证据。

预检结果必须唯一落入：
- activation_preflight_ready：激活协议所需定义均唯一、可解析，且未发现阻断项。
- activation_preflight_blocked：至少存在一个阻断项，并登记唯一主原因码 decision_required、external_dependency、upstream_invalidated、evidence_missing 或 permission_or_safety_blocked。

主原因码为 decision_required 时，必须同时生成一页式裁决请求，只包含缺失或歧义项、互斥方案、各方案代价与后期影响、AI 推荐项及理由、证据引用；不得代替所有者裁决。其余 blocked 情形只登记阻断事实、证据引用与可判定恢复条件。

写回援引根系“执行续接与状态写回”的最小充分原则，仅保存 outcome、主原因码、证据引用，以及 blocked 时的恢复条件或裁决请求引用。任何 preflight outcome 都不自动关闭当前节点、不激活或改写后继，也不授权后继实验；状态转移与执行授权仍须通过各自适用的正式操作。

结果盲协议冻结时序（Elara 于 2026-08-09 作出的所有者裁决，自 Stage 7.4 本次恢复及本项目全部后续节点起生效）：
1. 对执行阶段将读取既有结果值的节点，激活后的首个非只读动作只冻结结果盲声明：声明截至该动作尚未读取本节点所依赖的既有结果值，并绑定全部适用上游输入的路径与 SHA-256。首动作不冻结 protocol/config 内容，也不要求 protocol/config 早于一切只读核验、候选编译或交叉审计。
2. protocol/config 只有在结果盲候选完成交叉审计且审计通过后，才以完成字节、路径与 SHA-256 冻结；冻结与 PF3 写回读回必须发生在第一次结果值读取之前。结果盲的必要且充分时序条件是“有效 protocol/config freeze 早于任何结果读取”，不是“有效 protocol/config freeze 早于一切动作”。
3. 交叉审计失败时继续 fail closed，不读结果、不运行实验；候选及事故证据遵守历史证据区 append-only 规则。任何修复必须由适用的所有者裁决约束，不得静默改阈值、规则、排序、输出或结果暴露边界。
4. 本节取代本项目既有节点合同、preflight 或状态备注中“protocol/config 内容必须作为激活后首动作冻结”的时序要求；不取代激活预检、上游身份/hash 绑定、交叉审计、结果读取前冻结、PF3 写回读回与 fail-closed 要求。
5. 跨节点冻结时序（本条管相邻两节点之间，前四条管节点内部）：当本节点将产出或读取结果值，且其直接后继合同仍处 planned 可修订状态时，后继合同的 objective、passCriteria、boundaries 与 explicitExclusions 必须在本节点第一次结果值产出或读取之前冻结。该时点之后对后继合同的任何修改，一律在 exposure audit 中标记 post-result exploratory，不得再声称 preregistered；未修改项保持 preregistered。本条不要求后继合同在本节点激活前就完备，只要求其冻结时点先于结果出现——planned 是唯一修订窗口，结果一旦出现，该窗口在语义上即关闭。冻结事实以指向后继节点的节点约束记录，不靠记忆或口头交接。
- **事件响应等级与问题升级证据门** `pr_1878db6f32b5`@rev1：自 Elara 2026-08-09 裁决起，对本项目全部后续节点生效：1. 响应等级必须与事件信息量匹配；零信息量事件不得触发最高等级处置，也不得仅凭该事件把结果盲或 preregistered 降级。2. 报告任何可执行问题时，必须同时给出缺陷位置与最小修复量：代码或文档问题给出 file:line 与需改行数；操作命令问题给出命令面及最小参数或步骤改动。给不出最小修复量的事项可以记为观察，但不得升级为需要所有者裁决。3. 本规则不掩盖已发生的 operational deviation；事实照实记录，处置按其信息增量和对设计自由度的实际影响定级。
- **执行与审计的角色分工** `pr_e314ebecd8bb`@rev1：Stage 7.5 起执行归克克；弦仅在节点关闭前对完整产物集上场一次，唯一输出一份 findings，不得另建文件或新增版本号。不得 BLOCK、停机或要求裁决；歧义写入 findings。每条 finding 必须附缺陷位置与最小修复量，无法附出的不列。
（由节点约束 nc_4e2e3bdb61d5 升级，节点 nd_acc2d6699c89 关闭时处置）



- 长期约束来源：以上规则 + 仓库内 CLAUDE.md（PF3 架构宪章）

---

## 2 · 项目

**山地遥感物理基座** `proj_6cbeea3266ff`（revision 6，生命周期 已弃置：弃置类型：钩子已投放，无外部合作则不复垦。非技术失败，非中途放弃——停工原因是这不属于所有者的自有工作议程。

这是什么：一人公司做出来投放出去的能力展示（钩子）。科研主线本身未完成，也不以完成为目标。投放已达成——图文系列「桑榆非晚·修补前」第一季七篇全部发布，素材覆盖至 Stage 7.9 的 blocked 判决书，无积压；代码与证据仓库已整理至可公开展示状态（github.com/zhaoxiuyue/MountainRS，CC BY 4.0，根 README 以具体结果开篇、给出三个叙事式案例与一个可独立复核的入口，关于作者落款 Elara、联系 XiuyueZhao@outlook.com，个人学习笔记已从工作树与全部历史清除）。截至停靠日仓库尚为 private，翻公开由所有者自行执行。

复垦条件（外生、非技术）：有合作或委托上门。无此条件不复垦。技术上的解锁路径存在，但它们不构成复垦理由——那是有人接手之后才谈的事。

停靠位置（若有人接手，从这里读起）：
- 主线至 Stage 7.8 通关（qualified_multidomain_evidence_frozen）；Stage 8.0 激活预检判 ready 但未激活；全线无 active 节点，无冻结时序在跑，无半成品。
- Stage 7.9/7.10/7.11 被 nc_8fe5b4709440 阻断，主原因码 evidence_missing：Stage 7.6 产出零个 qualified 算子、Stage 7.7 产出零个 activated 状态。二者均正常执行并通过各自 fail-closed 审计，产出的是有效负结果与空集——上游没有失效。
- 技术解锁需重新资格化 Gate（nc_b6d6ef3e44f2）判 warranted。G2（解除 Stage 7.5 某个 deferred_missing_anchor 的独立锚点）与 G3（对某个 L1 状态的独立观测约束且信息通路不经未资格化算子）为 not_satisfied。**G1（v_sky IQR）为 not_established，不是 not_satisfied**——其原判定依赖一条不成立的推理（「子集的 IQR 不大于全集」，IQR 对取子集不单调，反例已数值验证），由外部审查（弦）在仓库公开前查出。缺陷记录见 stage7_real_weak_closure/stage7_8_multidomain_evidence/evidence/requalification-gate-g1-defect-v1.json，原报告与 run_requalification_gate_v1.py 字节不改，按 append-only 另立文件撤回该推理。Gate 整体结论因此为 not_established 而非 not_warranted。若要落定 G1，须在判据所要求的 fold 层级取得有效测量，或由所有者裁决修订该判据的测量层级定义。
- 上述更正不解除 Stage 7.9 的阻断：nc_8fe5b4709440 的触发条件是 activated_count = 0，是独立于本 Gate 的客观计数。
- 未损失任何 preregistered 地位：Stage 7.9 的 objective 与 Stage 8.1 的合同（route revision 100）均在相关结果产出前冻结，修订窗口未关。
- 接手入口：pf3_resume → 节点约束 nc_8b4b5b3a8d8c（Stage 8.0 的 B1 循环性 / B2 命名与 consumer_registry 登记 / B3 G 锁定 / B4 冻结时序）与 nc_1cebedfc14e0（Stage 8.1 修订窗口状态与 B1 下游传递的待裁决观察）→ stages/stage8_0_sar_geometry/README.md。

停靠日 2026-09-10。所有者昭昭（Elara）裁定。）

目标：构建面向山地的遥感基础模型（基座），在地形复杂、几何畸变、光照异质条件下，对地表几何与物理状态做出忠实、可迁移、带不确定性的推断。
【迁移建档】迁移建档测试

- 主线 `rt_f634f0ab72fb`（revision 100）
  - 死路 · Stage 6.5.0-X｜复杂 GEE shadow-risk 预筛审计 `nd_f3a98903e084`
  - 死路 · Stage 6.5.1-X｜大 ROI + 0.95 单景 full-cover 强约束 `nd_1a8f9d2b453f`
  - 已暂停 · Stage 6.5.1-D｜缩小 ROI 的快速调试路线 `nd_7f2957ff1de7`
  - 已通关 · Stage 7.8｜多域 L0 证据与独立参考的结果盲冻结 `nd_89bdfb553afb`
  - 计划中 · Stage 7.9｜单 ROI L3 证据栈反演与物理自监督最小闭环 `nd_59cb52139f59`
  - 计划中 · Stage 7.10｜双轨验证：同域空间诊断与跨域断裂 `nd_321120bdf97e`
  - 计划中 · Stage 7.11｜输出不确定性校准、选择性风险与 OOD `nd_8372dbe888c3`
  - 计划中 · Stage 8.0｜SAR L0 证据与斜距几何算子 `nd_05bf6769e3b1`
  - 计划中 · Stage 8.1｜SAR 辐射算子、可微资格与状态激活 `nd_0bbfead06af5`
  - 计划中 · Stage 8.2｜InSAR readiness、LOS 形变观测与 L1 动态状态 `nd_69329c48dbb8`
  - 计划中 · Stage 8.3｜光学-SAR/InSAR 共享状态联合闭环 `nd_93a85c0e0f72`
  - 计划中 · Stage 8.4｜L4 时空软先验与快慢变量熔断 `nd_9e07fccbaa0f`
  - 计划中 · Stage 9.0｜核心系统工程尺度与计算边界 `nd_e80b059d0066`
  - 计划中 · Stage 9.1｜L5 产品、任务头与 v3.1 分项架构验收 `nd_031932e6136a`
  - （更早已通关 ×22 折叠;全量用 pf3_read_project 或前端树冠）

待确认提议：无

---

## 3 · 当前节点

主线当前没有 active 节点——不要擅自开工；与所有者确认后用 pf3_transition_node 激活

下一个 planned：**Stage 7.9｜单 ROI L3 证据栈反演与物理自监督最小闭环** `nd_59cb52139f59`

这一关要完成什么：只使用 Stage 7.7 已激活状态与 Stage 7.6 已资格化算子，在单 ROI 多时相证据栈上完成首个真实 L3 闭环：状态经 L2 重建观测，损失只作用于可追溯有效支持域，并形成闭集科研结论。
怎样才算通过：1. Activation preflight 冻结状态向量、算子版本、输入证据、ROI/support、split、loss 分解、种子、预算、指标、成功/稳定阈值、不可评价条件和停止规则。
2. 每个 loss 项绑定质量因子、支持域和物理来源；零支持、unsupported 与模型不充分不得被静默填补、编码为零目标或负样本。
3. 实施跨观测共享状态与 scene-local N(t) 分离，验证时间不变/时变边界；执行期间不得改算子、状态拓扑、数据支持或判据。
4. 通过合成可恢复性、真实观测重建、缺模态/缺观测消融、防坍缩、状态边界和多种子稳定性测试；报告全部种子、失败运行与有效支持。
5. 与 direct-only baseline 做预注册同预算比较，同时报告 coverage、unsupported、参数边界和 no-increment 结果。
6. 输出逐项标记 observed/inferred、prior_only 或 unsupported；本阶段 uncertainty 只作候选，不称正式校准。
7. scientific_terminal 必须唯一落入 qualified_minimal_closed_loop、completed_bounded_nonqualification 或 deferred_insufficient_supported_evidence。第二类须带 synthetic_recovery_failed、collapse_detected、real_reconstruction_gate_failed、state_boundary_violation、loss_support_below_frozen_minimum 或 no_incremental_value 等冻结原因码；deferred 只能用于结果暴露前发现的外生证据不足。
8. 有效负结果可形成关闭候选。协议偏离、泄漏、provenance/hash/reconciliation 失败不属于科学负结果，应使本轮失效。
9. 发布 model snapshot、state provenance、operator/input hashes、result ledger、Result Gate 与失败签名。
边界：只证明当前单 ROI、冻结证据和冻结 L3 配置下的最小闭环。Stage 7.8 deferred 不阻断本节点；不证明跨域泛化、完整架构优越或大尺度可落地。
明确不做：不新增未通过 Stage 7.7 的状态，不让网络改写物理状态定义，不以纹理重建作自监督目标，不用空间平滑补齐 unsupported，不用 Track B 数据调参。

---

## 4 · 交接合同

写回凭据（C2）：项目 `proj_6cbeea3266ff` revision 6；主线 `rt_f634f0ab72fb` revision 100

写回必须带这里的 revision（C2）；当前节点在支线时用 currentRoute 的凭据；中间有人写过 → CAS 拒绝，重新编译续接包再写

- 每个业务动作一个新幂等键；断线重试用同一个键（同键同内容回放，不重复写入）
- R1：一条路线同时只有一个 active；R2：转 failed 必须写非空 reason
- 记录进展 pf3_record_progress；推进/关闭 pf3_transition_node；改 planned 节点 pf3_update_route
- 两类裁决分 kind 落库：本地验证出的事实写 evidence（带上游文件 hash 锚点,继任窗口自行复验）;所有者批准写 decision（批准人/所批方案/接受的代价）——每种 kind 的末条都会进续接包
- 移交给下一节点的事项写节点约束 pf3_write_node_constraint（指向下一节点）,不塞进关闭 reason
- 改下游节点只能 pf3_propose_downstream 提议，落地要所有者口令（§4.6）
- 每张回执可 pf3_undo 一步撤销；可恢复操作执行前不需要请示（§2.8）

---

## 5 · 必要资产与知识

资产坐标（坐标是执行手的主张,PF3 不校验——用前复验 hash;文件搬家后同名再登记即更新坐标）：
- 「stage7.4-R1-executor-candidate-v1」正式审计所锁定的未获执行授权实现（code）→ `stage7_real_weak_closure/stage7_4_residual_reliability/scripts/run_risk_proxy_v1.py`（sha256 07a96120b10f2cc8a6a814f98a20c855c2074afc1d0beaae3c5da89e410c968f；产自 `nd_095e71a9eccf`）
- 「stage7.4-R1-preflight-manifest-v9」R1唯一v9预检，绑定结果盲声明和审计输入（evidence）→ `stage7_real_weak_closure/stage7_4_residual_reliability/evidence/preflight-manifest-v9.json`（sha256 b98f12cd2b5f9176c51b1955ff46e3e3040b8970140d81d8a09d4526e5ccf3bb；产自 `nd_095e71a9eccf`）
- 「stage7.4-R1-risk-proxy-config-v2」R1同轮审计后冻结的risk-proxy机器配置（config）→ `stage7_real_weak_closure/stage7_4_residual_reliability/configs/risk-proxy-config-v2.json`（sha256 7baff1c30b94684427defd73dacd3926881efc6d7ab69876a0af881593c0305d；产自 `nd_095e71a9eccf`）
- 「stage7.4-R1-risk-proxy-protocol-v2」R1同轮审计后冻结的risk-proxy人读协议（protocol）→ `stage7_real_weak_closure/stage7_4_residual_reliability/docs/risk-proxy-protocol-v2.md`（sha256 db25a068a4c43e9d9f13a62b871d0870f5a8e089724045cf1fcd8e4738242ba3；产自 `nd_095e71a9eccf`）
- 「stage7.4-R1-runtime-freeze-audit-v2」保存原始投票及Elara同轮裁决后的有效PASS（evidence）→ `stage7_real_weak_closure/stage7_4_residual_reliability/evidence/risk-proxy-runtime-freeze-audit-v2.json`（sha256 ce878bf150f38944ef1ff08ccd88ee58dbdaefeda901f5a3a239c422889add71；产自 `nd_095e71a9eccf`）
- 「stage7.4-R1-synthetic-tests-v1」正式审计输入，17项合成测试（test）→ `stage7_real_weak_closure/stage7_4_residual_reliability/scripts/tests/test_risk_proxy_v1.py`（sha256 0a20cae07f91b59796e02edee3996ed8ae27efc37aa8890bea6139ff28105857；产自 `nd_095e71a9eccf`）
- 「stage7.4-activation-preflight-manifest-v3」证明risk-proxy非唯一、decision_required及结果盲门禁（evidence）→ `stage7_real_weak_closure/stage7_4_residual_reliability/evidence/preflight-manifest-v3.json`（sha256 baf79e9b84b61c7c228d75e807159ce0a52aad3f9d10526840d7319e7e7a01c7；产自 `nd_38d128c40d90`）
- 「stage7.4-activation-preflight-manifest-v6」证明A已批准但方法包仍不唯一且7.4不可激活（evidence）→ `stage7_real_weak_closure/stage7_4_residual_reliability/evidence/preflight-manifest-v6.json`（sha256 e493f5c98a0f56e2b12b24345537d255b0dc7cc30d28094ad99e270c36f4c717；产自 `nd_38d128c40d90`）
- 「stage7.4-activation-preflight-manifest-v8」证明M2激活协议唯一编译且运行时冻结仍待首动作（evidence）→ `stage7_real_weak_closure/stage7_4_residual_reliability/evidence/preflight-manifest-v8.json`（sha256 872146918cd83017d7a31a110c2ab921930f93c6b2a7c0e5c520c97447da966a；产自 `nd_38d128c40d90`）
- 「stage7.4-residual-reliability-report-v1」Stage 7.4描述性科学结论与明确不评估边界（report）→ `stage7_real_weak_closure/stage7_4_residual_reliability/reports/residual-reliability-report-v1.md`（sha256 6aef9cffc0d7ff5ea6fb5d56867e192f78bed8b8fd281cfd5081a2428f92fc6b；产自 `nd_095e71a9eccf`）
- 「stage7.4-result-blind-declaration-v1」Stage 7.4 R1恢复周期的结果盲声明与22项上游path/hash冻结锚点；不冻结协议内容（evidence）→ `stage7_real_weak_closure/stage7_4_residual_reliability/evidence/result-blind-declaration-v1.json`（sha256 sha256:b39dd6d585bd3142e9c4734efef002df33ddb99da40d765f063837cc4c9c783b；产自 `nd_095e71a9eccf`）
- 「stage7.4-risk-proxy-aggregation-table-v1」B4/B5及四个scope的等景权聚合和五态计数（data）→ `stage7_real_weak_closure/stage7_4_residual_reliability/outputs/risk-proxy-aggregation-table-v1.json`（sha256 2439b02ed93f74eb5e851c4d53c161f7c049adb0c8618e429457ac6499dd58fd；产自 `nd_095e71a9eccf`）
- 「stage7.4-risk-proxy-decision-request-v2」列出risk-proxy A/B/C互斥选项、代价与所有者回执格式（decision_request）→ `stage7_real_weak_closure/stage7_4_residual_reliability/docs/risk-proxy-decision-request-v2.md`（sha256 1d792bb402fc45faa5c5452dbe60245f39d99122afb3a507a366082e6775c9ab；产自 `nd_38d128c40d90`）
- 「stage7.4-risk-proxy-method-pack-decision-request-v3」供所有者在M1/M2/M3三套完整方法包中唯一裁决（decision_request）→ `stage7_real_weak_closure/stage7_4_residual_reliability/docs/risk-proxy-method-pack-decision-request-v3.md`（sha256 41e29c75212c8e622a93143399bf119271fed34620202c7d2eff934f7325a861；产自 `nd_38d128c40d90`）
- 「stage7.4-risk-proxy-reconciliation-manifest-v1」成员、mask、终态、分母、fold、verdict及输出hash闭环（evidence）→ `stage7_real_weak_closure/stage7_4_residual_reliability/evidence/risk-proxy-reconciliation-manifest-v1.json`（sha256 d891c11b2005cc6306521c5e2cbb7b5ea58e50301b18db9e04fdcaf17ff646d6；产自 `nd_095e71a9eccf`）
- 「stage7.4-risk-proxy-risk-curve-table-v1」固定coverage网格、精确点与720个scope判定（data）→ `stage7_real_weak_closure/stage7_4_residual_reliability/outputs/risk-proxy-risk-curve-table-v1.json`（sha256 6d65f6dd9c8919b53a83545e98b30c2492119ed30f5764490641f32dd022cea2；产自 `nd_095e71a9eccf`）
- 「stage7.4-risk-proxy-stratum-table-v1」五层分层的支持、评分与选择性覆盖明细（data）→ `stage7_real_weak_closure/stage7_4_residual_reliability/outputs/risk-proxy-stratum-table-v1.json`（sha256 87164338337dc111930699e2fe76386fe8c0386e7b4aab898f0e5011bbf2adca；产自 `nd_095e71a9eccf`）
- 「stage7.4-risk-proxy-unit-status-ledger-v1」180个acquisition×band×fold单元的终态与fallback对账（evidence）→ `stage7_real_weak_closure/stage7_4_residual_reliability/evidence/risk-proxy-unit-status-ledger-v1.json`（sha256 7af67215e73b49750cbf5726bcc1783fd42240da0601e009cea4559da84b4eb8；产自 `nd_095e71a9eccf`）

本项目沉淀的知识（只列身份；读正文用 pf3_request_knowledge_bodies）：
- 「mountainrs-inversion-001」正向模型与反演（concept）
- 「mountainrs-inversion-002」可辨识性（concept）
- 「mountainrs-inversion-003」规范自由度（concept）
- 「mountainrs-inversion-004」最小二乘（method）
- 「mountainrs-inversion-005」雅可比矩阵（concept）
- 「mountainrs-observation-001」下垫面（concept）
- 「mountainrs-observation-002」遥感像元（concept）
- 「mountainrs-observation-003」光谱波段（concept）
- 「mountainrs-observation-004」Landsat产品分级（concept）
- 「mountainrs-quality-001」QA像元质量标记（concept）
- 「mountainrs-quality-002」独立观测（concept）
- 「mountainrs-quality-003」选择性预测（method）
- 「mountainrs-quality-004」空间阻断（method）
- 「mountainrs-quality-005」不确定性校准（concept）
- 「mountainrs-radiometry-001」反射率（concept）
- 「mountainrs-radiometry-002」辐照度三分量（mechanism）
- 「mountainrs-radiometry-003」大气校正（mechanism）
- 「mountainrs-radiometry-004」方向性反射（concept）
- 「mountainrs-terrain-001」数字高程模型（concept）
- 「mountainrs-terrain-002」地形效应（concept）
- 「mountainrs-terrain-003」自阴影与投射阴影（concept）
- 「mountainrs-terrain-004」坡度与坡向（concept）
- 「mountainrs-terrain-005」地形入射余弦（concept）

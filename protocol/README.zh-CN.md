# PF3 Handoff v0.1 · 草案

[English](README.md) · [展示入口](../README.zh-CN.md)

本协议定义一个摘要与下一步的版本交接闭环。它从 PF3 的协作问题中提取出一个小范围约定，供独立实现与讨论；它与完整 PF3 项目模型的关系见[仓库范围](../README.zh-CN.md#范围与证据)。

## 对象与动作

| 对象 / 动作 | 字段或结果 |
|---|---|
| State | `revision`、`summary`、`nextStep` |
| WriteRequest | `expectedRevision`、`summary`、`nextStep`、`actor` |
| Receipt | `id`、`actor`、`beforeRevision`、`afterRevision` |
| 读取 `read()` | 当前 State 的独立快照 |
| 写入 `write(request)` | WriteAccepted 或 WriteConflict |
| 读取回执 `readReceipts()` | 成功写入的 Receipt 列表，按产生顺序排列 |

字段结构见 [JSON Schema](handoff.schema.json)。Schema 约束单条消息的形状；下面的跨调用语义由[契约测试](../conformance/handoff.mjs)检查。

## 行为约定

1. 创建时提供非空 `summary` 与 `nextStep`，初始 `revision = 1`，回执为空。
2. 有效写入声明读到的正整数 `expectedRevision`，并提供非空 `summary`、`nextStep` 与 `actor`。版本必须为 JavaScript 安全整数；具体数值范围见 Schema。
3. 版本匹配时，一次写入将摘要与下一步一起替换，revision 增加 1，并产生一张回执。成功响应包含 `ok: true`、`receipt` 与新 `state`。
4. 回执记录请求中的 actor 和准确的前后版本；id 在该实例中唯一且不复用。id 格式是不透明的，不能依赖参考实现的编号方式。
5. 版本不匹配时返回 `ok: false`，错误码为 `cas_conflict`，包含期望版本、当前版本和非空说明。状态与成功回执列表均不变化。
6. 冲突之后先重读，再根据最新状态判断下一步；不能只替换版本号重发旧意图。
7. 调用方修改读出的快照或返回回执，不改变共享状态；独立实例之间不共享状态。
8. 本草案的同步 JavaScript 绑定对无效初始化、无效版本、非字符串或空白必填文字抛出 `TypeError`；无效写入不改变状态与回执。错误消息的具体文案与语言不属于固定协议。

本草案不定义传输、认证、持久化、幂等重试、撤销、项目树、规则审批、模型调用或智能规划。actor 是声明值，不是认证身份。实现需要这些能力时应另行定义和验证，不从本例推导保证。

## 接自己的实现

把自己的实现放在仓库根目录，再注册到测试套件：

```js
// tests/my-handoff.test.mjs
import { registerHandoffContractTests } from '../conformance/handoff.mjs';
import { createHandoff } from '../my-implementation.mjs';

registerHandoffContractTests(createHandoff);
```

然后运行 `node --test tests/my-handoff.test.mjs`。工厂接收 `{ summary, nextStep }`，返回包含上述三个同步方法的实例；其他语言或异步传输可参考语义与消息示例实现自己的验证。

通过当前测试只为它实际执行的用例提供证据，不证明生产性能、权限边界或完整 PF3 兼容性。

## 版本与示例

**展示包 0.2.9** 与 **PF3 Handoff v0.1 draft** 是不同的版本。[v0.2.2 审计记录](../docs/contract-audit-v0.2.2.md)对应八项约定的测试证据与限定范围的反例核验；[v0.2.3 对照验证](../docs/contract-audit-v0.2.3.md)补充 frozen 独立返回值的合法实现；[v0.2.4 工程记录](../docs/engineering-v0.2.4.md)说明 CI 矩阵、Schema/示例与清单校验。行为约定、参考实现语义与 Schema 均保持不变。

Schema 的 `$id` 固定为 `https://raw.githubusercontent.com/zhaoxiuyue/pf3-showcase/v0.2.1/protocol/handoff.schema.json`。Schema 后续修改使用新的发布标签与 `$id`，不覆盖已发布的 Schema 身份。

以下文件各自是一条可直接按 Schema 验证的消息：

- [state.json](examples/state.json)：读取到的状态，对应 `$defs/state`。
- [write-request.json](examples/write-request.json)：一次写入请求，对应 `$defs/writeRequest`。
- [write-conflict.json](examples/write-conflict.json)：旧版本被拒绝，对应 `$defs/writeConflict`。

[exchange-trace.json](examples/exchange-trace.json) 是包含 `profile`、`scope`、`initial`、`steps` 的**消息轨迹示例**，不是一条协议消息，也不能把整个文件交给该 Schema 验证。应分别验证其中的 `initial`、每个 `request` 和 `result`；状态如何前后衔接需要通过重放或行为检查验证。

[返回展示入口](../README.zh-CN.md)

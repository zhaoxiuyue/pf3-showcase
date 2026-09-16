# Frozen-output positive control · Showcase v0.2.3

This patch corrects a conformance false positive. The existing protocol requires detached outputs; it does not require them to be writable. In v0.2.2, T3 rejected a valid implementation because assigning to a frozen snapshot threw `TypeError` before shared-state readback ran.

## Change and scope

Only T3's mutation-attempt handling changes in the reusable suite. Each local modification is attempted separately. Whether it succeeds or throws, the suite then compares complete shared state and receipts with independently cloned baselines. Exceptions from readback and assertion failures remain outside the catch; factory and write validation are unchanged.

The [frozen-detached-output fixture](../tests/fixtures/frozen-detached-output.mjs) wraps the existing public reference and recursively freezes its detached outputs, including response objects, states, nested receipts, and receipt arrays and entries. It preserves the reference's state transitions and input validation.

`npm test` now runs the same six contract cases against both implementations: **12 test executions, six per implementation**. To run them separately:

```sh
node --test tests/handoff.test.mjs
node --test tests/frozen-handoff.test.mjs
```

## Verified results

Executed on September 16, 2026 using Node.js **v25.8.2**:

| Implementation | v0.2.2 suite | v0.2.3 suite |
|---|---|---|
| Unmodified reference | 6/6 pass | 6/6 pass |
| frozen-detached-output | 5/6 pass; T3 throws on the read-only summary | 6/6 pass |
| The same 16 incorrect implementations from the [v0.2.2 bounded audit](contract-audit-v0.2.2.md#fixed-mutation-set) | All rejected | All rejected |

The positive control's public output objects were also checked with `Object.isFrozen`, recursively. The 16 mutant implementations were reused without modification. This check introduces no new mutant class or protocol invariant.

All files under `protocol/` and `demo/` remain byte-for-byte identical to v0.2.2. The schema identity still points to its published v0.2.1 version. Product scope and licensing are unchanged.

This closes the bounded contract patch. It does not claim exhaustive compatibility or validation on Node 24; Node 24 testing, CI and automated manifest verification remain separate engineering work.

中文摘要：旧 T3 把 frozen 合法返回值误判为失败。现在每次尝试修改后，无论本地修改成功或被拒绝，都立即回读并比较完整共享状态与回执。参考实现和 frozen 合法对照各 6/6；原来的 16 个反例保持不变并全部被拒绝。`npm test` 默认运行两组六项，共 12 次测试。协议、Schema、参考实现与产品范围均未改变，本轮到此结束。

# Contract audit · Showcase v0.2.2

This is a bounded audit of the eight clauses in [PF3 Handoff v0.1 draft](../protocol/README.md#behavioral-contract), performed on September 16, 2026 with Node.js **v25.8.2**. The reusable suite still registers **six tests**. The reference implementation, schema and protocol behavior are unchanged.

## Reproduced gaps

Two kinds of incorrect implementation passed all six tests in v0.2.1:

- `ignore-nextStep`: update the revision and summary, but preserve the previous `nextStep` after every successful write.
- `constant-actor`: record `A` in every receipt, including successful writes requested by `B`.

The second fault was also tested separately on the returned receipt and on the stored receipt list. Both variants passed v0.2.1. All four variants now fail their corresponding assertions in v0.2.2. The unmodified reference implementation passes 6/6 in both versions.

The patch checks the complete expected state immediately after the successful A and B writes, both in the response and through `read()`. It checks B's returned receipt actor, the stored A/B actor sequence, and equality between returned receipts and the ordered receipt list.

## Eight-clause check

T1–T6 refer to registration order in [conformance/handoff.mjs](../conformance/handoff.mjs).

| Clause | Positive assertions or rejecting checks |
|---|---|
| 1. Valid initialization, revision 1, empty receipts | T5 checks exact initial state and an empty receipt list; invalid initial text throws `TypeError`. |
| 2. Valid revision and required text | T1/T2 exercise valid requests. T4 rejects invalid revision values and blank or non-string actor, summary and nextStep values. |
| 3. Replace both text fields, advance once, append one receipt | T1/T2 compare response and stored state with both request fields and revisions 2/3; receipt-list equality verifies one receipt per successful write. |
| 4. Receipt actor, revisions, unique opaque IDs, order | T1/T2 check A/B actors, exact 1→2→3 revision pairs, ordered response/list equality, and non-empty unique IDs without requiring a particular ID format. |
| 5. Refuse stale writes without mutation | T1 checks `ok: false`, error code, expected/current revisions and a non-empty message, then compares complete state and receipts with independently cloned baselines. |
| 6. Reread and reconsider before continuing | T2 demonstrates the client rereading A's progress and constructing a new B request from it, with a different nextStep. This is a client workflow obligation: the server cannot infer whether a caller understood the state from a revision number. |
| 7. Detached snapshots/receipts and independent instances | T3 mutates returned state and receipts and immediately compares shared values with independent baselines. T6 checks instance isolation. |
| 8. Invalid calls throw TypeError without mutation | T4 compares complete state and receipts after each rejected write; T5 checks invalid initialization. Error wording remains unconstrained. |

## Fixed mutation set

Each mutant is a separate deliberately incorrect copy of the public reference implementation. Each copy was run against both suite versions in a fresh Node process; the suite itself was not changed for individual mutants. “Rejected” means a registered contract test failed, not a syntax or loading failure.

| Deliberate fault | v0.2.1 | v0.2.2 |
|---|---|---|
| Ignore nextStep replacements | Escaped | Rejected |
| Always use actor A | Escaped | Rejected |
| Always return actor A, but store the requested actor | Escaped | Rejected |
| Always store actor A, but return the requested actor | Escaped | Rejected |
| Accept invalid initial text | Rejected | Rejected |
| Remove invalid-revision validation | Rejected | Rejected |
| Ignore summary replacements | Rejected | Rejected |
| Reuse one receipt ID | Rejected | Rejected |
| Accept stale writes | Rejected | Rejected |
| Expose shared state through read() | Rejected | Rejected |
| Expose shared state through a successful response | Rejected | Rejected |
| Expose the shared receipt through a successful response | Rejected | Rejected |
| Expose the shared receipt list | Rejected | Rejected |
| Mutate text fields before throwing on an invalid write | Rejected | Rejected |
| Return one shared instance from the factory | Rejected | Rejected |
| Throw Error instead of TypeError | Rejected | Rejected |

This audit stops at these 16 counterexamples. It is not exhaustive mutation coverage, proof of client understanding, a Node version compatibility matrix, or certification of the complete private PF3 service.

中文摘要：本轮确认 `nextStep` 未更新与 actor 固定为 A 两类漏检；actor 另拆分为返回值和存储值分别核验。修复后仍为六项契约测试，正确实现 6/6 通过，限定的 16 个错误实现均被拒绝。第六条属于客户端工作流程，不声称服务端能判断调用者是否真正理解状态。到此结束本轮契约审计。

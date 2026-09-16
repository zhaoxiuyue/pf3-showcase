# PF3 Handoff v0.1 · Draft

[中文](README.zh-CN.md) · [Showcase overview](../README.md)

This protocol defines a small versioned handoff for a summary and a next step. It extracts a narrow contract from PF3's collaboration problem for independent implementation and discussion. See the [repository scope](../README.md#scope-and-evidence) for how it relates to the complete PF3 project model.

## Objects and operations

| Object / operation | Fields or result |
|---|---|
| State | `revision`, `summary`, `nextStep` |
| WriteRequest | `expectedRevision`, `summary`, `nextStep`, `actor` |
| Receipt | `id`, `actor`, `beforeRevision`, `afterRevision` |
| `read()` | A detached snapshot of the current State |
| `write(request)` | WriteAccepted or WriteConflict |
| `readReceipts()` | Receipts for successful writes, in creation order |

The [JSON Schema](handoff.schema.json) defines individual message shapes. The [contract suite](../conformance/handoff.mjs) checks behavior across calls.

## Behavioral contract

1. Creation requires non-empty `summary` and `nextStep` strings. The initial `revision` is 1 and the receipt list is empty.
2. A valid write declares the positive integer `expectedRevision` the client read, together with non-empty `summary`, `nextStep` and `actor` strings. Revisions must be JavaScript safe integers; see the schema for the numeric bounds.
3. When the revision matches, a write atomically replaces both text fields, increments the revision by one and creates one receipt. The response contains `ok: true`, `receipt` and the new `state`.
4. A receipt records the request's actor and the exact before/after revisions. Its ID is unique within that instance and is never reused. IDs are opaque: clients must not depend on the reference implementation's numbering format.
5. When the revision does not match, the result contains `ok: false` and a `cas_conflict` error with the expected revision, current revision and a non-empty message. Neither state nor the successful receipt list changes.
6. After a conflict, the client rereads the state and reconsiders its next step. Merely substituting a new revision and resending an old intent is not conflict recovery.
7. Modifying returned state snapshots or receipts does not change shared state. Independent instances do not share state.
8. The synchronous JavaScript binding throws `TypeError` for invalid initial values, invalid revisions, or required text that is not a string or is blank. Invalid writes leave state and receipts unchanged. Exact error wording and language are not fixed by the protocol.

This draft does not define transport, authentication, persistence, idempotent retries, undo, project trees, rule approval, model calls or planning. `actor` is a declared value, not an authenticated identity. Implementations needing those capabilities must define and validate them separately.

## Test your implementation

Place your implementation at the repository root and register it with the suite:

```js
// tests/my-handoff.test.mjs
import { registerHandoffContractTests } from '../conformance/handoff.mjs';
import { createHandoff } from '../my-implementation.mjs';

registerHandoffContractTests(createHandoff);
```

Run `node --test tests/my-handoff.test.mjs`. The factory accepts `{ summary, nextStep }` and returns an instance with the three synchronous methods above. Other languages or asynchronous transports can use the semantics and example messages to build their own checks.

Passing the suite is evidence only for the cases it runs. It does not establish production performance, authorization boundaries or complete PF3 compatibility.

## Versions and examples

**Showcase 0.2.5** and **PF3 Handoff v0.1 draft** are separate versions. The [v0.2.2 audit](../docs/contract-audit-v0.2.2.md) maps all eight clauses to checks and records the bounded mutation audit; the [v0.2.3 control check](../docs/contract-audit-v0.2.3.md) adds acceptance of frozen detached outputs. The [v0.2.4 engineering record](../docs/engineering-v0.2.4.md) covers the CI matrix, schema/examples validation and manifest verification. The behavioral contract, reference semantics and schema remain unchanged.

The schema `$id` is pinned to `https://raw.githubusercontent.com/zhaoxiuyue/pf3-showcase/v0.2.1/protocol/handoff.schema.json`. Changes to this schema receive a new release tag and `$id`; published schema identities are not overwritten.

Each of these files is one message that can be validated directly against the schema:

- [state.json](examples/state.json): a read result, corresponding to `$defs/state`.
- [write-request.json](examples/write-request.json): a write request, corresponding to `$defs/writeRequest`.
- [write-conflict.json](examples/write-conflict.json): a stale-write refusal, corresponding to `$defs/writeConflict`.

[exchange-trace.json](examples/exchange-trace.json) is an **exchange trace** containing `profile`, `scope`, `initial` and `steps`. Its wrapper is not a protocol message and does not validate against this schema. Validate its `initial`, each `request` and each `result` separately. Relationships between successive states require replay or behavioral checks.

[Back to the showcase](../README.md)

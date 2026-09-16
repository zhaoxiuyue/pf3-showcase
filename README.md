# PF3 Showcase · Project Forest 3

**Many AI windows. One shared project state.**

[中文](README.zh-CN.md) · [Design notes](docs/design.md) · [Run the example](#run-the-example) · [Handoff protocol](protocol/README.md) · [Work with Elara](COLLABORATE.md#working-with-elara)

PF3 helps a fresh AI window continue a long-running project: find the current task, understand earlier decisions and failed attempts, and leave results the next window can use.

The project model organizes work into routes with five node states. Executed attempts retain their conclusions; rules have an explicit scope; a handoff brings together the current task, applicable constraints and the version used for write-back. The [design notes](docs/design.md) explain these choices and their tradeoffs.

I'm **Elara**, PF3's designer and builder. I design AI collaboration workflows, integrate MCP and existing tools, and build custom prototypes.

This showcase pairs those design notes with a small, runnable **handoff protocol draft, JSON Schema, independent reference implementation and contract tests**. Its optimistic version check demonstrates one useful property: an older window's write cannot silently overwrite newer shared state.

![A synthetic project view from the complete PF3 implementation](docs/screenshots/demo-tree.png)

*Product view using a synthetic PF3 project. See [scope and evidence](#scope-and-evidence).*

## Run the example

Requires **Node.js ≥ 24**. The demo and contract tests use Node built-ins and run locally.

```sh
git clone https://github.com/zhaoxiuyue/pf3-showcase.git
cd pf3-showcase
npm run demo
npm test
```

The test command runs the same six contract cases against the reference implementation and a frozen-output positive control. See the [v0.2.3 control check](docs/contract-audit-v0.2.3.md).

Two clients read revision 1. A writes successfully and advances the state to revision 2. B's stale write is refused with `cas_conflict`, leaving the state unchanged. B rereads the new state and continues to revision 3.

The example keeps its data in memory for the lifetime of the process.

## Engineering checks

```sh
npm ci
npm run verify
```

`npm ci` installs the locked development-only schema validator. `npm run verify` runs the existing contract tests, validates the schema examples and replays their exchange trace, then verifies the export manifest's file list, byte counts and SHA256 hashes.

[CI](https://github.com/zhaoxiuyue/pf3-showcase/actions/workflows/ci.yml) runs the three checks on Node 24 and 26 across Linux, macOS and Windows. See the [engineering verification record](docs/engineering-v0.2.4.md).

## Explore the repository

The showcase package is **0.2.6**; the protocol remains **PF3 Handoff v0.1 draft**. The unchanged schema `$id` remains pinned to `v0.2.1`. See [versioning and examples](protocol/README.md#versions-and-examples) for the distinction between a message and an exchange trace.

- [Design notes](docs/design.md): five states, route versions, executed attempts, rule scopes and handoff context.
- [Handoff protocol v0.1 draft](protocol/README.md): read, write, version checks, receipts and conflict recovery.
- [JSON Schema](protocol/handoff.schema.json), [a standalone message](protocol/examples/state.json) and [an exchange trace](protocol/examples/exchange-trace.json): individual payloads and the sequence between them.
- [Independent reference implementation](demo/handoff.mjs): a small implementation you can inspect and change.
- [Reusable contract suite](conformance/handoff.mjs): exercise your own synchronous JavaScript implementation against the same checks.
- [Recorded evidence and its scope](docs/evidence.md): separate reproducible example behavior from author-recorded product demonstrations.

![Synthetic command-layer returns: the first write succeeds and the stale write is refused](docs/screenshots/cas-conflict.png)

*Complete PF3 command returns from September 12, 2026, arranged side by side. [Recorded payloads and context](docs/evidence.md).*

## Scope and evidence

- **Runnable here:** PF3 Handoff v0.1 draft, its schema, an independent in-memory implementation and bounded contract tests. These cover the published handoff behavior; transport, persistence, authorization and direct PF3 service integration require a separate implementation and evaluation.
- **Described here:** the design notes and synthetic screenshots explain the complete PF3 project model. The full implementation and operating data remain private; the runnable example implements the small handoff contract. Passing its suite is evidence for the cases it executes.
- **Experience so far:** PF3 is used in the author's multi-project workflow with multiple AI clients. [Evidence and limitations](docs/evidence.md) separate author-recorded experience from reproducible checks. Team and enterprise adoption remain matters for a concrete pilot.

## Collaborate

Bring one recurring handoff, tool-integration or traceability problem. Start with a focused paid pilot: a working deliverable, a defined scope and acceptance criteria. After reviewing the workflow and available inputs, we agree on a quote and schedule. Joint development is also welcome with concrete contributions from both sides.

**[Collaboration details](COLLABORATE.md#working-with-elara)** · **[XiuyueZhao@outlook.com](mailto:XiuyueZhao@outlook.com)**

## License

The distributed protocol, schema, code and tests outside `docs/` use [Apache-2.0](LICENSE). Materials inside `docs/` use [CC BY 4.0](docs/LICENSE-docs.md). See [NOTICE](NOTICE). Future evidence milestones are described in the [roadmap](docs/roadmap.md).

# PF3 Showcase · Project Forest 3

**Many AI windows. One shared project state.**

[中文](README.zh-CN.md) · [Run the example](#run-the-example) · [Handoff protocol](protocol/README.md) · [Work with Elara](COLLABORATE.md#working-with-elara)

PF3 explores a recurring workflow problem: a fresh AI window needs the current task, prior conclusions and next steps, while stale write-backs must not overwrite newer work.

I'm **Elara**, PF3's designer and builder. I design AI collaboration workflows, integrate MCP and existing tools, and build custom prototypes.

This repository opens a small **handoff protocol draft, JSON Schema, independent reference implementation and reusable contract tests**, plus synthetic demonstration material. The complete PF3 implementation and operating data remain private.

![A synthetic project view from the complete PF3 implementation](docs/screenshots/demo-tree.png)

*This is a synthetic PF3 project, not customer data. The independent example below implements versioned handoff, not this full UI.*

## Run the example

Requires **Node.js ≥ 24**. The demo and contract tests need no third-party packages, API keys, model calls or remote services.

```sh
git clone https://github.com/zhaoxiuyue/pf3-showcase.git
cd pf3-showcase
npm run demo
npm test
```

The test command runs the same six contract cases against the reference implementation and a frozen-output positive control. See the [v0.2.3 control check](docs/contract-audit-v0.2.3.md).

Two clients read revision 1. A writes successfully and advances the state to revision 2. B's stale write is refused with `cas_conflict`, leaving the state unchanged. B rereads the new state and continues to revision 3.

Everything runs in memory and ends with the process. The example does not connect to private PF3 or MCP, and does not include persistence, undo, authorization or the full project model.

## Engineering checks

```sh
npm ci
npm run verify
```

`npm ci` installs the locked development-only schema validator. `npm run verify` runs the existing contract tests, validates the schema examples and replays their exchange trace, then verifies the export manifest's file list, byte counts and SHA256 hashes. The manifest checker only reads; it never refreshes hashes to make a check pass.

[CI](https://github.com/zhaoxiuyue/pf3-showcase/actions/workflows/ci.yml) runs the three checks on Node 24 and 26 across Linux, macOS and Windows. See the [engineering verification record](docs/engineering-v0.2.4.md).

The showcase is frozen after v0.2.4. A future 0.3.x will wait for publicly verifiable MountainRS evidence.

## What is open

The showcase package is **0.2.4**; the protocol remains **PF3 Handoff v0.1 draft**. The unchanged schema `$id` remains pinned to `v0.2.1`. See [versioning and examples](protocol/README.md#versions-and-examples) for the distinction between a message and an exchange trace.

- [Handoff protocol v0.1 draft](protocol/README.md): read, write, version checks, receipts and conflict recovery.
- [JSON Schema](protocol/handoff.schema.json), [a standalone message](protocol/examples/state.json) and [an exchange trace](protocol/examples/exchange-trace.json): individual payloads and the sequence between them.
- [Independent reference implementation](demo/handoff.mjs): a small implementation you can inspect and change.
- [Reusable contract suite](conformance/handoff.mjs): exercise your own synchronous JavaScript implementation against the same checks.
- [Recorded evidence and its scope](docs/evidence.md): separate reproducible example behavior from author-recorded product demonstrations.

**This is a minimal handoff contract, not the complete PF3 MCP API or a compatibility certification.** Passing the suite is evidence only for the cases it runs. Full product integration and use in a real business workflow require further evaluation.

![Synthetic command-layer returns: the first write succeeds and the stale write is refused](docs/screenshots/cas-conflict.png)

*Recorded from complete PF3 on September 12, 2026 and laid out side by side. The public example illustrates the same mechanism but is not that service.*

## Collaborate

Bring one recurring handoff, tool-integration or traceability problem. Start with a focused paid pilot: a working deliverable, a defined scope and acceptance criteria. Joint development is also welcome with concrete contributions from both sides.

Complete PF3 currently validates one owner using multiple AI clients. Team permissions and enterprise workflows need scenario-specific evaluation. The author's September 11, 2026 snapshot counted 12 projects, 224 nodes and 1,776 receipts; these are self-reported historical figures, not customer counts or third-party certification. The related MountainRS research repository will be published separately.

**[Collaboration details](COLLABORATE.md#working-with-elara)** · **[XiuyueZhao@outlook.com](mailto:XiuyueZhao@outlook.com)**

## License

The distributed protocol, schema, code and tests outside `docs/` use [Apache-2.0](LICENSE). Materials inside `docs/` use [CC BY 4.0](docs/LICENSE-docs.md). See [NOTICE](NOTICE). This repository does not include the complete PF3 implementation, internal documents, Git history, database or private knowledge bodies.

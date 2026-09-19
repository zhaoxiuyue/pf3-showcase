# PF3 Showcase · Project Forest 3

**Plan and review in web chat. Build with local agents. Keep one shared project state.**

[中文](README.zh-CN.md) · [Real collaboration case](#a-real-project-mountainrs) · [Design notes](docs/design.md) · [Protocol demo](#protocol-demo)

PF3 connects architecture discussions, route reviews, and local execution through a shared project tree containing tasks, decisions, applicable rules, and recorded outcomes.

This showcase contains **a real MountainRS collaboration case, original PF3 interface captures, design notes, and an independent protocol example you can run locally**.

## From web discussion to local execution

A design can make sense in web chat while depending on something the local files do not contain. Once implementation uncovers that gap, the discussion window needs to see what changed.

In PF3, connected web-chat and local clients work from the same project state:

1. **Plan and review:** read the goal, route, current contract and relevant history; propose a design or flag a missing prerequisite.
2. **Check and execute:** inspect local files, test the premises and carry out the agreed work; record results, problems and supporting references.
3. **Review again:** read those findings, decide how the route should change, and retain the decision for the next participant.

People and agents write the useful findings into PF3. A new window reads the stored state and follows references as needed. The owner's decisions, the tools available to each client and the project's rules determine who can act on a proposal.

## A real project: MountainRS

In Elara's MountainRS research workflow, **ChatGPT in web chat, Claude Code and Codex used the same PF3 tree**. The [project-management retrospective](https://github.com/zhaoxiuyue/MountainRS/blob/b609450b8c1cea920df2bc256dbab1e55683c302/docs/one-tree-three-clients.en.md#3-three-roles-one-source-of-project-state) describes the division between web discussion, local fact checking and owner decisions.

One episode makes the collaboration concrete:

- **The premise:** Stage 7.3's contract relied on seven definitions for spatial evaluation blocks being available upstream.
- **The local finding:** inspection of four frozen documents found those definitions missing. The prerequisite check blocked activation.
- **The decision:** the owner approved a core-topology subprotocol; contract clauses ③ and ⑧ were revised before execution.
- **What stayed on the tree:** the progress record retained the missing premise, the approved repair and its receipt reference, so a later reader could inspect how the plan became executable.

![Original Stage 7.3 progress in PF3: claude-code records the missing definitions, owner-approved subprotocol and contract revision](docs/screenshots/mountainrs-stage7.3-progress.zh-CN.png)

*Original interface detail captured September 19, 2026, showing the August 8 progress entry. [English translation and source files](docs/mountainrs.md#stage-73). The client roles come from the retrospective; this image shows the local execution record.*

Read the [case and its public research artifacts](docs/mountainrs.md#stage-73), including the preflight manifest's recorded blocking history and the approved subprotocol. The case distinguishes public files from author-recorded coordination history.

The tree also preserves earlier failed approaches and paused work:

![Original MountainRS tree: two failed approaches remain beneath a paused debugging route](docs/screenshots/mountainrs-tree.zh-CN.png)

*Original PF3 capture, September 17, 2026. Layout, colors and node relationships are unchanged. [English translation of the visible records](docs/mountainrs.md#read-the-original-tree).*

## What a fresh window receives

The same project state supports both ongoing discussion and a later handoff. PF3 assembles the context when a window reads it.

| Recorded during the work | Available to the next reader |
|---|---|
| Tasks, contracts and progress belong to project nodes. | The current task, its intent and selected recent progress. |
| Executed attempts keep conclusions; paused work keeps its reason. | Relevant conclusions and references to further node details. |
| Rules have global or project scope; constraints target nodes. | Applicable rules and pending constraints for the current node. |
| Writes update versioned state and leave receipts. | Write-back revisions, change references and stale-write rejection. |

The [design notes](docs/design.md) explain how these mechanisms support discussion, execution and review. In the September 18 MountainRS snapshot, no task is active; resuming work first requires the owner's direction.

Read the [actual resume package, including rules and asset locations](docs/mountainrs-resume.en.md) ([original Chinese output](docs/mountainrs-resume.zh-CN.md)). These are Elara's working rules for MountainRS, not PF3's default policies; see their [scope](docs/mountainrs.md#from-the-handoff-to-the-records).

## Protocol demo

Simulate two clients against one shared state in one process. No model, MCP connection or complete PF3 service is involved. The first write succeeds, a second write from the old version is refused, and that client rereads before continuing. This independent example implements the small handoff contract published here.

Requires **Node.js ≥ 24**. The demo and contract tests use Node built-ins and run locally.

```sh
git clone https://github.com/zhaoxiuyue/pf3-showcase.git
cd pf3-showcase
npm run demo
npm test
```

`npm run demo` prints English throughout, including the task text and conflict explanation. For Chinese, run `npm run demo:zh`. Both commands use the same reference implementation.

The test command runs two CLI language checks and the same six contract cases against the reference implementation and a frozen-output positive control. See the [v0.2.3 control check](docs/contract-audit-v0.2.3.md).

Two clients read revision 1. A writes successfully and advances the state to revision 2. B's stale write is refused with `cas_conflict`, leaving the state unchanged. B rereads the new state and continues to revision 3.

The example keeps its data in memory for the lifetime of the process. Full PF3 self-installation and product trials are not available from this repository. The walkthrough documents product behavior; it does not grant access to the private service.

## Engineering checks

```sh
npm ci
npm run verify
```

`npm ci` installs the locked development-only schema validator. `npm run verify` runs the existing contract tests, validates the schema examples and replays their exchange trace, then verifies the export manifest's file list, byte counts and SHA256 hashes.

[CI](https://github.com/zhaoxiuyue/pf3-showcase/actions/workflows/ci.yml) runs the three checks on Node 24 and 26 across Linux, macOS and Windows. See the [engineering verification record](docs/engineering-v0.2.4.md).

## Explore the repository

The showcase package is **0.2.14**; the protocol remains **PF3 Handoff v0.1 draft**. The unchanged schema `$id` remains pinned to `v0.2.1`. See [versioning and examples](protocol/README.md#versions-and-examples) for the distinction between a message and an exchange trace.

- [MountainRS case](docs/mountainrs.md): web/local collaboration, the Stage 7.3 prerequisite failure and repair, original interface captures and supporting files.
- [Design notes](docs/design.md): shared project state for discussion, execution and review; five states, rule scopes and handoff context.
- [Handoff protocol v0.1 draft](protocol/README.md): read, write, version checks, receipts and conflict recovery.
- [JSON Schema](protocol/handoff.schema.json), [a standalone message](protocol/examples/state.json) and [an exchange trace](protocol/examples/exchange-trace.json): individual payloads and the sequence between them.
- [Independent reference implementation](demo/handoff.mjs): a small implementation you can inspect and change.
- [Reusable contract suite](conformance/handoff.mjs): exercise your own synchronous JavaScript implementation against the same checks.
- [Recorded evidence and its scope](docs/evidence.md): separate reproducible example behavior from author-recorded product demonstrations.

## Scope and evidence

- **Runnable here:** PF3 Handoff v0.1 draft, its schema, an independent in-memory implementation and bounded contract tests. These cover the published handoff behavior; transport, persistence, authorization and direct PF3 service integration require a separate implementation and evaluation.
- **Described here:** the design notes explain the complete PF3 project model, and the owner-authorized MountainRS snapshot shows a real project's recorded workflow. The full implementation remains private; the runnable example implements the small handoff contract. Passing its suite is evidence for the cases it executes.
- **Experience so far:** PF3 is used in the author's multi-project workflow with multiple AI clients. [Evidence and limitations](docs/evidence.md) separate author-recorded experience from reproducible checks.

## License

The distributed protocol, schema, code and tests outside `docs/` use [Apache-2.0](LICENSE). Materials inside `docs/` use [CC BY 4.0](docs/LICENSE-docs.md). See [NOTICE](NOTICE). Future evidence milestones are described in the [roadmap](docs/roadmap.md).

Designed and built by **Elara (Xiuyue Zhao)**, an independent developer. [Contact and collaboration](COLLABORATE.md#working-with-elara).

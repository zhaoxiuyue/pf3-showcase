# MountainRS: web discussion and local execution on one tree

[中文](mountainrs.zh-CN.md) · [Showcase overview](../README.md)

MountainRS is Elara's remote-sensing research project. Its PF3 workflow connected ChatGPT in web chat with Claude Code and Codex locally. Participants used the same tree to work with goals, contracts, findings and decisions.

The [retrospective](https://github.com/zhaoxiuyue/MountainRS/blob/b609450b8c1cea920df2bc256dbab1e55683c302/docs/one-tree-three-clients.en.md#3-three-roles-one-source-of-project-state) records web discussion proposing changes, local execution checking files, and the owner deciding intent and tradeoffs. These were this project's roles. Its historical client counts use the labels `oauth:chatgpt`, `claude-code` and `codex`; they do not identify every model interaction.

## Stage 7.3

**A planned dependency turned out to be missing.** Stage 7.3 concerned spatial evaluation blocks within one region of interest. Its contract assumed that upstream documents uniquely defined each block's shape, size, grid anchor, candidate enumeration order, edge handling, tie-break and selection algorithm.

During the August 6–8 work, the local window inspected four frozen Stage 7.0 documents. They still listed the formal block protocol as a prerequisite. All seven required items were missing, so the initial check found Stage 7.3 unready for activation.

On August 8, the owner approved a core-topology subprotocol. It adopted five existing blocks and a deterministic selection rule: take all five and order them by `core_id`. Contract clauses ③ and ⑧ were revised under the recorded receipt `rc_8f02b6c39b79`. A subsequent preflight recorded the definitions and scoring protocol as executable. In this workflow, a passing check still required an owner instruction before execution.

The missing premise, approved decision and revised contract became part of the project record. A later web discussion or local session can inspect how the route reached that state. This is how local findings feed back into planning and review.

### Read the execution record

![Original PF3 Stage 7.3 progress entry, attributed to claude-code](screenshots/mountainrs-stage7.3-progress.zh-CN.png)

*A crop of the original PF3 interface captured on September 19, 2026; no text or layout was changed. It shows the August 8, 11:32 progress entry on node `nd_38d128c40d90`, read at route revision 100. This is a later view of a stored entry, not a recording made during the August session.*

English translation of the visible entry:

> **Recorded progress — claude-code · August 8, 11:32**
>
> Contract clauses ①–⑩ are complete. Artifacts have been written to disk and committed (Git `26b56ee`, `4f0f381`), awaiting the owner's decision on closure.
>
> ① The preflight initially found activation inadmissible while the node was planned: all four frozen Stage 7.0 documents listed the ROI/core protocol as a prerequisite, and all seven items required by clause ③ were missing upstream. The gap was closed after the owner approved `core-topology-subprotocol-v1`; clauses ③ and ⑧ were revised accordingly (`rc_8f02b6c39b79`). Key fact: Stage 7.0's Shadow-risk B raster bounds exactly match Stage 7.1's frozen ROI bounds. The frozen projected boundaries of C5-D3's five cores fall directly on the current grid. Selecting all cores in ascending lexicographic `core_id` order removes the ambiguities in enumeration order, edge handling and tie-break by construction.

### Follow the supporting files

| Source | What a reader can inspect |
|---|---|
| [Activation preflight manifest](https://github.com/zhaoxiuyue/MountainRS/blob/b609450b8c1cea920df2bc256dbab1e55683c302/stage7_real_weak_closure/stage7_3_spatial_blocking/evidence/preflight-manifest-v1.json) | `upstream_documents` identifies the four documents; `verdict.blocking_history` records the missing definitions and later resolution; `approved_subprotocol` records the approval date, path and hash. |
| [Core-topology subprotocol](https://github.com/zhaoxiuyue/MountainRS/blob/b609450b8c1cea920df2bc256dbab1e55683c302/stage7_real_weak_closure/stage7_3_spatial_blocking/docs/core-topology-subprotocol-v1.md) | Sections 1–5 explain the gap, existing block geometry, selection rule and mapping to the evaluation protocol. |
| [Coordination retrospective](https://github.com/zhaoxiuyue/MountainRS/blob/b609450b8c1cea920df2bc256dbab1e55683c302/docs/one-tree-three-clients.en.md#3-three-roles-one-source-of-project-state) | The author's account of the web/local/owner roles and the contract revision. |

These links pin the public research files to commit `b609450`. The source documents are mainly Chinese; the English account and translation above explain the relevant parts. The public files corroborate the prerequisite failure and its resolution. The client division and private receipt references remain author-recorded coordination history; the screenshot alone does not show the web client's actions or a fresh client completing a handoff.

## What a state label leaves out

A new AI window sees Stage 6.5.1-D marked `paused`. That label alone does not say whether to resume it. The recorded reason supplies the condition: return only if a new technical fault occurs in the exporter or local reading pipeline. The two earlier failed attempts also retain their conclusions, so the next window can inspect why those approaches stopped.

This case shows the information available at a handoff: a state, its reason and a condition for continuing. The records below make that concrete.

## Read the original tree

![Original PF3 interface: MountainRS's two failed attempts expanded beneath a paused debugging route](screenshots/mountainrs-tree.zh-CN.png)

*Direct capture of the Chinese PF3 interface on September 17, 2026. The tree's layout, colors and node relationships are preserved.*

The visible records, translated into English:

| In the screenshot | English translation |
|---|---|
| Stage 6.5.1-B · done | Simplified shadow-risk single-scene export |
| Stage 6.5.2-B · done | Local shadow-risk validation and archiving |
| Stage 6.5.3-B · done | Real-reflectance shadow / near-zero mechanism stress test |
| Stage 6.5.1-D · paused · third attempt | Smaller-ROI fast debugging route. Resume only for a new technical fault in the exporter or local reading pipeline. |
| Two earlier attempts, both failed | These are retained under the paused attempt, rather than removed from the tree. |
| Stage 6.5.0-X · failed | Complex GEE shadow-risk prescreen audit. Stop patching the complex audit script; keep low-sun-angle, coverage and QA screening in GEE, and assess near-zero / shadow ratios locally in Python. |
| Stage 6.5.1-X · failed | Large ROI + 95% single-scene full-coverage constraint. No single scene in the current data window meets the constraint; it no longer defines the final data entry route. |
| Dashed connection | Work is suspended, its conclusion remains unresolved, and it may be resumed or branched; later work follows the route below. |
| Stage 7.0 · done | Lock the pre-repair baseline and evaluation criteria for the real-data weak closure. |
| Stage 7.1-R · done · second attempt | Complete the L0 observation data specification and support semantics; one earlier attempt was superseded. |

## From the handoff to the records

This is Elara's historical working configuration for MountainRS, read on September 18, 2026. It contains personalized instructions, including learning routines and assignments to named executors and reviewers. These are not PF3's default rules or general safety or audit policies. Here, a global rule applies across the author's projects; it does not apply to every PF3 installation. Rule text guides work and is not evidence of enforced server-side permissions. Project IDs, revisions and asset paths are record references, not service access grants; some assets are not distributed with this repository.

A September 18, 2026 read returned project revision **6** and route revision **100**. Read the [original Markdown returned by PF3](mountainrs-resume.zh-CN.md), or its [English translation](mountainrs-resume.en.md). Both include the rule text and asset locations. The original tool output is preserved as returned; the English text follows its sections.

1. `pf3_resume` returns applicable global and project rules, the project and route, the current-node section, the write-back contract, and assets. For this project it reports `no_active_node` and lifecycle `abandoned`: the owner deliberately stopped work. The first planned item is Stage 7.9, which is a route position rather than permission to activate it.
2. The route identifies failed and paused nodes. Separate `pf3_read_node` calls retrieve their full reasons, including the two failed conclusions and the debugging resume condition visible in the screenshot.
3. Asset locations and hashes are the executing agents' recorded references. The source explicitly asks a future executor to verify them before use. Write-back versions are likewise a dated snapshot, not current authorization.

The earlier [selected source fields](mountainrs-handoff.json) retain the node IDs, original reasons and revisions from those reads. The full resume record now makes the surrounding rules and asset references visible too. These materials show actual stored state and returned context; they are not a transcript of a model completing work.

## Snapshot and scope

| Recorded field | Value |
|---|---|
| Project | `proj_6cbeea3266ff`, revision **6** |
| Route | `rt_f634f0ab72fb`, revision **100** |
| Nodes | **36**: 23 done, 2 failed, 1 paused, 10 planned, 0 active |
| Project lifecycle | `abandoned`; the owner stopped work on September 10 pending external collaboration |

The [recorded tree extract](mountainrs-tree.json) lists all 36 node IDs, titles and states, plus the original reasons for the two failed nodes and the paused node. It contains selected presentation fields from an owner-authorized live read, not a published PF3 API response format.

This is author-recorded evidence of a real project's workflow. A node marked `done` means its work was closed; it does not establish a successful scientific result. The [MountainRS research repository](https://github.com/zhaoxiuyue/MountainRS/blob/main/README.en.md) became public on September 18, 2026. Its reports, [selected Stage 7.6 result tables](https://github.com/zhaoxiuyue/MountainRS/tree/main/stage7_real_weak_closure/stage7_6_optical_operator/outputs) and [project-management retrospective](https://github.com/zhaoxiuyue/MountainRS/blob/main/docs/one-tree-three-clients.en.md) can now be inspected directly. The research overview and retrospective have English editions; historical stage reports remain mainly in Chinese. Receipt IDs in the retrospective refer to private records, not publicly queryable logs. Most large inputs and outputs remain outside Git, so a full end-to-end research rerun is not available from the repository alone. The [evidence roadmap](roadmap.md) distinguishes this publication from a measured fresh-client handoff.

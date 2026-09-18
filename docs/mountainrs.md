# MountainRS: a real project tree

[中文](mountainrs.zh-CN.md) · [Showcase overview](../README.md)

MountainRS is Elara's remote-sensing research project. Its PF3 tree records the work that ran, the approaches that failed and the conditions for resuming work. The images below use its actual records, read on **September 17, 2026**, with the owner's permission to publish this project tree.

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
| Stage 7.0 · done | Repair the real weak-closure baseline and lock the evaluation contract |
| Stage 7.1-R · done · second attempt | Complete the L0 observation data specification and support semantics; one earlier attempt was superseded. |

## From the handoff to the records

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

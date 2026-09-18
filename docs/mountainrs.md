# MountainRS: a real project tree

[中文](mountainrs.zh-CN.md) · [Showcase overview](../README.md)

MountainRS is Elara's remote-sensing research project. Its PF3 tree records the work that ran, the approaches that failed and the conditions for resuming work. The images below use its actual records, read on **September 17, 2026**, with the owner's permission to publish this project tree.

## What a state label leaves out

A new AI window sees Stage 6.5.1-D marked `paused`. That label alone does not say whether to resume it. The recorded reason supplies the condition: return only if a new technical fault occurs in the exporter or local reading pipeline. The two earlier failed attempts also retain their conclusions, so the next window can inspect why those approaches stopped.

This case shows the information available at a handoff: a state, its reason and a condition for continuing. The records below make that concrete.

## From the handoff to the records

A live read on **September 18, 2026** returned project revision **6** and route revision **100**, matching the published tree snapshot. The following is a translated, selected reading view of that call and three subsequent node reads:

![MountainRS: current handoff state followed by the reasons read from three real nodes](screenshots/mountainrs-handoff.en.svg)

1. `pf3_resume` reports `no_active_node`. Its project section records lifecycle `abandoned`; the owner stopped this project. The first planned item is Stage 7.9, which is a route position, not permission to activate it.
2. The route identifies the failed and paused nodes. Three `pf3_read_node` calls retrieve their full state reasons: the two failed approaches and the debugging resume condition shown above.
3. The handoff supplies project and route revisions for writes that require them. A future client must reread current state before writing; the number in this dated image is not a current credential.

[Selected original fields](mountainrs-handoff.json) preserve the source operation, node IDs, original reasons and revisions. The figure combines these reads for documentation; it is not a single raw handoff, an English interface screenshot or a transcript of a model completing work. Rule text and asset locations are omitted from this public excerpt.

## Read one part of the tree

![Manually translated MountainRS records: two failed approaches, a paused debugging route and completed downstream work](screenshots/mountainrs-tree.en.svg)

*A manually translated and abridged reading view. PF3's product interface is Chinese; this image is documentation, not an English product release.*

1. **A complicated GEE prescreen failed.** Stage 6.5.0-X records the conclusion: stop patching the complex audit script, keep low-sun-angle, coverage and QA screening in Google Earth Engine (GEE), and move near-zero and shadow-ratio assessment to local Python.
2. **A coverage requirement had no qualifying scene.** Stage 6.5.1-X records that no single scene in the current data window meets the large-region, 95% coverage constraint. That constraint no longer defines the final data entry route.
3. **The smaller-region debugging route remains paused.** Stage 6.5.1-D gives a specific return condition: a new technical fault in the exporter or local reading pipeline. The main route subsequently records Stage 7.0 and Stage 7.1-R as done.

A fresh window can read which approaches already failed, their conclusions and when the paused work becomes relevant again. The record preserves these distinctions instead of reducing everything to a completion percentage.

## Original interface capture

![Original Chinese PF3 interface showing the same MountainRS route segment](screenshots/mountainrs-tree.zh-CN.png)

The Chinese image is a direct capture of the live PF3 interface with the two earlier failed attempts expanded. The English image translates selected records and uses a simpler layout; node states, stage identities and the meaning of the recorded reasons are preserved. The five-state teaching example remains in the [design notes](design.md).

## Snapshot and scope

| Recorded field | Value |
|---|---|
| Project | `proj_6cbeea3266ff`, revision **6** |
| Route | `rt_f634f0ab72fb`, revision **100** |
| Nodes | **36**: 23 done, 2 failed, 1 paused, 10 planned, 0 active |
| Project lifecycle | `abandoned`; the owner stopped work on September 10 pending external collaboration |

The [recorded tree extract](mountainrs-tree.json) lists all 36 node IDs, titles and states, plus the original reasons for the two failed nodes and the paused node. It contains selected presentation fields from an owner-authorized live read, not a published PF3 API response format.

This is author-recorded evidence of a real project's workflow. A node marked `done` means its work was closed; it does not establish a successful scientific result. The [MountainRS research repository](https://github.com/zhaoxiuyue/MountainRS) became public on September 18, 2026. Its reports, [selected Stage 7.6 result tables](https://github.com/zhaoxiuyue/MountainRS/tree/main/stage7_real_weak_closure/stage7_6_optical_operator/outputs) and [project-management retrospective](https://github.com/zhaoxiuyue/MountainRS/blob/main/docs/one-tree-three-clients.md) can now be inspected directly. Most large inputs and outputs remain outside Git, so a full end-to-end research rerun is not available from the repository alone. The [evidence roadmap](roadmap.md) distinguishes this publication from a measured fresh-client handoff.

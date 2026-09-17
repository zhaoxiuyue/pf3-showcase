# MountainRS: a real project tree

[中文](mountainrs.zh-CN.md) · [Showcase overview](../README.md)

MountainRS is Elara's remote-sensing research project. Its PF3 tree records the work that ran, the approaches that failed and the conditions for resuming work. The images below use its actual records, read on **September 17, 2026**, with the owner's permission to publish this project tree.

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

This is author-recorded evidence of a real project's workflow. A node marked `done` means its work was closed; it does not establish a successful scientific result. The research repository and its underlying outputs remain private at this snapshot, so this material supports inspection of the recorded workflow rather than an independent rerun of the research. See the [evidence roadmap](roadmap.md) for the later research-artifact milestone.

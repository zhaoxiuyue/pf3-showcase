# PF3 resume package · `proj_6cbeea3266ff`

[Original Chinese tool output](mountainrs-resume.zh-CN.md) · [Project case](mountainrs.md)

English translation of `pf3_resume(format="markdown")`, read on September 18, 2026. The sections follow the actual returned order. Rule text and asset locations are included. The source's September 10 stopping note still describes the repository as private at that date; MountainRS became public on September 18. This dated record documents what the service returned, rather than granting access to it or defining the public demo's protocol.

> Read the sections in order before acting. Write-back versions appear in section 4. The source estimated 9,089 tokens: rules 3,624 (40%); project 1,590 (17%); current node 856 (9%); handoff 385 (4%); assets 2,634 (29%). This is the source's estimate, not a measurement of this English translation.

## 1 · Applicable rules

### Global rules

**[principle] Rule wording: prefer positive instructions** · `rr_162f0440a4cb`@rev2

When writing or revising PF3 project rules, prefer positive actions, priorities, success conditions and expected states: specify what to do, what comes first and when to move on. Use prohibitions only where a safety boundary, authorization gate, fail-closed requirement, privacy boundary or result-blind requirement needs to block a particular action explicitly.

- Trigger: creating or revising PF3 project rules, persistent execution instructions or comparable constraints for successor agents.
- Governs: wording of project rules and texts that guide long-term agent behavior.
- Does not govern: hard boundaries for safety, permissions, privacy, data integrity, result blindness or stopping conditions, where clarity takes priority. Ordinary conversation, factual records and quotations are outside this wording rule.

**[procedure] Shadow curriculum: let project work lead learning; store principles** · `rr_45a64711a332`@rev5

When taking over another project, first read the node list of the learning-plan project and note potentially relevant knowledge areas in the first progress entry. When work encounters a mechanism, offer a short lesson: read the constraints attached to that area, continue from them, and use prediction → observation → explanation. One mechanism per lesson; project pace takes priority. Afterward, attach a node constraint recording what was covered, where the evidence is and what remains. Knowledge entries contain principles—mechanisms, causes, boundaries and evidence—while judgments remain with the owner. Use short titles of two to five Chinese characters; check for duplicates and propose before writing. After owner approval, Opus writes and maintains the entries.

- Trigger: resuming a project other than the learning-plan project; encountering a mechanism such as concurrency, I/O, networking, deployment, environment differences, GPU memory, numerical behavior or safety; or recording knowledge.
- Governs: the learning-plan check at resumption, lesson scope and records, and knowledge-entry format and division of work.
- Does not govern: the learning-plan project's own windows or gate decisions; project objectives and order. Learning follows the project, without changing its goals or opening a project just to teach. A lesson record neither changes a planned node's intent nor activates it.

**[procedure] External integration failures: observe before changing the implementation** · `rr_e8690799ca61`@rev5

When an external integration fails, establish observation first. Before our logs confirm that the request reached us, do not change our implementation based on the other side's error text: that text is their hypothesis, not an observed fact.

- Trigger: a failed external integration with unseen parts of the path, such as the other service's backend, network route or outbound policy.
- Governs: whether observation or code changes come first, and the evidential status of external error messages.
- Does not govern: internal stack traces, failing tests and our own logs, which are direct evidence. Changes based on observed logs are allowed. This requires observation after a failure, not speculative observability work before one.

**[procedure] Execution handoff and state write-back** · `rr_becf2efb6c0f`@rev8

After resuming, act from current PF3 state. Do not require the owner to retell the history or carry authorization phrases between windows. Write back the minimum sufficient information and evidence references that affect the next action.

- Trigger: taking over execution or writing execution state.
- Governs: information sources after handoff and the density of state updates.
- Does not govern: storage of original evidence and full text. Explicit questions to the owner remain appropriate when PF3 state is insufficient.

### Project rules: may tighten, not relax, the global rules

**File organization** · `pr_2d5d0c9acc35`@rev2

Organize by who produced an artifact, whether it can be regenerated and whether a contract fixes its identity—not by topic.

1. The historical evidence area, `stage7_real_weak_closure/`, stays in place. Evidence referenced by a frozen contract, auditor or append-only journal—including export manifests, evidence files, attempt journals, protocols and catalog requests—retains its path and bytes. New versions supersede old ones in separate files. Organization and refactoring work bypass this area; incidental Finder files such as `.DS_Store` may be removed.
2. Each research work package under `stages/<stage>/` is self-contained, with separate locations for configs, raw inputs, documents, reproducible evidence, program outputs, human-readable reports and code. Code finds the root by moving a fixed number of levels up from its own file, without a hard-coded repository name, container name or absolute path. Cross-stage references point to sibling work packages.
3. `.pf/resource-registry.yaml` is the single editable indirection layer for resource paths. When a file moves, update the registry rather than altering evidence to fit the disk layout.
4. Local derived material under `.cache/` is not relocated. Environments such as venvs that embed absolute paths are rebuilt, not moved.
5. New artifacts follow their type: code in `scripts`, configuration in `configs`, raw input in `data`, program output in `outputs`, human-readable reports in `reports`, and reproducible evidence JSON in `evidence`.
6. The external archive `~/ResearchArchive` receives automatically routed downloads and retired artifacts. Retired artifacts go under `~/ResearchArchive/<year>/<month>/mountainrs-attic/`, preserving relative paths. Downloads must move to the resource alias's canonical location before auditing; do not audit them in the archive or point the alias there. Retired material is archived with a hash inventory; actual deletion requires asking the owner.
7. One-time organization records go under `_ops/<date>-<action>/`: complete before/after hash inventories and a migration manifest. Seal them after the move. Counts and individual changes belong there, not in this standing rule.
8. Each container's `README.md` points to its purpose, artifact locations, sibling dependencies and frozen inputs. Do not duplicate a directory listing. If a new window cannot begin from that pointer document, improve the pointers.

**Activation preflight before closure, and result-blind freeze timing** · `pr_d4a37fa568df`@rev3

When an active node has an audited, contract-permitted terminal candidate and one direct planned successor, perform a result-blind, read-only activation preflight for that successor before requesting or executing closure. Check whether frozen upstream identities, definitions, contracts, dependencies, resources and stop conditions uniquely determine the successor's activation protocol. Apart from recording the preflight outcome, do not modify nodes or routes, run successor experiments or candidate models, or produce new evidence.

The outcome must be one of:

- `activation_preflight_ready`: required definitions are unique and resolvable, with no identified blocker.
- `activation_preflight_blocked`: at least one blocker, with one primary reason: `decision_required`, `external_dependency`, `upstream_invalidated`, `evidence_missing` or `permission_or_safety_blocked`.

For `decision_required`, produce a one-page decision request containing the missing or ambiguous item, mutually exclusive options, their costs and later effects, the AI's recommendation and reasons, and evidence references. Do not decide for the owner. Other blocked outcomes record the fact, evidence and a checkable recovery condition.

Write back the minimum sufficient outcome, primary reason and evidence references, plus a recovery condition or decision-request reference when blocked. No preflight outcome closes a node, activates or edits its successor, or authorizes an experiment. State transitions and execution authority follow their respective formal operations.

The following timing decision was made by Elara on August 9, 2026, effective from the current Stage 7.4 resumption and all later nodes:

1. For a node that will read existing result values, the first non-read-only action after activation freezes only a result-blind declaration. It declares that relevant existing values have not been read and binds applicable upstream paths and SHA-256 hashes. It does not freeze protocol/config content or require that content to precede all read-only checks, candidate compilation or cross-review.
2. Freeze completed protocol/config bytes, paths and SHA-256 hashes only after the result-blind candidate passes cross-review. The freeze and PF3 write/readback must precede the first result-value read. The timing requirement is “valid freeze before any result read,” not “valid freeze before every action.”
3. A failed cross-review remains fail closed: no result reads or experiments. Candidate and incident evidence follows the append-only rule. Repairs follow the applicable owner decision, without silent changes to thresholds, rules, ordering, outputs or result-exposure boundaries.
4. This replaces earlier wording that required protocol/config content itself to be frozen as the first action after activation. It preserves preflight, upstream hash binding, cross-review, freezing before result reads, PF3 write/readback and fail-closed requirements.
5. Across adjacent nodes, if a node will produce or read result values while its direct successor remains planned and editable, freeze the successor's `objective`, `passCriteria`, `boundaries` and `explicitExclusions` before those results first appear. Later edits are marked `post-result exploratory` in the exposure audit; unchanged items retain their preregistered status. The successor need not be complete before the current node activates, but its freeze must precede results. Record that fact as a constraint targeting the successor, rather than relying on memory or oral handoff.

**Incident response level and evidence required for escalation** · `pr_1878db6f32b5`@rev1

Effective from Elara's August 9 decision for all subsequent nodes:

1. Match the response level to the event's information content. An event adding no information cannot by itself trigger the highest response level or downgrade result-blind/preregistered status.
2. An actionable issue must include its location and the minimum repair: `file:line` plus changed-line count for code/documents, or the command and smallest parameter/step change for operational issues. An item without this may be recorded as an observation, but not escalated for an owner decision.
3. Record actual operational deviations honestly. Grade the response by the information they add and their effect on design freedom.

**Division of execution and audit work** · `pr_e314ebecd8bb`@rev1

From Stage 7.5, execution belongs to Keke. Lyra reviews the complete artifact set once before node closure and produces one findings report, without creating extra files or versions. Lyra does not block or stop work or demand a decision; ambiguities go in the findings. Each finding includes its location and minimum repair; omit items that cannot provide them.

Promoted from constraint `nc_4e2e3bdb61d5` when node `nd_acc2d6699c89` closed.

Persistent constraints also come from the repository's `CLAUDE.md` (the PF3 architecture charter).

## 2 · Project

**Mountain Remote Sensing Physical Foundation** · `proj_6cbeea3266ff` · project revision **6** · lifecycle **`abandoned`**

Recorded stopping reason:

Stopping type: the showcase hook has been released; no resumption without external collaboration. This was a one-person business producing and publishing a demonstration of its capabilities. The work was deliberately stopped after those materials were released. It was outside the owner's own continuing work agenda; it was neither a technical failure nor an interrupted execution. The research main line remained unfinished, and completing it was not the objective of this stopping decision.

The first seven-part image/text series had been published, covering the Stage 7.9 blocked decision. Code and evidence had been organized for public presentation under CC BY 4.0, with a results-first README, three cases and an independently inspectable entry point. Personal learning notes had been removed from the working tree and history. The recorded stopping note says the repository was still private at the September 10 stopping date, with publication left to the owner. It identifies the author as Elara and gives the public contact `XiuyueZhao@outlook.com`.

Resumption requires an external collaboration or commission. Possible technical paths do not themselves justify resumption.

Where a successor should begin:

- Work through Stage 7.8 was closed as `qualified_multidomain_evidence_frozen`. Stage 8.0's activation preflight was ready, but it was not activated. There were no active nodes, running freeze-timing procedures or half-executed work.
- Constraint `nc_8fe5b4709440` blocks Stages 7.9/7.10/7.11 with primary reason `evidence_missing`: Stage 7.6 produced zero qualified operators and Stage 7.7 produced zero activated states. Both executed normally and passed their fail-closed audits. These are valid negative results and empty sets; the upstream work did not fail.
- Technical reopening requires a `warranted` requalification gate under `nc_b6d6ef3e44f2`. G2, an independent anchor for a Stage 7.5 `deferred_missing_anchor`, and G3, an independent observation constraint on an L1 state whose information path avoids an unqualified operator, are `not_satisfied`. **G1 (`v_sky` IQR) is `not_established`, not `not_satisfied`.** The original inference assumed subset IQR could not exceed full-set IQR; a numerical counterexample refuted it. Lyra found the defect before repository publication. See `stage7_real_weak_closure/stage7_8_multidomain_evidence/evidence/requalification-gate-g1-defect-v1.json`. The report and `run_requalification_gate_v1.py` retain their bytes; the withdrawal is append-only. The overall gate is consequently `not_established`, not `not_warranted`. Settling G1 requires valid fold-level measurements or an owner-approved revision of the measurement-level definition.
- This correction does not lift Stage 7.9's block: `activated_count = 0` is an independent count.
- The record states that Stage 7.9's objective and Stage 8.1's contract at route revision 100 were frozen before relevant results appeared, retaining their preregistered status.
- Handoff entry: `pf3_resume` → `nc_8b4b5b3a8d8c` (Stage 8.0: B1 circularity, B2 naming and `consumer_registry`, B3 G locking, B4 freeze timing) and `nc_1cebedfc14e0` (Stage 8.1's revision window and the observation awaiting decision about propagating B1) → `stages/stage8_0_sar_geometry/README.md`.

Stopping date: September 10, 2026; decided by the owner, Elara.

**Objective:** build a remote-sensing foundation model for mountainous terrain, with faithful, transferable, uncertainty-aware inference of surface geometry and physical state under complex terrain, geometric distortion and heterogeneous illumination.

The original objective also contains a migration-test note: “Migration record creation test.”

### Main route · `rt_f634f0ab72fb` · revision 100

| State | Node | ID |
|---|---|---|
| failed | Stage 6.5.0-X: complex GEE shadow-risk prescreen audit | `nd_f3a98903e084` |
| failed | Stage 6.5.1-X: large ROI + 95% single-scene full-coverage constraint | `nd_1a8f9d2b453f` |
| paused | Stage 6.5.1-D: smaller-ROI fast debugging route | `nd_7f2957ff1de7` |
| done | Stage 7.8: result-blind freeze of multi-domain L0 evidence and independent references | `nd_89bdfb553afb` |
| planned | Stage 7.9: single-ROI L3 evidence-stack inversion and minimal physical self-supervision loop | `nd_59cb52139f59` |
| planned | Stage 7.10: same-domain spatial diagnostics and cross-domain breaks | `nd_321120bdf97e` |
| planned | Stage 7.11: uncertainty calibration, selective risk and OOD | `nd_8372dbe888c3` |
| planned | Stage 8.0: SAR L0 evidence and slant-range geometry operator | `nd_05bf6769e3b1` |
| planned | Stage 8.1: SAR radiation operator, differentiability qualification and state activation | `nd_0bbfead06af5` |
| planned | Stage 8.2: InSAR readiness, LOS deformation observations and L1 dynamic state | `nd_69329c48dbb8` |
| planned | Stage 8.3: optical–SAR/InSAR shared-state joint loop | `nd_93a85c0e0f72` |
| planned | Stage 8.4: L4 spatiotemporal soft priors and fast/slow-variable circuit breaking | `nd_9e07fccbaa0f` |
| planned | Stage 9.0: core-system engineering scale and computational boundaries | `nd_e80b059d0066` |
| planned | Stage 9.1: L5 products, task heads and per-part architecture v3.1 acceptance | `nd_031932e6136a` |

The resume output folds 22 earlier completed nodes. The full tree is available through `pf3_read_project` or the canopy interface. Pending proposals: none.

## 3 · Current node

**There is no active node on the main route.** Confirm direction with the owner before activating work through `pf3_transition_node`.

First planned node: **Stage 7.9 — single-ROI L3 evidence-stack inversion and minimal physical self-supervision loop**, `nd_59cb52139f59`.

**Objective:** use only states activated by Stage 7.7 and operators qualified by Stage 7.6 to complete a first real L3 loop on a multi-temporal evidence stack within one ROI. Reconstruct observations through L2 from state; apply losses only on traceable valid support; produce a closed-set scientific conclusion.

**Acceptance criteria:**

1. Activation preflight freezes the state vector, operator version, input evidence, ROI/support, split, loss decomposition, seeds, budget, metrics, success/stability thresholds, non-evaluable conditions and stop rules.
2. Every loss term binds its quality factors, support and physical origin. Zero support, `unsupported` and model insufficiency cannot be silently filled, encoded as zero targets or treated as negative samples.
3. Separate shared state across observations from scene-local `N(t)` and verify invariant/time-varying boundaries. Do not change operators, state topology, data support or criteria during execution.
4. Pass synthetic recoverability, real observation reconstruction, missing-modality/observation ablation, anti-collapse, state-boundary and multi-seed stability checks. Report all seeds, failed runs and valid support.
5. Compare with a direct-only baseline under a preregistered equal budget; report coverage, `unsupported`, parameter boundaries and no-increment results.
6. Label outputs `observed/inferred`, `prior_only` or `unsupported`. Uncertainty remains a candidate at this stage, not formally calibrated.
7. `scientific_terminal` must be `qualified_minimal_closed_loop`, `completed_bounded_nonqualification` or `deferred_insufficient_supported_evidence`. Bounded nonqualification carries a frozen reason such as `synthetic_recovery_failed`, `collapse_detected`, `real_reconstruction_gate_failed`, `state_boundary_violation`, `loss_support_below_frozen_minimum` or `no_incremental_value`. Deferral is only for external evidence shortages discovered before result exposure.
8. Valid negative results may support closure. Protocol deviations, leakage and provenance/hash/reconciliation failures invalidate the run rather than constituting scientific negative results.
9. Publish a model snapshot, state provenance, operator/input hashes, result ledger, Result Gate and failure signatures.

**Boundary:** establish only a minimal loop for the current single ROI, frozen evidence and frozen L3 configuration. Stage 7.8 being deferred does not itself block this node. Do not claim cross-domain generalization, superiority of the complete architecture or large-scale deployability.

**Explicit exclusions:** no states that have not passed Stage 7.7; no network rewriting of physical state definitions; no texture-reconstruction self-supervised target; no spatial smoothing to fill `unsupported`; no Track B data for tuning.

## 4 · Handoff contract

Write-back versions (C2): project `proj_6cbeea3266ff` revision **6**; main route `rt_f634f0ab72fb` revision **100**.

Writes carry the read revision. For a node on a branch, use `currentRoute` versions. An intervening write causes CAS rejection: compile a new resume package before retrying.

- Use a new idempotency key for each business action; reuse it for a disconnected retry. The same key and content replay the action without writing it twice.
- R1: at most one active node per route. R2: transition to `failed` requires a nonempty reason.
- Progress: `pf3_record_progress`; advance/close: `pf3_transition_node`; edit planned nodes: `pf3_update_route`.
- Record locally verified facts as `evidence`, with upstream file-hash anchors for successor verification. Record owner approval as `decision`, identifying the approver, approved option and accepted cost. The latest entry of each kind enters the resume package.
- Obligations handed to a successor become node constraints through `pf3_write_node_constraint`, targeting that node, rather than being buried in a closure reason.
- Changes to downstream nodes use `pf3_propose_downstream`; applying the proposal requires the owner's authorization phrase (§4.6).
- The source describes one-step receipt reversal through `pf3_undo`, and says recoverable operations do not require prior consultation (§2.8).

## 5 · Necessary assets and knowledge

Asset coordinates are assertions made by the executing agent. PF3 does not validate them: verify hashes before use. Re-registering the same asset name updates its location after a move. Paths and hashes below preserve the source values; their presence here does not imply that every referenced large output is distributed in Git.

- **`stage7.4-R1-executor-candidate-v1`** (code): An implementation locked for formal audit, without execution authorization.
  - Path: `stage7_real_weak_closure/stage7_4_residual_reliability/scripts/run_risk_proxy_v1.py`
  - SHA-256 as recorded: `07a96120b10f2cc8a6a814f98a20c855c2074afc1d0beaae3c5da89e410c968f`
  - Producing node: `nd_095e71a9eccf`

- **`stage7.4-R1-preflight-manifest-v9`** (evidence): The sole v9 R1 preflight, binding the result-blind declaration and audit inputs.
  - Path: `stage7_real_weak_closure/stage7_4_residual_reliability/evidence/preflight-manifest-v9.json`
  - SHA-256 as recorded: `b98f12cd2b5f9176c51b1955ff46e3e3040b8970140d81d8a09d4526e5ccf3bb`
  - Producing node: `nd_095e71a9eccf`

- **`stage7.4-R1-risk-proxy-config-v2`** (config): The risk-proxy machine configuration frozen after the same-cycle R1 audit.
  - Path: `stage7_real_weak_closure/stage7_4_residual_reliability/configs/risk-proxy-config-v2.json`
  - SHA-256 as recorded: `7baff1c30b94684427defd73dacd3926881efc6d7ab69876a0af881593c0305d`
  - Producing node: `nd_095e71a9eccf`

- **`stage7.4-R1-risk-proxy-protocol-v2`** (protocol): The human-readable risk-proxy protocol frozen after the same-cycle R1 audit.
  - Path: `stage7_real_weak_closure/stage7_4_residual_reliability/docs/risk-proxy-protocol-v2.md`
  - SHA-256 as recorded: `db25a068a4c43e9d9f13a62b871d0870f5a8e089724045cf1fcd8e4738242ba3`
  - Producing node: `nd_095e71a9eccf`

- **`stage7.4-R1-runtime-freeze-audit-v2`** (evidence): Original votes and the effective PASS after Elara's same-cycle decision.
  - Path: `stage7_real_weak_closure/stage7_4_residual_reliability/evidence/risk-proxy-runtime-freeze-audit-v2.json`
  - SHA-256 as recorded: `ce878bf150f38944ef1ff08ccd88ee58dbdaefeda901f5a3a239c422889add71`
  - Producing node: `nd_095e71a9eccf`

- **`stage7.4-R1-synthetic-tests-v1`** (test): The formal audit input containing 17 synthetic tests.
  - Path: `stage7_real_weak_closure/stage7_4_residual_reliability/scripts/tests/test_risk_proxy_v1.py`
  - SHA-256 as recorded: `0a20cae07f91b59796e02edee3996ed8ae27efc37aa8890bea6139ff28105857`
  - Producing node: `nd_095e71a9eccf`

- **`stage7.4-activation-preflight-manifest-v3`** (evidence): Preflight evidence of non-unique risk-proxy choices, decision_required and the result-blind gate.
  - Path: `stage7_real_weak_closure/stage7_4_residual_reliability/evidence/preflight-manifest-v3.json`
  - SHA-256 as recorded: `baf79e9b84b61c7c228d75e807159ce0a52aad3f9d10526840d7319e7e7a01c7`
  - Producing node: `nd_38d128c40d90`

- **`stage7.4-activation-preflight-manifest-v6`** (evidence): Preflight evidence that option A was approved but the method package was not unique, so Stage 7.4 could not activate.
  - Path: `stage7_real_weak_closure/stage7_4_residual_reliability/evidence/preflight-manifest-v6.json`
  - SHA-256 as recorded: `e493f5c98a0f56e2b12b24345537d255b0dc7cc30d28094ad99e270c36f4c717`
  - Producing node: `nd_38d128c40d90`

- **`stage7.4-activation-preflight-manifest-v8`** (evidence): Preflight evidence that the M2 activation protocol compiled uniquely while the runtime freeze awaited the first action.
  - Path: `stage7_real_weak_closure/stage7_4_residual_reliability/evidence/preflight-manifest-v8.json`
  - SHA-256 as recorded: `872146918cd83017d7a31a110c2ab921930f93c6b2a7c0e5c520c97447da966a`
  - Producing node: `nd_38d128c40d90`

- **`stage7.4-residual-reliability-report-v1`** (report): Stage 7.4's descriptive scientific conclusions and explicit exclusions from evaluation.
  - Path: `stage7_real_weak_closure/stage7_4_residual_reliability/reports/residual-reliability-report-v1.md`
  - SHA-256 as recorded: `6aef9cffc0d7ff5ea6fb5d56867e192f78bed8b8fd281cfd5081a2428f92fc6b`
  - Producing node: `nd_095e71a9eccf`

- **`stage7.4-result-blind-declaration-v1`** (evidence): The Stage 7.4 R1 result-blind declaration and 22 upstream path/hash anchors; it does not freeze protocol content.
  - Path: `stage7_real_weak_closure/stage7_4_residual_reliability/evidence/result-blind-declaration-v1.json`
  - SHA-256 as recorded: `sha256:b39dd6d585bd3142e9c4734efef002df33ddb99da40d765f063837cc4c9c783b`
  - Producing node: `nd_095e71a9eccf`

- **`stage7.4-risk-proxy-aggregation-table-v1`** (data): Equal-per-acquisition aggregates and five-state counts for B4/B5 and four scopes.
  - Path: `stage7_real_weak_closure/stage7_4_residual_reliability/outputs/risk-proxy-aggregation-table-v1.json`
  - SHA-256 as recorded: `2439b02ed93f74eb5e851c4d53c161f7c049adb0c8618e429457ac6499dd58fd`
  - Producing node: `nd_095e71a9eccf`

- **`stage7.4-risk-proxy-decision-request-v2`** (decision_request): Mutually exclusive risk-proxy options A/B/C, costs and the owner's receipt format.
  - Path: `stage7_real_weak_closure/stage7_4_residual_reliability/docs/risk-proxy-decision-request-v2.md`
  - SHA-256 as recorded: `1d792bb402fc45faa5c5452dbe60245f39d99122afb3a507a366082e6775c9ab`
  - Producing node: `nd_38d128c40d90`

- **`stage7.4-risk-proxy-method-pack-decision-request-v3`** (decision_request): Three complete method packages M1/M2/M3 for the owner's unique selection.
  - Path: `stage7_real_weak_closure/stage7_4_residual_reliability/docs/risk-proxy-method-pack-decision-request-v3.md`
  - SHA-256 as recorded: `41e29c75212c8e622a93143399bf119271fed34620202c7d2eff934f7325a861`
  - Producing node: `nd_38d128c40d90`

- **`stage7.4-risk-proxy-reconciliation-manifest-v1`** (evidence): Reconciliation of members, masks, terminal states, denominators, folds, verdicts and output hashes.
  - Path: `stage7_real_weak_closure/stage7_4_residual_reliability/evidence/risk-proxy-reconciliation-manifest-v1.json`
  - SHA-256 as recorded: `d891c11b2005cc6306521c5e2cbb7b5ea58e50301b18db9e04fdcaf17ff646d6`
  - Producing node: `nd_095e71a9eccf`

- **`stage7.4-risk-proxy-risk-curve-table-v1`** (data): A fixed coverage grid, exact points and 720 scope decisions.
  - Path: `stage7_real_weak_closure/stage7_4_residual_reliability/outputs/risk-proxy-risk-curve-table-v1.json`
  - SHA-256 as recorded: `6d65f6dd9c8919b53a83545e98b30c2492119ed30f5764490641f32dd022cea2`
  - Producing node: `nd_095e71a9eccf`

- **`stage7.4-risk-proxy-stratum-table-v1`** (data): Support, scoring and selective-coverage details across five strata.
  - Path: `stage7_real_weak_closure/stage7_4_residual_reliability/outputs/risk-proxy-stratum-table-v1.json`
  - SHA-256 as recorded: `87164338337dc111930699e2fe76386fe8c0386e7b4aab898f0e5011bbf2adca`
  - Producing node: `nd_095e71a9eccf`

- **`stage7.4-risk-proxy-unit-status-ledger-v1`** (evidence): Terminal states and fallback reconciliation for 180 acquisition×band×fold units.
  - Path: `stage7_real_weak_closure/stage7_4_residual_reliability/evidence/risk-proxy-unit-status-ledger-v1.json`
  - SHA-256 as recorded: `7af67215e73b49750cbf5726bcc1783fd42240da0601e009cea4559da84b4eb8`
  - Producing node: `nd_095e71a9eccf`

Knowledge recorded for this project (identities only; the source names `pf3_request_knowledge_bodies` as the separate full-text read):

- `mountainrs-inversion-001`: Forward models and inversion (concept)
- `mountainrs-inversion-002`: Identifiability (concept)
- `mountainrs-inversion-003`: Gauge freedom (concept)
- `mountainrs-inversion-004`: Least squares (method)
- `mountainrs-inversion-005`: Jacobian matrix (concept)
- `mountainrs-observation-001`: Underlying surface (concept)
- `mountainrs-observation-002`: Remote-sensing pixel (concept)
- `mountainrs-observation-003`: Spectral band (concept)
- `mountainrs-observation-004`: Landsat product levels (concept)
- `mountainrs-quality-001`: Pixel QA flags (concept)
- `mountainrs-quality-002`: Independent observations (concept)
- `mountainrs-quality-003`: Selective prediction (method)
- `mountainrs-quality-004`: Spatial blocking (method)
- `mountainrs-quality-005`: Uncertainty calibration (concept)
- `mountainrs-radiometry-001`: Reflectance (concept)
- `mountainrs-radiometry-002`: Three irradiance components (mechanism)
- `mountainrs-radiometry-003`: Atmospheric correction (mechanism)
- `mountainrs-radiometry-004`: Directional reflectance (concept)
- `mountainrs-terrain-001`: Digital elevation model (concept)
- `mountainrs-terrain-002`: Terrain effects (concept)
- `mountainrs-terrain-003`: Self-shadow and cast shadow (concept)
- `mountainrs-terrain-004`: Slope and aspect (concept)
- `mountainrs-terrain-005`: Terrain incidence cosine (concept)

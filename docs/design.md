# How PF3 connects discussion, execution and review

[中文](design.zh-CN.md) · [Showcase overview](../README.md)

A web discussion needs the project's goals, decisions and constraints to review a plan. A local agent needs the same context alongside the files it can inspect and change. PF3 gives that shared project state an explicit structure and assembles a view for each new window.

This is the author's explanation of the current design. The [MountainRS case](mountainrs.md#stage-73) shows its use in a real workflow; the [evidence record](evidence.md) identifies what readers can inspect or run.

## Shared state across web and local clients

| Part of the work | What PF3 makes available |
|---|---|
| Architecture discussion and route review | Goals, ordered tasks, current contracts, applicable rules and earlier conclusions |
| Local fact checking and execution | The same project context, with references to files that the local client can inspect |
| Review of an execution result | Recorded progress, problems, decisions and supporting asset references |
| Agreed changes and later continuation | Revised plans, scoped constraints, write revisions and receipts |

The clients work against the same service state through their configured access. Reading the tree lets a web-chat participant examine a route and its recorded premises. Local file inspection and tests establish whether those premises hold in the checkout. Findings written back to the tree can inform the next discussion.

PF3 supplies the records; people and agents still have to read, reason, check and write. Recording a proposal, deciding whether to accept it, and executing it are distinct parts of the workflow. MountainRS assigned the owner decisions about intent and cost, web chat proposals and review, and local windows factual checks and execution. Those roles describe that project, not a universal allocation of authority.

## A real premise corrected before execution

Stage 7.3 in MountainRS required seven upstream definitions for spatial evaluation blocks. Inspection of four frozen documents found them missing. The owner approved a subprotocol, the contract was revised, and the local progress record preserved both the initial failure and the resolution. The [original interface entry and public preflight file](mountainrs.md#stage-73) let a later reader follow that change.

The mechanisms below retain the meaning of that work: what was planned, which conditions allowed execution, what evidence changed the plan, and what remains relevant to the next reader.

## Five states separate readiness, execution and conclusions

| State | What the next window should understand |
|---|---|
| `planned` | This work has been proposed and has not started. |
| `active` | This is the route's current execution focus. |
| `paused` | Work has started and is on hold; its outcome is still open. |
| `done` | This attempt has a completion conclusion. |
| `failed` | This attempt has a failure conclusion and a recorded reason. |

The important distinction is between pausing and concluding. A missing input may justify a pause while the approach remains viable. A failed attempt leaves a conclusion the next window needs to consider before trying again. Reasons, evidence and decisions supply detail alongside the state.

Each route has at most one active node. Its ordered nodes show earlier attempts, the current focus and proposed work ahead.

## A route version covers decisions involving several nodes

The rule “at most one active node per route” involves the whole route. Activating one node requires knowing whether another node is already active. The route therefore provides the version checked by node transitions and route edits.

A version only on each node would still need coordination across nodes to preserve that rule. One route version makes the consistency boundary explicit to the caller. Its cost is broader contention: otherwise unrelated work on the same route can cause a conflict and require rereading. That is a choice made for the author's workflow with a small number of AI clients; its suitability for a busy team needs evaluation.

The public example isolates the stale-write check with `revision`, `summary` and `nextStep`. You can run that property independently and inspect how the caller recovers. The route-level design above explains why a version check matters in the larger workflow.

## An executed attempt keeps its conclusion when work resumes

Normal route edits preserve nodes that have execution records. A failed attempt includes its reason. Trying again creates a new attempt linked to the earlier one, so the next window can distinguish “this approach failed under these conditions” from “we are trying it again with a changed premise.” Completed work follows the same principle when reopened.

Unstarted planned work remains easy to edit or remove. This keeps tentative planning lightweight while preserving the meaning of work already performed. The tradeoff is a longer visible history. Receipts support examining changes and, for supported operations, explicit correction or undo; preserving an attempt's conclusion does not make every write irreversible.

## Rules belong to the work they affect

| Scope | Purpose |
|---|---|
| Cross-project rules | Long-lived rules reviewed by the owner because they affect many future handoffs |
| Project rules | Decisions that apply throughout one project |
| Node constraints | A specific condition for a named later node |

A node constraint accompanies the node that needs it. On closure, it is resolved as consumed or promoted to a project rule when its applicability extends further. A rule intended to apply across projects goes through the broader review path.

This assigns a lifetime and audience to each instruction. It also creates work at closure: the caller must decide what was used and what still matters. A conflict between cross-project rules is presented for a decision rather than settled automatically from a priority number.

## A handoff brings the current work into view

### What am I continuing?

PF3 presents the current node's objective, acceptance criteria and boundaries. A planning or review window can read the same requirements as an executor. If no node is active, the handoff says so.

### What conclusion led here?

PF3 brings together the earlier conclusions referenced by the current node and access to their supporting material. Stage 7.3 references Stage 7.2, whose closing record preserves the missing definitions, approved subprotocol and contract revision.

### Which constraints apply?

PF3 supplies applicable cross-project rules, project rules and constraints addressed to the current node. In MountainRS, a recorded obligation for Stage 7.9 requires checks of two upstream counts before activation; the condition remains attached to the future work across window changes.

### Which version did I read?

PF3 presents the route version read and the corresponding write-back requirements, so writes that require version checks remain tied to the state read in this session.

### What result should I leave?

PF3 presents acceptance criteria and handoff requirements so this session can record what was done, the basis for its conclusion and the next step. Closing a node also requires resolving its pending constraints.

Code, reports and other assets remain in their own locations and can be opened through their references as needed.

## What is assembled, and what still needs a reader

People and agents supply progress, decisions, evidence and references during the work. The continuity compiler assembles a read-time view from that stored state. It does not infer unrecorded decisions from chat or certify the truth of a reported result.

The view includes active global rules, project rules and pending constraints targeting the current node. For that node's progress, it selects the latest handoff event (progress or problem), decision and evidence. Other history stays available through node reads. Project asset locations are supplied as claims for the reader to verify.

The displayed token count is an estimate of the package size, not a token budget or an automatic limit. Explicit scopes and selected progress help organize the context; they do not guarantee a small package for every project.

A handoff note can also preserve reasons, rules and history. PF3 puts their organization and versioned writes into a shared workflow, so each new window can start from the recorded project state. In the [MountainRS example](mountainrs.md#from-the-handoff-to-the-records), that means reading the handoff and then opening the relevant failed and paused nodes, without reconstructing those conclusions from an earlier chat.

## What to evaluate in this workflow

Follow one premise through discussion, local verification and a recorded decision. Can a reader find why the plan changed, inspect the supporting file and identify what remains to be done? The [MountainRS case](mountainrs.md#stage-73) provides historical records for that inspection.

A future fresh-client exercise should also record what a connected web or local client actually reads, checks and writes, and what the next participant receives. That remains a separate [evidence milestone](roadmap.md#next-evidence-milestone-03x). The public contract tests cover the small versioned-write example.

[Read the real case](mountainrs.md#stage-73) · [Run the handoff example](../README.md#protocol-demo)

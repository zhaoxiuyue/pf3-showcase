# How PF3 organizes project continuity

[中文](design.zh-CN.md) · [Showcase overview](../README.md)

A fresh AI window needs to know what work is current, which conclusions still matter and what it can change. PF3's project model gives those questions an explicit place. This is the author's explanation of the current design; runnable evidence is identified in the [evidence record](evidence.md) and [repository scope](../README.md#scope-and-evidence).

## Start with a synthetic project tree

The screenshot's synthetic project, “Demo · Does caching actually help?” (缓存到底有没有用), provides the setting for this illustrative continuation. Node ②, “Try an in-memory cache” (试内存缓存), is already failed: its keys include request timestamps, its hit rate is only 11%, and the reason stays on the old node. In this continuation, node ④, “Reshape the cache keys” (按 key 的形状重切缓存), removes the timestamp as a changed premise, reopens ② as a new attempt, and receives a constraint: “Check key shape and reuse before validating against the original criteria.” When ④ finishes validation and closes, if that constraint still applies to later cache experiments in this project, it is promoted to a project rule for ⑤, “Write a rule” (写成一条规则), and subsequent relevant nodes.

![Synthetic project tree: cache attempt ② has failed, while cache-key work ④ is active](screenshots/demo-tree.png)

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

PF3 presents the current node's objective, acceptance criteria and boundaries so a fresh window can continue from the current focus, such as node ④'s cache-key work in the synthetic tree.

### What conclusion led here?

PF3 brings together the earlier conclusions referenced by the current node and access to their supporting material, so the next window can inspect relevant results such as ②'s recorded low hit rate and failure reason.

### Which constraints apply?

PF3 supplies applicable cross-project rules, project rules and constraints addressed to the current node; in this continuation, ④ receives “Check key shape and reuse before validating against the original criteria.”

### Which version did I read?

PF3 presents the route version read and the corresponding write-back requirements, so writes that require version checks remain tied to the state read in this session.

### What result should I leave?

PF3 presents acceptance criteria and handoff requirements so this session can record what was done, the basis for its conclusion and the next step; closing ④ also requires resolving its constraints.

Code, reports and other assets remain in their own locations and can be opened through their references as needed.

## What is assembled, and what still needs a reader

People and agents supply progress, decisions, evidence and references during the work. The continuity compiler assembles a read-time view from that stored state. It does not infer unrecorded decisions from chat or certify the truth of a reported result.

The view includes active global rules, project rules and pending constraints targeting the current node. For that node's progress, it selects the latest handoff event (progress or problem), decision and evidence. Other history stays available through node reads. Project asset locations are supplied as claims for the reader to verify.

The displayed token count is an estimate of the package size, not a token budget or an automatic limit. Explicit scopes and selected progress help organize the context; they do not guarantee a small package for every project.

A handoff note can also preserve reasons, rules and history. PF3 puts their organization and versioned writes into a shared workflow, so each new window can start from the recorded project state. In the [MountainRS example](mountainrs.md#from-the-handoff-to-the-records), that means reading the handoff and then opening the relevant failed and paused nodes, without reconstructing those conclusions from an earlier chat.

## What to evaluate in a pilot

Take one real workflow and observe a handoff: can a fresh client identify the current task and a relevant earlier decision or failure; find the required inputs; complete a defined action; and leave a result the next client can verify? Agree on the acceptance criteria for that workflow before implementation.

The public contract tests establish a small executable baseline. The design choices above give a prospective collaborator concrete questions to evaluate around it.

[Discuss a workflow](../COLLABORATE.md#working-with-elara) · [Run the handoff example](../README.md#protocol-demo)

# How PF3 organizes project continuity

[中文](design.zh-CN.md) · [Showcase overview](../README.md)

A fresh AI window needs to know what work is current, which conclusions still matter and what it can change. PF3's project model gives those questions an explicit place. This is the author's explanation of the current design; runnable evidence is identified in the [evidence record](evidence.md) and [repository scope](../README.md#scope-and-evidence).

## Five states separate readiness, execution and conclusions

| State | What the next window should understand |
|---|---|
| `planned` | This work has been proposed and has not started. |
| `active` | This is the route's current execution focus. |
| `paused` | Work has started and is on hold; its outcome is still open. |
| `done` | This attempt has a completion conclusion. |
| `failed` | This attempt has a failure conclusion and a recorded reason. |

The important distinction is between pausing and concluding. A missing input may justify a pause while the approach remains viable. A failed attempt leaves a conclusion the next window needs to consider before trying again. Reasons, evidence and decisions supply detail alongside the state.

Each route has at most one active node. Its ordered nodes show earlier attempts, the current focus and proposed work ahead. These five states are a deliberate vocabulary for that workflow; the choice is a design tradeoff, not a claim that every project system needs exactly five states.

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

PF3 assembles the applicable rules, necessary project context, current node, write-back information and references to relevant assets. Missing definitions are identified explicitly. Code, reports and other assets can be opened where they live.

The next window should be able to answer: What am I continuing? What conclusion led here? Which constraints apply? Which version did I read? What result should I leave? Organizing these answers is the continuity problem PF3 addresses; version checks keep a write tied to the state on which it was based.

## What to evaluate in a pilot

Take one real workflow and observe a handoff: can a fresh client identify the current task and a relevant earlier decision or failure; find the required inputs; complete a defined action; and leave a result the next client can verify? Agree on the acceptance criteria for that workflow before implementation.

The public contract tests establish a small executable baseline. The design choices above give a prospective collaborator concrete questions to evaluate around it.

[Discuss a workflow](../COLLABORATE.md#working-with-elara) · [Run the handoff example](../README.md#run-the-example)

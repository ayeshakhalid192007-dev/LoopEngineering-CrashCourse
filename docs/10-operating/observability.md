# Observability

> You can't stay the engineer of a fleet you can't see. Observability for loops is
> three artifacts — the run log, the spines, the escalations — and the discipline
> of reading them before they're interesting.

## The three instruments

### 1 · The run log — the fleet's heartbeat monitor

One shared, append-only file. **One line per beat, no exceptions.** This repo's
format ([`shared/loop-run-log.md`](../../shared/loop-run-log.md)):

```text
{"run_id": "2026-07-16T10:31:10Z", "pattern": "checker", "duration_s": 120,
 "items_found": 3, "actions_taken": 0, "escalations": 0,
 "tokens_estimate": 15000, "outcome": "report-only"}
```

Every field earns its place. `items_found` next to `actions_taken` proves the
maker–checker split held — 3 found, 0 taken is the compliance record from
[Step 11](../05-part-3-the-body/11-maker-checker.md). `tokens_estimate` feeds
[cost management](../08-part-6-human-control/cost-management.md). `outcome`
makes the line greppable. And **silence is the loudest signal**. A loop with no
line for a period it should have beaten is *down*. Nothing else will tell you.

### 2 · The spines — per-loop narrative

The run log records *that* things happened. The spine explains *what and why*.
A healthy spine reads like a diary. It holds the checklist state, the lessons,
and the discrepancies, honestly recorded. Read this repo's Day 1 spines for a
live example: they document a beat-count discrepancy instead of smoothing it
over. That is what trustworthy state looks like.

### 3 · Escalations — the fleet asking for help

An escalation is a loop writing "I need a human" into its own spine and
stopping. That is a guardrail *succeeding*, not failing. Track the rate. A rate
of zero forever means your limits are too loose to ever trip. A constant stream
means the loop's job is misdesigned.

## Green ≠ done, operationalized

A status is a claim about the *loop*. Verification is a claim about the *work*.
The two come apart, and the
[verification ladder](../08-part-6-human-control/verification.md) exists for
exactly that gap. Observability's job is simpler: put each layer's evidence
**in one visible place**. Checker verdicts live in a committed spine. Script
results live in CI. The run log ties them together by timestamp.

```mermaid
%%{init: {'theme':'base','themeVariables':{'fontFamily':'ui-sans-serif, system-ui, sans-serif','fontSize':'14px','lineColor':'#94a3b8'},'flowchart':{'curve':'basis','nodeSpacing':45,'rankSpacing':50,'padding':10}}}%%
flowchart LR
    L("run log<br/>one line per beat"):::file --> V("the 5-minute view:<br/>what ran · what it cost ·<br/>what asked for help"):::step
    S("spines<br/>narrative + lessons"):::file --> V
    E("escalations<br/>guardrails firing"):::warn --> V
    V --> H(["🧑 engineer's beat:<br/>decisions, not archaeology"]):::human
    SIL("⚠️ missing log line<br/>= loop is DOWN"):::limit -.-> V
    classDef file fill:#f8fafc,stroke:#64748b,stroke-width:1.5px,color:#334155;
    classDef step fill:#eef2ff,stroke:#6366f1,stroke-width:1.5px,color:#312e81;
    classDef warn fill:#fef9ec,stroke:#f59e0b,stroke-width:1.5px,color:#92400e;
    classDef limit fill:#fff1f2,stroke:#f43f5e,stroke-width:1.5px,color:#9f1239;
    classDef human fill:#fef9ec,stroke:#f59e0b,stroke-width:1.5px,color:#92400e;
```

## The five-minute fleet review

The test of your observability: can you answer these in five minutes, from files,
without asking any model?

1. What ran yesterday, and did anything that *should* have run stay silent?
2. What did each loop cost, and who's nearest their tripwire?
3. Did any maker take an action its checker or level doesn't justify?
4. What escalated, and has a human responded to each?
5. Is any spine's story inconsistent with the log's numbers?

If any answer needs reconstruction, you have found the observability gap. Fix
it *this week*. This repo rebuilt its Day 1 spines by reconstruction, and some
of that history is gone for good.

## Practical defaults

- **Retention:** prune run-log entries older than 30 days (this repo's rule).
  Spines keep their narrative — they are the long-term memory.
- **Timestamps:** UTC everywhere, ISO-8601. Anything else turns correlating
  log, spine, and CI into archaeology.
- **Dashboards:** optional. Files are the source of truth, and a dashboard that
  disagrees with the run log is wrong by definition.
- **Alerting:** two rules only — page on *silence* (expected beat missing) and on
  *escalation*. Alerting on every beat trains you to ignore alerts.

*Next in the handbook: what the instruments catch —
[failure-modes.md](failure-modes.md).*

*Sources:* observability and “green ≠ done” draw on Panaversity's *Loop Engineering: A
Crash Course* (S1) and Addy Osmani's *Loop Engineering* (S5). Full attribution:
[resources/sources.md](../../resources/sources.md).

# `ci-sweeper` — the red-main watcher

> Watches `main`'s CI and, the moment something goes red, classifies the
> failure and reports it — flaky noted, real failures get a drafted (not
> applied) fix recommendation. Ships report-only like every kit in this
> library; the worktree-fix-and-PR behavior is a promotion this loop earns.

**Category:** A · Repo maintenance · **Heartbeat:** schedule/event (CI
completion + 10m reconciliation sweep) · **Level:** L1 (report-only; L2 is
the catalog's target level, earned after one watched real run) · **Cost:**
Very high (once promoted — L1 polling and classification alone is cheap)

## Quickstart

```text
1. Read LOOP.md — the six parts, the prompt, the limits, the three stops, and
   the Promotion to L2 section.
2. ci-sweeper-state.md is your spine — already committed with an empty
   per-failure register.
3. Claude Code: wire a GitHub event trigger (CI completion on main) plus a
   10-minute cron reconciliation sweep, both pointing at
   .claude/skills/loop-task/SKILL.md. OpenCode: rename
   opencode.json.example → opencode.json, add the AGENTS.md line, wire
   skills/loop-task.md into the Actions event + cron wrapper.
4. Rehearse once, by hand, on a real red build before the trigger ever fires:
   "Run the ci-sweeper skill now on the current failing run, exactly as the
   event would."
5. Grade the rehearsal with the loop-verifier agent. PASS → arm the trigger
   at L1. FAIL → fix the skill, never the report.
6. Only after a human has watched one real L1 cycle succeed: consider
   promoting per LOOP.md → Promotion to L2 (worktree fixes, opened PRs, the
   retry-then-blocked bound, a raised token cap).
```

## What's in this kit

| File | Role |
| --- | --- |
| [`LOOP.md`](LOOP.md) | the definition — six parts, prompt, limits, ownership, three stops, and the L2 promotion path |
| [`ci-sweeper-state.md`](ci-sweeper-state.md) | the spine — per-failure classification and report status; promotion status |
| [`loop-budget.md`](loop-budget.md) | caps at L1: 40 runs/day, 300k tokens/day; the L2 fix-attempt caps live here too, dormant until promotion |
| [`loop-constraints.md`](loop-constraints.md) | the constitution — L1 never writes a worktree/PR; L2 never merges `main` or weakens a test |
| [`loop-run-log.md`](loop-run-log.md) | append-only, one line per beat |
| [`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) | the procedure (Claude Code) |
| [`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md) | the read-only reviewer that grades classification + report format |
| [`opencode.json.example`](opencode.json.example) · [`skills/loop-task.md`](skills/loop-task.md) | the OpenCode twin — same skill text, event + cron heartbeat |

## Loop Ready checklist

- [x] Provable success condition — `ci-sweeper-report.md` has a classified entry with a suggested fix for every new failure
- [x] Run limit — 40 runs/day at L1
- [x] Spine written first, committed empty
- [x] Report-only (L1) start — writes only the report + spine + log, like every kit in this library
- [x] Human gate placed — you read the report and decide whether to apply the fix, and separately whether to promote the loop
- [x] One log line per beat, no silent runs
- [x] Kill switch — `loop-pause-all` in `loop-budget.md`

## How this relates to the course

The heartbeat and target level come from the Part V §15A catalog entry, where
`ci-sweeper` also sets the fleet's own priority order — *"ci-sweeper >
pr-babysitter > dependency-sweeper > post-merge-cleanup > daily-triage (red
main blocks everything)."* That urgency explains why the catalog targets L2
for this loop, not why it should skip the L1 proving step every kit in this
library ships with (`kit-state.md`; CLAUDE.md rule 4). The promotion design's
central safety mechanism — retry once, then a `blocked` register instead of a
third attempt — is
[infinite-loops.md scenario 1, the doom loop](../../docs/10-operating/infinite-loops.md#1--the-doom-loop--retry-without-a-bound),
applied directly: *"a per-item retry cap plus the no-progress stop... not try
harder."* The L2 worktree-isolation and maker–checker shape (full suite +
diff-scope verifier, human merges every PR) mirrors the
[dependency-sweeper worked example](../../docs/09-methods/worked-example-dependency-sweeper.md)
— the closest fully-designed sibling loop in this catalog, and the one this
kit's promotion path adapts from.

---

*Source: Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)). Full
attribution: [resources/sources.md](../../resources/sources.md).*

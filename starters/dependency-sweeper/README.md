# `dependency-sweeper` — the nightly update tester

> Keeps dependencies current without breaking the build. Nightly, it tests
> each outdated package's candidate update in a throwaway worktree and
> reports what it would recommend — or writes a `blocked` entry after one
> clean retry. Ships report-only like every kit in this library; opening real
> PRs is a promotion this loop earns and then keeps permanently.

**Category:** A · Repo maintenance · **Heartbeat:** schedule (nightly 02:00,
wrapping a conditional run-until-done body) · **Level:** L1 (report-only week
1); L2 is this loop's **permanent** target once promoted — see the worked
example below · **Cost:** Medium

## Quickstart

```text
1. Read LOOP.md — the six parts, the prompt, the limits, the three stops, and
   the Promotion to L2 section.
2. dependency-sweeper-state.md is your spine — already committed with an
   empty per-package register and blocked list.
3. Claude Code: point a nightly Routine or `claude -p` cron (02:00) at
   .claude/skills/loop-task/SKILL.md. OpenCode: rename
   opencode.json.example → opencode.json, add the AGENTS.md line, wire
   skills/loop-task.md into a cron + wrapper script.
4. Rehearse once, by hand, before the schedule ever fires:
   "Run the dependency-sweeper skill now, exactly as the schedule would."
5. Grade the rehearsal with the loop-verifier agent. PASS → arm the schedule
   at L1. FAIL → fix the skill, never the report.
6. Only after a human has watched one real L1 week succeed: promote to L2
   per LOOP.md — real PRs from the already-tested worktree, human merges
   every one, permanently (L3 auto-merge is explicitly out of scope).
```

## What's in this kit

| File | Role |
| --- | --- |
| [`LOOP.md`](LOOP.md) | the definition — six parts, prompt, limits, ownership, three stops, and the L2 promotion path |
| [`dependency-sweeper-state.md`](dependency-sweeper-state.md) | the spine — per-package status, retry counts, the `blocked` register |
| [`loop-budget.md`](loop-budget.md) | caps: 45 runs/day, 300k tokens/day, 10 update-attempts/beat, 1 retry/package |
| [`loop-constraints.md`](loop-constraints.md) | the constitution — L1 never opens a PR; L2 never merges `main` |
| [`loop-run-log.md`](loop-run-log.md) | append-only, one line per beat |
| [`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) | the procedure (Claude Code) |
| [`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md) | the read-only reviewer — checks report claims against the actual suite run |
| [`opencode.json.example`](opencode.json.example) · [`skills/loop-task.md`](skills/loop-task.md) | the OpenCode twin — same skill text, nightly cron + wrapper heartbeat |

## Loop Ready checklist

- [x] Provable success condition — every outdated dependency has a tested report entry or a `blocked` entry
- [x] Run limit — 45 runs/day, 10 update attempts/beat, 1 retry/package
- [x] Spine written first, committed empty
- [x] Report-only (L1) start — the throwaway worktree never leaves the loop's own sandbox
- [x] Human gate placed — you read the report and decide which updates to apply for real
- [x] One log line per beat, no silent runs
- [x] Kill switch — `loop-pause-all` in `loop-budget.md`

## How this relates to the course

This kit follows the course's own
[worked example — Designing the Dependency-Update Loop](../../docs/09-methods/worked-example-dependency-sweeper.md)
directly: it's the fullest single-source design of any kit in this catalog,
applying the A–F method to this exact loop end to end and shipping its own
verdict — *"Week 1 — L1, report-only... Week 2 — L2, assisted... this is the
loop's permanent operating level. L3 is explicitly out of scope."* This kit's
Promotion to L2 section is that verdict, not a reinterpretation. The
per-package retry-once-then-`blocked` bound is the worked example's own
answer to
[infinite-loops.md scenario 1, the doom loop](../../docs/10-operating/infinite-loops.md#1--the-doom-loop--retry-without-a-bound) —
*"a breaking major version becoming a nightly doom loop"* is named explicitly
as the failure this design removes.

---

*Source: Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)). Full
attribution: [resources/sources.md](../../resources/sources.md).*

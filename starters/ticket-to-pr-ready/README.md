# `ticket-to-pr-ready` — the reproduce-and-fix loop

> Takes a ticket, bug report, or complaint and turns it into a review-ready
> patch: reproduce, prove the root cause, make the smallest credible fix,
> re-verify. Says so honestly if it can't reproduce after two attempts.
> Never folds in an unrelated refactor.

**Category:** D→B · Issue intake → PR · **Heartbeat:** event (per ticket) ·
**Level:** L1 (report-only, drafts-not-opens-PR) · **Cost:** High

**Source:** Loop #16, "The ticket-to-PR-ready loop," from
[Forward Future's Loop Library](https://signals.forwardfuture.com/loop-library/),
original prompt by **Hiten Shah**.

## Quickstart

```text
1. Read LOOP.md — the six parts, the prompt, the limits, the three stops,
   and the source's verbatim prompt.
2. ticket-to-pr-ready-state.md is your spine — already committed with an
   empty per-ticket register.
3. Claude Code: wire a ticket/issue-creation event trigger at
   .claude/skills/loop-task/SKILL.md. OpenCode: rename
   opencode.json.example → opencode.json, add the AGENTS.md line, wire
   skills/loop-task.md into the Actions event.
4. Rehearse once, by hand, on a real ticket before the trigger ever fires:
   "Run the ticket-to-pr-ready skill now on ticket #N, exactly as the event
   would."
5. Grade the rehearsal with the loop-verifier agent — it fails any patch
   that touches a file the fix didn't need, no matter how good the fix
   otherwise is. PASS → arm the trigger. FAIL → fix the skill, never widen
   the patch.
```

## What's in this kit

| File | Role |
| --- | --- |
| [`LOOP.md`](LOOP.md) | the definition — six parts, prompt, limits, ownership, three stops |
| [`ticket-to-pr-ready-state.md`](ticket-to-pr-ready-state.md) | the spine — per-ticket reproduction evidence, root cause, fix, verification |
| [`loop-budget.md`](loop-budget.md) | caps: 20 runs, 300k tokens, 2 reproduction attempts/ticket |
| [`loop-constraints.md`](loop-constraints.md) | the constitution — never folds in an unrelated refactor, never opens a PR at L1 |
| [`loop-run-log.md`](loop-run-log.md) | append-only, one line per beat |
| [`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) | the procedure (Claude Code) |
| [`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md) | the read-only reviewer — fails any patch that scope-creeps |
| [`opencode.json.example`](opencode.json.example) · [`skills/loop-task.md`](skills/loop-task.md) | the OpenCode twin — same skill text, event heartbeat |

## Loop Ready checklist

- [x] Provable success condition — the source's own spec: reproduces before the fix, doesn't after, regressions pass
- [x] Run limit — 20 runs, 2 reproduction attempts/ticket (the attempt cap is the source's own rule)
- [x] Spine written first, committed empty
- [x] Report-only (L1) start — drafts the fix in a throwaway worktree, never opens a PR
- [x] Human gate placed — the source's own review-ready checkpoint
- [x] One log line per beat, no silent runs
- [x] Kill switch — `loop-pause-all` in `loop-budget.md`

## How this relates to the course

This kit uses Forward Future's Loop #16 almost unmodified. Its own rule —
*"do not fold unrelated refactors into the patch"* — matches this repo's
own [`loop-constraints.md`](../../loop-constraints.md) rule ("never refactor
unrelated code — one fix per run") almost word for word, and the
`loop-verifier` enforces it as an automatic FAIL. Its "two serious attempts,
then say so" rule is the doom-loop bound from
[infinite-loops.md, scenario 1](../../docs/10-operating/infinite-loops.md),
already built into the original design rather than added by this library.

---

*Full attribution: [resources/sources.md](../../resources/sources.md).*

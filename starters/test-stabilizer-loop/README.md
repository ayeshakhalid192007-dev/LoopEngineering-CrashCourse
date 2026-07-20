# `test-stabilizer-loop` — the flaky-test root-causer

> Runs the suite N times to catch flakes, roots out the most frequent one,
> and drafts a real fix — never a blind sleep or retry. Stops when N
> consecutive full-suite runs are green, when progress stalls, or when
> approval is needed — the source's own three-way stop.

**Category:** J · Testing & QA · **Heartbeat:** conditional (run-until-done,
on-demand) · **Level:** L1 (report-only, drafts-not-commits) · **Cost:** High

**Source:** Loop #6, "The test stabilizer loop," from
[Forward Future's Loop Library](https://signals.forwardfuture.com/loop-library/),
original prompt by **hungtv27 (@hungtv27)**.

## Quickstart

```text
1. Read LOOP.md — the six parts, the prompt, the limits, the three stops,
   and the source's verbatim prompt.
2. test-stabilizer-loop-state.md is your spine — already committed with an
   empty per-flake register.
3. Claude Code: run it in-session on demand, pointed at
   .claude/skills/loop-task/SKILL.md. OpenCode: rename
   opencode.json.example → opencode.json, add the AGENTS.md line, run
   skills/loop-task.md via a capped for-loop.
4. Rehearse once, by hand, on a real flaky test before running to
   completion: "Run the test-stabilizer-loop skill now for one beat."
5. Grade the rehearsal with the loop-verifier agent — it fails any fix that
   turns out to be a disguised sleep or retry. PASS → run to completion.
   FAIL → fix the skill, never accept a masked cause.
```

## What's in this kit

| File | Role |
| --- | --- |
| [`LOOP.md`](LOOP.md) | the definition — six parts, prompt, limits, ownership, three stops |
| [`test-stabilizer-loop-state.md`](test-stabilizer-loop-state.md) | the spine — per-flake root cause, fix attempts, the `quarantine-candidate` register |
| [`loop-budget.md`](loop-budget.md) | caps: 30 runs, 500k tokens, 1 fix attempt/flake — added by this library; the source specified none |
| [`loop-constraints.md`](loop-constraints.md) | the constitution — never a blind sleep or retry, ever |
| [`loop-run-log.md`](loop-run-log.md) | append-only, one line per beat |
| [`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) | the procedure (Claude Code) |
| [`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md) | the read-only reviewer — automatically fails any masked-cause fix |
| [`opencode.json.example`](opencode.json.example) · [`skills/loop-task.md`](skills/loop-task.md) | the OpenCode twin — same skill text, capped run |

## Loop Ready checklist

- [x] Provable success condition — the source's own spec, verbatim: "N consecutive full-suite runs are green under the recorded conditions"
- [x] Run limit — 30 runs, 1 fix attempt/flake (added by this library)
- [x] Spine written first, committed empty
- [x] Report-only (L1) start — drafts fixes in a throwaway worktree, commits nothing
- [x] Human gate placed — named directly in the source ("approval is required" is one of its own three exits)
- [x] One log line per beat, no silent runs
- [x] Kill switch — `loop-pause-all` in `loop-budget.md`

## How this relates to the course

This kit uses Forward Future's Loop #6 nearly unmodified — its prompt is
already a complete six-part design in miniature: a stopping condition as a
spec ("N consecutive full-suite runs are green"), a checker (the pass
streak, plus "no blind sleep or retry hides an unresolved cause"), and a
human gate named explicitly ("approval is required"). This maps almost
exactly onto this course's three-stops framework
([Step 5](../../docs/04-part-2-heartbeat/05-conditional-run-until-done.md)):
success, no-progress, and a human decision point. This library's only real
addition is L1-first shipping and worktree isolation
([Step 8](../../docs/05-part-3-the-body/08-worktrees.md)) — the source's own
retry discipline already *is* the doom-loop bound from
[infinite-loops.md, scenario 1](../../docs/10-operating/infinite-loops.md).

---

*Full attribution: [resources/sources.md](../../resources/sources.md).*

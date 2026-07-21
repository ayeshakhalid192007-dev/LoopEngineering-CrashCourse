# `docs-sweep` — the documentation-drift finder

> Reviews the codebase against its own docs and flags where documentation
> has gone stale. Ships report-only like every kit in this library; opening
> a real PR with the fix (the original design's default) is a promotion this
> loop earns.

**Category:** E · Documentation · **Heartbeat:** schedule/event (push,
daily) · **Level:** L1 (report-only; the original design opens a PR
directly, L2 here) · **Cost:** Medium

**Source:** Loop #1, "The docs sweep," from
[Forward Future's Loop Library](https://signals.forwardfuture.com/loop-library/),
original prompt by **Matthew Berman**.

## Quickstart

```text
1. Read LOOP.md — the six parts, the prompt, the limits, the three stops,
   and the original verbatim prompt in the Source note.
2. docs-sweep-state.md is your spine — already committed with an empty
   last-swept mark.
3. Claude Code: point a daily Routine (or a push-event trigger) at
   .claude/skills/loop-task/SKILL.md. OpenCode: rename
   opencode.json.example → opencode.json, add the AGENTS.md line, wire
   skills/loop-task.md into an Actions event + cron wrapper.
4. Rehearse once, by hand, before the schedule ever fires:
   "Run the docs-sweep skill now, exactly as the schedule would."
5. Grade the rehearsal with the loop-verifier agent. PASS → arm the schedule
   at L1. FAIL → fix the skill, never the report.
6. Only after a human has watched one real L1 cycle succeed: consider
   promoting per LOOP.md → Promotion to L2 (edit the docs, open a real PR —
   the original design's own default behavior).
```

## What's in this kit

| File | Role |
| --- | --- |
| [`LOOP.md`](LOOP.md) | the definition — six parts, prompt, limits, ownership, three stops, the L2 promotion path, and the verbatim source prompt |
| [`docs-sweep-state.md`](docs-sweep-state.md) | the spine — last-swept commit mark; promotion status |
| [`loop-budget.md`](loop-budget.md) | caps: 10 runs/day, 200k tokens/day — added by this library; the source specified none |
| [`loop-constraints.md`](loop-constraints.md) | the constitution — L1 never edits a doc or opens a PR |
| [`loop-run-log.md`](loop-run-log.md) | append-only, one line per beat |
| [`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) | the procedure (Claude Code) |
| [`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md) | the read-only reviewer — confirms each flagged drift is real |
| [`opencode.json.example`](opencode.json.example) · [`skills/loop-task.md`](skills/loop-task.md) | the OpenCode twin — same skill text, event + cron heartbeat |

## Loop Ready checklist

- [x] Provable success condition — every doc page touching changed code has a report entry
- [x] Run limit — 10 runs/day (added by this library; the source specified none)
- [x] Spine written first, committed empty
- [x] Report-only (L1) start — this library's rule, even though the source loop defaults to opening a PR
- [x] Human gate placed — you read the report and fix the docs yourself, or promote the loop
- [x] One log line per beat, no silent runs
- [x] Kill switch — `loop-pause-all` in `loop-budget.md`

## How this relates to the course

This kit adapts Forward Future's Loop #1, whose original prompt (by Matthew
Berman) is: *"Whenever a documentation pass is needed, review the codebase in
full and make sure all documentation reflects the current implementation.
Update stale documentation, verify the changes, then open a pull request."*
The source specified a stopping condition ("documentation matches the current
implementation") and a finishing state ("a reviewable pull request") but no
heartbeat, spine, checker, or limits — this kit adds all four, and applies
this library's mandatory L1-first rule
([`kit-state.md`](../../kit-state.md); CLAUDE.md rule 4) on top of a source
loop whose own default was already to open a PR.

---

*Full attribution: [resources/sources.md](../../resources/sources.md).*

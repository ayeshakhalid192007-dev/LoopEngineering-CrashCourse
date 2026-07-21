# `repo-cleanup-loop` — the stale-vs-valuable classifier

> Inspects local and remote branches, PRs, commits, and worktrees, and
> reports what's stale versus what's valuable-but-orphaned. Never deletes
> uncertain work, discards uncommitted changes, or closes someone else's PR
> without confirmation — and at L1, never deletes anything at all.

**Category:** A · Repo maintenance · **Heartbeat:** schedule (weekly) ·
**Level:** L1 (report-only) · **Cost:** Low

**Source:** Loop #10, "The repository cleanup loop," from
[Forward Future's Loop Library](https://signals.forwardfuture.com/loop-library/),
original prompt by **Matthew Berman**.

## Quickstart

```text
1. Read LOOP.md — the six parts, the prompt, the limits, the three stops,
   and the source's explicit confirmation rule.
2. repo-cleanup-loop-state.md is your spine — already committed with an
   empty per-item register.
3. Claude Code: point a weekly Routine at .claude/skills/loop-task/SKILL.md.
   OpenCode: rename opencode.json.example → opencode.json, add the
   AGENTS.md line, wire skills/loop-task.md into a cron + wrapper script.
4. Rehearse once, by hand, before the schedule ever fires:
   "Run the repo-cleanup-loop skill now, exactly as the schedule would."
5. Grade the rehearsal with the loop-verifier agent — it spot-checks that
   every "safe-to-remove" claim actually has evidence, and that nothing
   uncertain or unowned was misclassified. PASS → arm the schedule. FAIL →
   fix the skill, never the report.
```

## What's in this kit

| File | Role |
| --- | --- |
| [`LOOP.md`](LOOP.md) | the definition — six parts, prompt, limits, ownership, three stops |
| [`repo-cleanup-loop-state.md`](repo-cleanup-loop-state.md) | the spine — per-item classification and evidence |
| [`loop-budget.md`](loop-budget.md) | caps: 15 runs, 150k tokens — added by this library; the source specified none |
| [`loop-constraints.md`](loop-constraints.md) | the constitution — the source's own confirmation rule for uncertain/unowned items |
| [`loop-run-log.md`](loop-run-log.md) | append-only, one line per beat |
| [`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) | the procedure (Claude Code) |
| [`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md) | the read-only reviewer — checks evidence behind every removal recommendation |
| [`opencode.json.example`](opencode.json.example) · [`skills/loop-task.md`](skills/loop-task.md) | the OpenCode twin — same skill text, cron + wrapper heartbeat |

## Loop Ready checklist

- [x] Provable success condition — the source's own spec: valuable work recovered, remaining state intentional, checked against evidence-backed classification
- [x] Run limit — 15 runs (added by this library)
- [x] Spine written first, committed empty
- [x] Report-only (L1) start — writes only the report + spine + log, deletes nothing
- [x] Human gate placed — the source's own explicit confirmation rule for uncertain work and unowned PRs
- [x] One log line per beat, no silent runs
- [x] Kill switch — `loop-pause-all` in `loop-budget.md`

## How this relates to the course

This kit uses Forward Future's Loop #10 nearly unmodified. Its own explicit
constraint — *"do not delete uncertain work, discard uncommitted changes, or
close someone else's pull request without confirmation"* — is this course's
maker-never-grades-itself and human-gate principles made concrete for a
genuinely risky operation: cleanup work is exactly where an overconfident
loop does irreversible damage. This library ships every kit at L1 report-only
regardless of the catalog's target level
([`kit-state.md`](../../kit-state.md); CLAUDE.md rule 4), so this kit goes
further than the source's own rule — it never deletes anything at all until
a human has watched a real run and promoted it.

---

*Full attribution: [resources/sources.md](../../resources/sources.md).*

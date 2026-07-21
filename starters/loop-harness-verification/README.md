# `loop-harness-verification` — the second-session harness

> A general-purpose harness for scheduled repo work: one session stages a
> patch or outbox message in an isolated worktree, a genuinely separate
> second session verifies it against explicit criteria, and it ships only
> after a pass. This is the exact `loop-verifier` pattern this whole library
> already uses, described independently by an external source.

**Category:** I · Self-improvement / meta · **Heartbeat:** schedule (per
scheduled run of the wrapped task) · **Level:** L1 (report-only,
stages-not-delivers) · **Cost:** Low

**Source:** Loop #17, "Loop Harness Second-Agent Verification Workflow" /
"The Loop Harness verification loop," from
[Forward Future's Loop Library](https://signals.forwardfuture.com/loop-library/),
original prompt by **Istasha**.

## Quickstart

```text
1. Read LOOP.md — the six parts, the prompt, the limits, the three stops,
   and the source's verbatim prompt.
2. loop-harness-verification-state.md is your spine — fill in the "Wrapped
   task" section (what task this instance covers, and a retry limit) BEFORE
   the first beat, then commit it.
3. Claude Code: point a Routine at .claude/skills/loop-task/SKILL.md — the
   loop-verifier agent IS the second-session verifier the source describes.
   OpenCode: rename opencode.json.example → opencode.json, add the
   AGENTS.md line, wire skills/loop-task.md into a cron + wrapper script.
4. Rehearse once, by hand, before the schedule ever fires:
   "Run the loop-harness-verification skill now, exactly as the schedule
   would."
5. Grade the rehearsal — confirm the verifying session was genuinely a
   second, distinct pass, not the same session grading itself. PASS → arm
   the schedule. FAIL → fix the skill, never the report.
```

## What's in this kit

| File | Role |
| --- | --- |
| [`LOOP.md`](LOOP.md) | the definition — six parts, prompt, limits, ownership, three stops |
| [`loop-harness-verification-state.md`](loop-harness-verification-state.md) | the spine — **the wrapped task setup**, per-run source revision/staged output/verifier result/delivery status |
| [`loop-budget.md`](loop-budget.md) | caps: 20 runs, 250k tokens — added by this library; the source specified only its own retry limit |
| [`loop-constraints.md`](loop-constraints.md) | the constitution — the verifier must be genuinely separate, never delivers at L1 |
| [`loop-run-log.md`](loop-run-log.md) | append-only, one line per beat |
| [`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) | the procedure (Claude Code) |
| [`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md) | the read-only reviewer — this literally IS the source's "second Claude session" |
| [`opencode.json.example`](opencode.json.example) · [`skills/loop-task.md`](skills/loop-task.md) | the OpenCode twin — same skill text, cron + wrapper heartbeat |

## Loop Ready checklist

- [x] Provable success condition — the source's own spec: ship (here, report ready-to-ship) only after a pass
- [x] Run limit — 20 runs (added by this library); retry limit per the source, set per wrapped task
- [x] Spine written first, committed — **plus the source's own required wrapped-task setup**
- [x] Report-only (L1) start — stages in an isolated worktree, delivers nothing
- [x] Human gate placed — you read the harness report and deliver it yourself, or promote the loop
- [x] One log line per beat, no silent runs
- [x] Kill switch — `loop-pause-all` in `loop-budget.md`

## How this relates to the course

This kit is worth reading closely: an external, independently-designed loop
converges on **exactly** this course's own
[Step 11 maker–checker split](../../docs/05-part-3-the-body/11-maker-checker.md) —
*"one Claude session stage a patch... and a second Claude session verify it
against explicit criteria."* That is the same shape every `loop-verifier`
agent in this entire 20-kit library already follows. This kit packages that
pattern as its own reusable harness, for wrapping whatever scheduled repo
task doesn't already have a dedicated kit.

---

*Full attribution: [resources/sources.md](../../resources/sources.md).*

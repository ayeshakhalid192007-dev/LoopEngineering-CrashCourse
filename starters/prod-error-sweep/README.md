# `prod-error-sweep` — the production log triager

> Reviews production logs for actionable errors, traces one to its root
> cause, and drafts a verified fix — or stops without making changes if
> nothing actionable is present. Never copies credentials, tokens, PII, or
> private payloads out of the logs it reads.

**Category:** L · Monitoring & incident · **Heartbeat:** schedule (every
1–6 hours) · **Level:** L1 (report-only, drafts-not-opens-PR) · **Cost:**
Medium

**Source:** Loop #4, "The production error sweep," from
[Forward Future's Loop Library](https://signals.forwardfuture.com/loop-library/),
original prompt by **Matthew Berman**.

## Quickstart

```text
1. Read LOOP.md — the six parts, the prompt, the limits, the three stops,
   and the source's redaction constraint.
2. prod-error-sweep-state.md is your spine — already committed with an
   empty per-error register.
3. Claude Code: point a Routine or `claude -p` cron at
   .claude/skills/loop-task/SKILL.md. OpenCode: rename
   opencode.json.example → opencode.json, add the AGENTS.md line, wire
   skills/loop-task.md into a cron + wrapper script.
4. Rehearse once, by hand, before the schedule ever fires:
   "Run the prod-error-sweep skill now, exactly as the schedule would."
5. Grade the rehearsal with the loop-verifier agent — it scans the report
   for anything that looks like a leaked credential or PII, as an automatic
   FAIL check. PASS → arm the schedule. FAIL → fix the skill, never the
   report.
```

## What's in this kit

| File | Role |
| --- | --- |
| [`LOOP.md`](LOOP.md) | the definition — six parts, prompt, limits, ownership, three stops |
| [`prod-error-sweep-state.md`](prod-error-sweep-state.md) | the spine — per-error root cause, fix drafts, verification results (itself redaction-bound) |
| [`loop-budget.md`](loop-budget.md) | caps: 24 runs/day, 250k tokens/day — added by this library; the source specified none |
| [`loop-constraints.md`](loop-constraints.md) | the constitution — the source's own credential/PII redaction rule, never opens a PR at L1 |
| [`loop-run-log.md`](loop-run-log.md) | append-only, one line per beat (also redaction-bound) |
| [`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) | the procedure (Claude Code) |
| [`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md) | the read-only reviewer — scans for leaked secrets as an automatic FAIL |
| [`opencode.json.example`](opencode.json.example) · [`skills/loop-task.md`](skills/loop-task.md) | the OpenCode twin — same skill text, cron + wrapper heartbeat |

## Loop Ready checklist

- [x] Provable success condition — the source's own spec: a report entry with a verified fix, or "nothing actionable" cleanly recorded
- [x] Run limit — 24 runs/day (added by this library)
- [x] Spine written first, committed empty
- [x] Report-only (L1) start — drafts a fix in a throwaway worktree, never opens a PR
- [x] Human gate placed — you read the report and open the real PR yourself, or promote the loop
- [x] One log line per beat, no silent runs
- [x] Kill switch — `loop-pause-all` in `loop-budget.md`

## How this relates to the course

This kit uses Forward Future's Loop #4 nearly unmodified — its stopping
condition ("if no actionable errors are present, stop without making
changes") treats a quiet beat as a genuine success, which is exactly the
opposite of the unprovable-stop anti-pattern this course warns against
([infinite-loops.md, scenario 2](../../docs/10-operating/infinite-loops.md)):
a loop that can correctly report "nothing found" isn't manufacturing
progress. The source's own explicit constraint — never copy credentials,
tokens, PII, or private payloads into prompts, PRs, or chat — is carried
forward as this kit's most important rule, since production logs are exactly
where that data lives.

---

*Full attribution: [resources/sources.md](../../resources/sources.md).*

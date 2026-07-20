# `codex-completion-contract` — the requirement-to-evidence audit

> For long-running work where partial completion could be mistaken for
> done: defines every required outcome and its evidence before acting, then
> audits each requirement as proved, weak, missing, or contradicted.
> Complete only when everything is proved. Budget exhaustion never counts
> as success.

**Category:** I · Self-improvement / meta · **Heartbeat:** conditional
(run-until-done, on-demand — only when explicitly asked) · **Level:** L1
(report-only) · **Cost:** Low

**Source:** Loop #28, "The Codex completion-contract loop," from
[Forward Future's Loop Library](https://signals.forwardfuture.com/loop-library/),
original prompt by **3goblack (@Dis_Trackted)**.

## Quickstart

```text
1. Read LOOP.md — the six parts, the prompt, the limits, the three stops,
   and the source's verbatim prompt.
2. Only invoke this loop when explicitly asked for a completion audit —
   the source's own gate. Ask before filling in codex-completion-contract-
   state.md's "The Goal" section, then commit it.
3. Claude Code: run it in-session on the named Goal, pointed at
   .claude/skills/loop-task/SKILL.md. OpenCode: rename
   opencode.json.example → opencode.json, add the AGENTS.md line, run
   skills/loop-task.md.
4. Rehearse once, by hand, on a real (small) Goal before trusting it on a
   big one: "Run the codex-completion-contract skill now on [Goal]."
5. Grade the rehearsal with the loop-verifier agent — it fails any "proved"
   requirement it can't independently re-verify, and any run that calls
   exhaustion "complete." PASS → trust it on bigger Goals. FAIL → fix the
   skill, never the audit.
```

## What's in this kit

| File | Role |
| --- | --- |
| [`LOOP.md`](LOOP.md) | the definition — six parts, prompt, limits, ownership, three stops |
| [`codex-completion-contract-state.md`](codex-completion-contract-state.md) | the spine — the Goal, the requirement-to-evidence table |
| [`loop-budget.md`](loop-budget.md) | caps: 20 runs, 200k tokens — added by this library; the source specified none |
| [`loop-constraints.md`](loop-constraints.md) | the constitution — never starts itself, never reports exhaustion as success |
| [`loop-run-log.md`](loop-run-log.md) | append-only, one line per beat |
| [`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) | the procedure (Claude Code) |
| [`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md) | the read-only reviewer — re-checks "proved" claims against real evidence |
| [`opencode.json.example`](opencode.json.example) · [`skills/loop-task.md`](skills/loop-task.md) | the OpenCode twin — same skill text |

## Loop Ready checklist

- [x] Provable success condition — the source's own spec: every requirement proved, audit has no weak/missing/contradicted item
- [x] Run limit — 20 runs (added by this library)
- [x] Spine written first, committed — **only with explicit approval**, per the source
- [x] Report-only (L1) start — the catalog's own permanent target for this loop
- [x] Human gate placed — the source's own explicit "only when asked" gate, before the loop even begins
- [x] One log line per beat, no silent runs
- [x] Kill switch — `loop-pause-all` in `loop-budget.md`

## How this relates to the course

This kit is close to a formalization of CLAUDE.md rule 12, "green ≠ done,"
and of Spec-Driven Development's stopping-condition-as-spec discipline
(S3). The source's own vocabulary — proved / weak / missing / contradicted,
and complete / blocked / stalled / exhausted — is more precise than this
course's own three stops, and its single sharpest line — *"budget
exhaustion never counts as success"* — is exactly the distinction this
library draws everywhere between the **Limit** stop and the **Success**
stop: they are never allowed to be confused for each other.

---

*Full attribution: [resources/sources.md](../../resources/sources.md).*

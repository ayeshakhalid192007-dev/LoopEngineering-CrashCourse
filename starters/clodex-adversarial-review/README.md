# `clodex-adversarial-review` — the two-agent review loop

> A real maker–checker loop across two agents: Claude implements and fixes,
> an adversarial reviewer (Codex, or a subagent stand-in) reviews against a
> severity threshold, up to 5 iterations. Never describes an errored or
> exhausted run as approved.

**Category:** B · PR & review · **Heartbeat:** event (per PR, up to 5
iterations) · **Level:** L1 (report-only, drafts-not-pushes) · **Cost:**
Medium

**Source:** Loop #9, "The Clodex adversarial-review loop," from
[Forward Future's Loop Library](https://signals.forwardfuture.com/loop-library/),
original prompt by **Lukas Kucinski**.

## Quickstart

```text
1. Read LOOP.md — the six parts, the prompt, the limits, the three stops,
   and the source's verbatim prompt.
2. clodex-adversarial-review-state.md is your spine — already committed
   with an empty per-PR review-cycle register.
3. Claude Code: wire a PR event trigger at
   .claude/skills/loop-task/SKILL.md — the loop-verifier agent stands in
   for Codex if the real `codex` CLI isn't installed. OpenCode: rename
   opencode.json.example → opencode.json, add the AGENTS.md line, wire
   skills/loop-task.md into the Actions event.
4. Rehearse once, by hand, on a real PR before the trigger ever fires:
   "Run the clodex-adversarial-review skill now on PR #N, exactly as the
   event would."
5. Grade the rehearsal — the loop-verifier checks that a stalled/exhausted
   cycle was never reported as "approved." PASS → arm the trigger. FAIL →
   fix the skill, never the verdict.
```

## What's in this kit

| File | Role |
| --- | --- |
| [`LOOP.md`](LOOP.md) | the definition — six parts, prompt, limits, ownership, three stops |
| [`clodex-adversarial-review-state.md`](clodex-adversarial-review-state.md) | the spine — per-PR iteration count, findings history, verdict (resumable) |
| [`loop-budget.md`](loop-budget.md) | caps: 5 iterations/PR (the source's own), 400k tokens/PR |
| [`loop-constraints.md`](loop-constraints.md) | the constitution — never calls an exhausted run approved, reviewer must be genuinely separate |
| [`loop-run-log.md`](loop-run-log.md) | append-only, one line per beat |
| [`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) | the procedure (Claude Code) |
| [`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md) | the read-only reviewer — doubles as the adversarial-review stand-in when `codex` isn't available |
| [`opencode.json.example`](opencode.json.example) · [`skills/loop-task.md`](skills/loop-task.md) | the OpenCode twin — same skill text, event heartbeat |

## Loop Ready checklist

- [x] Provable success condition — the source's own spec: reviewer approves, or only accepted findings remain
- [x] Run limit — 5 iterations/PR (the source's own cap)
- [x] Spine written first, committed empty — resumable per the source's requirement
- [x] Report-only (L1) start — drafts fixes in a throwaway worktree, never pushes to the real PR
- [x] Human gate placed — you read the verdict and findings and push the fix yourself
- [x] One log line per beat, no silent runs
- [x] Kill switch — `loop-pause-all` in `loop-budget.md`

## How this relates to the course

This kit is a real, working instance of
[Step 11's maker–checker split](../../docs/05-part-3-the-body/11-maker-checker.md):
Claude is the maker, the adversarial reviewer is a genuinely separate pass,
never the same agent grading its own work. The source's own iteration cap
(5) and "progress stalls" stop are exactly the
[maker–checker standoff bound](../../docs/10-operating/infinite-loops.md#8--the-makerchecker-standoff) —
*"a rejection cap... stops the pair and escalates the disagreement to the
human gate."* The source's sharpest rule — *"never describe an errored or
exhausted run as approved"* — is this loop's own version of CLAUDE.md rule
12, "green ≠ done."

---

*Full attribution: [resources/sources.md](../../resources/sources.md).*

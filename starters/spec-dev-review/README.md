# `spec-dev-review` — the adversarially-reviewed spec packet

> For one ticket or story, writes a scoped spec packet — findings, progress,
> task plan, rubric — and rounds it through a genuinely independent
> adversarial review that regression-checks prior findings, not just new
> ones. Stops on a clean pass or logs the remaining blocker for a human.

**Category:** D · Issue & intake · **Heartbeat:** conditional
(run-until-done, on-demand — one per ticket) · **Level:** L1 (report-only,
drafts-not-final) · **Cost:** Medium

**Source:** Loop #21, "The spec dev-review loop," from
[Forward Future's Loop Library](https://signals.forwardfuture.com/loop-library/),
original prompt by **Ximanta (@kharamdau)**.

## Quickstart

```text
1. Read LOOP.md — the six parts, the prompt, the limits, the three stops,
   and the source's verbatim prompt.
2. spec-dev-review-state.md is your spine — already committed with an
   empty review log.
3. Claude Code: run it in-session on a real ticket, pointed at
   .claude/skills/loop-task/SKILL.md. OpenCode: rename
   opencode.json.example → opencode.json, add the AGENTS.md line, run
   skills/loop-task.md.
4. Rehearse once, by hand, on a real (small) ticket before trusting it on a
   big one: "Run the spec-dev-review skill now on [ticket]."
5. Grade the rehearsal with the loop-verifier agent — it fails any "ready"
   verdict that missed a regressed prior finding. PASS → trust it on real
   tickets. FAIL → fix the skill, never the packet.
```

## What's in this kit

| File | Role |
| --- | --- |
| [`LOOP.md`](LOOP.md) | the definition — six parts, prompt, limits, ownership, three stops |
| [`spec-dev-review-state.md`](spec-dev-review-state.md) | the spine — round count, the review log (finding + fix per round) |
| [`loop-budget.md`](loop-budget.md) | caps: 5 rounds/ticket, 300k tokens — the round number is this library's addition |
| [`loop-constraints.md`](loop-constraints.md) | the constitution — reviewer must be genuinely independent, prior findings must stay resolved |
| [`loop-run-log.md`](loop-run-log.md) | append-only, one line per beat |
| [`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) | the procedure (Claude Code) |
| [`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md) | the read-only reviewer — this literally IS the source's "independent adversarial review" |
| [`opencode.json.example`](opencode.json.example) · [`skills/loop-task.md`](skills/loop-task.md) | the OpenCode twin — same skill text |

## Loop Ready checklist

- [x] Provable success condition — the source's own spec: reviewer returns ready with no material findings
- [x] Run limit — 5 rounds/ticket (this library's number for the source's own "round cap")
- [x] Spine written first, committed empty
- [x] Report-only (L1) start — writes a draft packet, never the project's canonical spec
- [x] Human gate placed — the source's own: round-cap exit logs the blocker for human decision
- [x] One log line per beat, no silent runs
- [x] Kill switch — `loop-pause-all` in `loop-budget.md`

## How this relates to the course

This kit is another independently-designed instance of
[Step 11's maker–checker split](../../docs/05-part-3-the-body/11-maker-checker.md),
with a detail worth calling out: the source requires the reviewer to
*"check that prior findings remain resolved,"* not just catch new ones —
a regression check on the review process itself, which is a sharper
discipline than most maker–checker loops bother with. Its round cap on an
unresolved disagreement is the
[maker–checker-standoff bound](../../docs/10-operating/infinite-loops.md#8--the-makerchecker-standoff):
escalate to the human, don't keep iterating past the cap.

---

*Full attribution: [resources/sources.md](../../resources/sources.md).*

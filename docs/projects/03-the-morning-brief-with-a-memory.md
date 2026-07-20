# Project 3 · The Morning Brief with a Memory

> **⚠️ Throwaway repo. Set a limit first.** Point this at real accounts you own (your own
> repos, your own inbox export, a sandboxed Slack workspace) — never a shared production
> surface — and cap runs/day before the first beat.

| Difficulty | Time | Concepts | Loop type |
| --- | --- | --- | --- |
| Medium (T2) | 60–90 min | schedule heartbeat, spine-as-memory, report-only | **schedule loop with cross-beat memory** |

## The scenario

You lead a small platform team running four services in production. Every weekday morning
you want a five-line brief: what merged overnight, what CI is red, which PRs are waiting on
you specifically, and anything that's been open more than 48 hours untouched. Doing this by
hand means re-scanning everything every day — including things you already read yesterday.
The point of *this* project isn't the report; it's that the loop **remembers what it
already told you**, so day two's brief is additive, not a repeat of day one's.

## What you'll build

- **Heartbeat:** schedule, once per weekday morning (or every 15 minutes for testing).
- **Body:** read CI status, PR list, and issue ages across your real repos via the SCM CLI
  — strictly read-only.
- **Spine:** `brief-state.md` — last-seen commit SHA per repo, PR IDs already reported, and
  the "first noticed" timestamp for each open item (this is what lets it compute "open 48h+"
  without re-deriving history every run).
- **Output:** `triage-report.md`, ≤5 lines, ranked, each line naming what/why/suggested
  action — the same shape as this repo's own `starters/daily-triage/`.
- **Stop:** none (schedule loop) — but the exercise's own done-when below is provable.

```claude
# Claude Code
> /loop 1d Read brief-state.md. Compare against current CI status, open PRs, and issue
  ages across <your repos>. Write triage-report.md: at most 5 lines, ranked by urgency,
  each with what/why/suggested-action. Only include items NEW since brief-state.md's
  last-seen marks, or items that crossed the 48h-untouched threshold since last beat.
  Update brief-state.md. Append one log line. Never comment, merge, or close anything.
```

```opencode
# OpenCode
opencode run "Read brief-state.md. Diff against current CI/PRs/issue ages. Write
  triage-report.md (<=5 lines, ranked, what/why/action) covering only NEW items or
  items newly past 48h untouched. Update brief-state.md. Append one log line.
  Read-only outside the report and spine." --schedule daily
```

## Done when (provable stop)

- [ ] `brief-state.md` exists, committed before beat 1, and grows a "last-seen" entry per
      tracked item every beat.
- [ ] Two consecutive daily briefs are produced where the second one demonstrably does
      **not** repeat an item the first one already surfaced (unless its urgency changed).
- [ ] `triage-report.md` never exceeds 5 lines and every line has what/why/action.
- [ ] Nothing outside `brief-state.md`, `triage-report.md`, and the run log was written.

## Going deeper

This project *is* [Step 13](../07-part-5-complete-loop/13-build-the-loop-twice.md)'s
morning-triage loop, scaled down to a personal brief. Once it's running cleanly, diff your
spine design against `starters/daily-triage/daily-triage-state.md` — the "memory" pattern
(last-seen marks, first-noticed timestamps) is identical; only the report's audience
changed from a team to you.

## When it goes wrong

| Symptom | Cause | Fix |
| --- | --- | --- |
| Yesterday's items reappear verbatim | Spine wasn't read before comparing, or wasn't written after | Read the spine at beat start, write it before the beat ends — every time, no exceptions |
| Report silently grows past 5 lines | No hard cap enforced in the body | Treat "more than 5 candidates" as a ranking problem, not a length problem — cut, don't wrap |
| Brief looks the same for a week | Nothing genuinely changed, but the loop should still say so | An empty brief is a valid, honest output — log it, don't skip the beat |

---

*Sources:* the memory-as-spine pattern and the daily-brief shape draw on Panaversity's
*Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)), Step 13,
and the reference repo's own daily-triage pattern
([S7](https://github.com/cobusgreyling/loop-engineering), MIT). Full attribution:
[resources/sources.md](../../resources/sources.md).

# Pattern: `changelog-drafter`

> Changelogs are the first casualty of a busy sprint — everyone means to write
> one, nobody does until release day, and by then half the context is gone.
> This kit drafts one line per merged PR every day (or the moment a release
> tag lands), so the release manager reads a ready draft instead of
> reconstructing history from commit messages. It never writes to the real
> `CHANGELOG.md` itself.

## Quick facts

| Field | Value |
| --- | --- |
| Category | C · Release |
| Heartbeat | schedule/tag |
| Cadence | 1d or tag |
| Level | L1 (report-only, drafts-as-file) |
| Cost | Low |
| Group | A — course-native |

## The six parts

| Part | This kit |
| --- | --- |
| Heartbeat | schedule/tag — daily, or on a release-tag event, whichever comes first |
| Body | reads merged PRs via the SCM CLI since the last-processed PR; writes only `changelog-draft.md`, its own state file, and the run log |
| Spine | `changelog-drafter-state.md` — the last-processed PR number |
| Stopping condition | every merged PR since the last beat has a draft line — machine-checkable against the PR list |
| Checker | a script confirming every merged PR number is accounted for, plus `loop-verifier` grading line quality |
| Human gate | the release manager reads the draft before tagging — nothing lands in the real changelog until they say so |

## The three valid stops

- **Success** — every merged PR since the last beat has a draft line, and the last-processed PR number is updated.
- **Limit** — 10 runs/day or 80k tokens/day.
- **No progress** — 3 consecutive beats stuck on the same unprocessable PR → escalate it in the spine and stop.

---

*Source: Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course))
via the course's own "Worked in 90 seconds" A–F example in
`docs/09-methods/make-your-own-loop.md` — the changelog-pile-up scenario,
adapted from its per-merge event trigger to this catalog entry's
schedule/tag heartbeat. Full attribution:
[resources/sources.md](../resources/sources.md).*

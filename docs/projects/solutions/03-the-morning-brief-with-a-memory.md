# Solution · Project 3 — The Morning Brief with a Memory

> Reference solution. Read [the project](../03-the-morning-brief-with-a-memory.md) first.

## Worked example

Four services tracked: `payments-api`, `billing-worker`, `web-frontend`, `notifications`.

**`brief-state.md`, day 2 (excerpt):**

```markdown
| Repo | Last SHA seen | Reported PR IDs | First-noticed (untouched) |
| --- | --- | --- | --- |
| payments-api | a91f3c2 | #412 | #398 → 2026-07-19T08:00Z |
| billing-worker | 7be201d | — | — |
| web-frontend | c04e91a | #77, #78 | — |
| notifications | 5a1d9ef | — | #61 → 2026-07-20T08:00Z |
```

**Day 1 `triage-report.md`:**

```markdown
1. payments-api CI red on main since a91f3c2 — a migration failed on staging apply. Fix before anything else merges.
2. web-frontend #77 waiting on your review 26h — small CSS-only diff, low risk.
3. notifications #61 open 50h untouched — original author unresponsive; consider reassigning.
```

**Day 2 `triage-report.md`** (the point of this project — nothing repeats unless its
urgency changed):

```markdown
1. web-frontend #78 opened overnight — depends on #77, still unreviewed.
2. notifications #61 now 74h untouched — escalating urgency, unchanged status otherwise.
```

Item 1 from day 1 (payments-api CI) is absent because it was fixed and merged — verified
against the new `last SHA seen`, not assumed. Item 2 from day 1 (#77) is absent because
it's still just "waiting," not new information — only #78, which depends on it, is worth
a fresh line.

## Why this satisfies "done when"

- `brief-state.md` grows a "first-noticed" mark the moment an item is first seen, and that
  mark — not "today's date" — is what makes "74h untouched" on day 2 arithmetically
  honest.
- Day 2's report is strictly additive: no line repeats verbatim, and the one carryover
  item (#61) is included **because its urgency crossed a threshold**, not by default.

## Common wrong turns

- Re-deriving "how long has this been open" from the PR's creation date instead of a
  spine-recorded first-noticed mark — breaks the moment the loop's own definition of
  "noticed" needs to differ from GitHub's raw metadata (e.g., you only start caring after
  a review request, not on open).
- Letting the report grow past 5 lines "just this once" — the cap is what keeps a brief
  a brief instead of a re-triage.

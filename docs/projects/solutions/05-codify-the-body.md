# Solution · Project 5 — Codify the Body

> Reference solution. Read [the project](../05-codify-the-body.md) first.

## Worked example

Repo: a real internal service with an active `CHANGELOG.md` following Keep-a-Changelog
style. `SKILL.md` extracted from three hand-written entries:

```markdown
---
name: changelog-entry
description: Draft one changelog entry for a merged PR in this repo's Keep-a-Changelog format.
---
# Changelog Entry Skill

1. Heading: `### <PR title, sentence case, no trailing period>`
2. One bullet: what changed, user-facing language, no internal jargon (no ticket IDs).
3. Attribute: `(#<PR number>)` at the bullet's end.
4. Skip: PRs titled "chore:", "test:", or with the `no-changelog` label. Skip reverts.

## Worked example
### Fix pagination cursor on the reports endpoint
- Cursor-based pagination on `/reports` no longer skips a row when the page boundary
  falls mid-batch. (#412)
```

**Two fresh-session beats, one day apart**, both invoking the skill with no inline
re-explanation:

```text
Beat 1 draft: "### Add CSV export to the invoices page\n- Invoices can now be exported
as CSV directly from the invoices list. (#418)"

Beat 2 draft: "### Improve error message on failed webhook delivery\n- Webhook delivery
failures now include the HTTP status code and a retry hint in the error payload. (#421)"
```

Both entries follow the identical heading/bullet/attribution shape — neither session's
prompt spelled out the format; both pulled it from the skill.

## Why this satisfies "done when"

- The skill is thin (one page) and versioned in the repo, not restated per prompt.
- `changelog-state.md` tracked `last PR processed: #421` — a restart the next day picked
  up at #422, not #412.
- Nothing landed in the real `CHANGELOG.md` — drafts only, per the L1 constraint.

## Common wrong turns

- Writing the skill as a wall of edge cases up front (what about co-authored PRs? what
  about squash-merged PRs with 12 commits?) — start with the three real examples you have
  and let the skill grow only when a real case actually breaks it.
- Letting "draft" quietly become "commit directly to CHANGELOG.md" once it's working well
  — that's an L1→L2 promotion decision, not a default, per
  [safety.md](../../10-operating/safety.md).

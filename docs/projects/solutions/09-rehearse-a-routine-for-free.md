# Solution · Drill 9 — Rehearse a Routine for Free

> Reference solution. Read [the drill](../09-rehearse-a-routine-for-free.md) first.

## Worked example

Repo: a real personal project. Routine created with the full form filled in (see
[A2](../../appendix/routines.md#a2--the-creation-form-field-by-field) for the field list):

- **Repo:** the target project, read-only connector scope.
- **Trigger:** schedule, every 20 minutes (fast cadence, for testing).
- **Prompt:** the dry-run instruction from the drill, verbatim.
- **Permissions:** read-only grant — no write scope on the connector at all, so even a
  prompt mistake can't produce a real write.

**Three fired beats, `loop-run-log.md`:**

```text
{"run_id":"...T14:00Z","pattern":"routine-dryrun","outcome":"dry-run: would read src/ for new TODOs, would append 2 items to backlog.md — did not write"}
{"run_id":"...T14:20Z","pattern":"routine-dryrun","outcome":"dry-run: nothing new since last beat — would write nothing"}
{"run_id":"...T14:40Z","pattern":"routine-dryrun","outcome":"dry-run: would flag one stale TODO older than 30 days — did not write"}
```

`git status` after all three beats: clean — no file changes, confirmed independently of
the loop's own claim.

## Why this satisfies "done when"

- The permission grant, not the prompt, is what guarantees zero writes — tested by
  confirming `git status` stays clean even though the prompt only *asks* for a dry run.
- Three unattended, real-schedule beats fired without anyone at the keyboard.

## Common wrong turns

- Granting write scope "just in case" and relying on the prompt to hold back — defeats
  the entire point; the first Routine you ever run should have the narrowest possible
  scope, expanded only after a proven history.

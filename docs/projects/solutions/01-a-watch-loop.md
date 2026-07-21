# Solution · Project 1 — A Watch Loop

> Reference solution. Read [the project](../01-a-watch-loop.md) first and build your own
> before comparing — the value is in the diff between your design and this one.

## Worked example

Target repo: `openai/openai-python` (real, active, public — substitute any repo you don't
maintain). Cadence: 15 minutes, capped at 20 runs/day.

**`watch-state.md` (spine), after 3 beats:**

```markdown
# Spine: watch-loop (Project 1)

**Runs used:** 3 / 20

| Category | Last-seen ID | Last checked |
| --- | --- | --- |
| issues (label:bug) | #2184 | 2026-07-21T09:45Z |
| PRs → main | #2190 | 2026-07-21T09:45Z |
| release tags | v1.54.0 | 2026-07-21T09:30Z |
```

**Prompt used (Claude Code):**

```claude
> /loop 15m Check openai/openai-python for anything new since watch-state.md's
  last-seen IDs: issues labeled bug, PRs against main, release tags. Update
  watch-state.md. Append exactly one line to loop-run-log.md whether or not
  anything was found. Never open, comment on, or close anything. Stop after 20
  runs today.
```

**Three run-log lines it produced:**

```text
{"run_id":"2026-07-21T09:15:00Z","pattern":"watch-loop","duration_s":40,"items_found":1,"actions_taken":0,"escalations":0,"tokens_estimate":3000,"outcome":"new PR #2190 opened against main"}
{"run_id":"2026-07-21T09:30:00Z","pattern":"watch-loop","duration_s":35,"items_found":1,"actions_taken":0,"escalations":0,"tokens_estimate":2800,"outcome":"new release v1.54.0"}
{"run_id":"2026-07-21T09:45:00Z","pattern":"watch-loop","duration_s":30,"items_found":0,"actions_taken":0,"escalations":0,"tokens_estimate":2500,"outcome":"nothing new — quiet beat, logged anyway"}
```

## Why this satisfies "done when"

- The spine was committed *before* the first `/loop` invocation — not created by beat 1.
- The third beat found nothing and still logged a line — "silence is the loudest signal"
  ([observability.md](../../10-operating/observability.md)) applies to the loop's own
  heartbeat, not just what it's watching.
- `gh issue list` / `gh pr list` / `gh release list` are read-only subcommands; the harness
  permission grant for this loop excluded every `gh issue comment`, `gh pr review`, etc.
  outright, so the "never comment" rule didn't depend on the model choosing to obey it.

## Common wrong turns (and why they fail the done-when)

- Storing "last checked" timestamp only, no per-category ID → re-reports everything created
  in a window if the loop restarts mid-cadence. IDs are the correct key, not time.
- Skipping the log line on a quiet beat → makes a genuinely stalled loop indistinguishable
  from one that's just watching a quiet repo.

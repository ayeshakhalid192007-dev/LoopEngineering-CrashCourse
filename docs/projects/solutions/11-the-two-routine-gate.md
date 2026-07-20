# Solution · Drill 11 — The Two-Routine Gate

> Reference solution. Read [the drill](../11-the-two-routine-gate.md) first.

## Worked example

**Routine A (producer), every 10 minutes, `producer-state.md` after beat 2:**

```markdown
status: draft-ready
draft: draft.md (written 2026-07-21T15:20Z)
```

**Routine B (gate-reader), every 10 minutes offset by 5 — beat log across a full cycle:**

```text
{"run_id":"...T15:05Z","pattern":"gate-reader","outcome":"status=draft-not-ready, waiting — no action"}
{"run_id":"...T15:25Z","pattern":"gate-reader","outcome":"status=draft-ready, published draft.md -> published.md, status set to consumed"}
{"run_id":"...T15:35Z","pattern":"gate-reader","outcome":"status=consumed, waiting for next draft — no action"}
```

**Routine A's next beat (T15:30Z)** reads `producer-state.md`, sees `status: consumed`,
and starts a fresh draft cycle rather than re-flagging the old one as ready — confirming
the gate resets correctly on both sides.

**Ownership held in practice:** across the whole run, `git log --follow draft.md` shows
only Routine A's commits; `git log --follow published.md` shows only Routine B's. Neither
ever appears in the other's file history.

## Why this satisfies "done when"

- Routine B's first beat correctly logged "waiting" — the gate genuinely gated, it wasn't
  just always-ready.
- The consume-then-reset cycle is visible across three real beats, with A correctly
  starting fresh only after seeing `consumed`.
- File ownership held for real, not just as a design intention — verified via git history,
  not assumed from the loop.md.

## Common wrong turns

- Having Routine A poll for whether Routine B "took" the draft, instead of just writing
  its own state and moving on — that reintroduces a call-like dependency between the two
  loops, which is exactly what the coordination contract forbids. A writes and forgets; B
  reads and decides. Neither waits on the other synchronously.

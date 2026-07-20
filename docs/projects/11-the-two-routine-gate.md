# Drill 11 · The Two-Routine Gate

> **⚠️ Throwaway repo. Set a limit first.** Two unattended Routines running against the
> same repo is exactly the multi-loop scenario this drill is teaching you to do safely —
> cap both independently before either fires once.

| Difficulty | Time | Concepts | Loop type |
| --- | --- | --- | --- |
| Drill (T3/T4) | 30–45 min | multi-loop coordination, gating on durable state, one-owner-per-path | **two Routines, sequenced through a spine, never a call** |

## The scenario

This course's own quiz-writer only started a part once the checker's spine read PASS —
never by one loop calling the other. This drill makes you build that pattern in miniature
with two real, independently-scheduled Routines: a **producer** that drafts something, and
a **gate-reader** that only acts once the producer's spine says the draft is ready — with
neither loop ever invoking the other directly.

## What you'll build

- **Routine A (producer):** schedule, every 10 minutes. Drafts a short summary of recent
  activity in a real repo (reuse Project 3's brief logic, or Project 1's watch data) into
  `draft.md`, and writes `producer-state.md` with a `status: draft-ready` field once it's
  confident the draft is complete for this cycle.
- **Routine B (gate-reader):** schedule, every 10 minutes, offset by 5. Reads
  `producer-state.md` **first**. If `status` is not `draft-ready`, it logs "waiting" and
  does nothing else this beat. If it is, it copies `draft.md` into `published.md`, and
  flips `producer-state.md`'s status to `consumed`.
- **One owner per path:** Routine A owns `draft.md` and `producer-state.md`'s `status`
  field it *sets*; Routine B owns `published.md` and is the only one allowed to flip
  `status` to `consumed`. Neither ever calls the other — they meet only through the file.

```claude
# Claude Code — Routine A
Draft a short activity summary into draft.md. When it's complete for this cycle,
set producer-state.md's status to "draft-ready". Log one line either way.
```

```claude
# Claude Code — Routine B, offset 5 minutes from A
Read producer-state.md. If status != "draft-ready", log "waiting" and stop — do
nothing else. If "draft-ready", copy draft.md to published.md and set status to
"consumed". Log one line either way.
```

## Done when (provable stop)

- [ ] Both Routines are real, independently scheduled, and neither one's prompt ever
      mentions or invokes the other by name.
- [ ] You can show at least one beat where Routine B correctly logged "waiting" because
      the gate wasn't open yet.
- [ ] You can show at least one beat where Routine B correctly consumed a ready draft and
      flipped the status — with Routine A's own next beat seeing `consumed` and starting a
      fresh draft rather than re-publishing the old one.
- [ ] `published.md` was never written by Routine A, and `draft.md` was never written by
      Routine B — the ownership map held for real, not just on paper.

## When it goes wrong

| Symptom | Cause | Fix |
| --- | --- | --- |
| Routine B published the same draft twice | Status wasn't flipped to `consumed` before B's beat ended | Write the state change before the beat completes, same rule as every spine in this course |
| Both Routines edited `producer-state.md` | Ownership boundary wasn't actually enforced — B wrote a field A owns | Split the file, or restrict B's write scope to `published.md` only, per [multi-loop.md](../10-operating/multi-loop.md)'s "one owner per path" |
| B fires before A ever runs once | No offset, or A's schedule hasn't produced a first draft yet | Confirm A's spine exists and has a real first entry before B's first beat is due |

---

*Sources:* the coordination contract — one owner per path, separate spines, gating on
durable state instead of calls — comes from [multi-loop.md](../10-operating/multi-loop.md),
the reference repo's own multi-loop pattern
([S7](https://github.com/cobusgreyling/loop-engineering), MIT), and Sydney Runkle's *The
Art of Loop Engineering*
([S6](https://www.langchain.com/blog/the-art-of-loop-engineering)). Full attribution:
[resources/sources.md](../../resources/sources.md).

# Project 1 · A Watch Loop

> **⚠️ Throwaway repo. Set a limit first.** Clone a disposable copy of whatever you point
> this at — never a production remote — and write the run cap into the prompt before
> beat one, per this course's own [minimum-safe checklist](../09-methods/loop-design-checklist.md).

| Difficulty | Time | Concepts | Loop type |
| --- | --- | --- | --- |
| Easy (T1 · entry lab) | 30–45 min | heartbeat (schedule), spine, report-only | **schedule loop, L1 report-only** |

## The scenario

Pick a real, moderately active open-source repository you don't maintain — something with
real traffic, like a mid-sized web framework or CLI tool with dozens of weekly commits
(the reference-repo class of project — `cobusgreyling/loop-engineering` itself works
fine, or any repo with 50+ stars and a live issue tracker). You want to know, every 15
minutes, whether anything changed that you'd care about — a new issue with the `bug`
label, a PR opened against `main`, or a new release tag — without opening the browser
yourself.

This is the shape every later project builds on: a **heartbeat** that fires on its own, a
**spine** that remembers what it already saw, and nothing else. No writing, no fixing, no
opinions — just a faithful watcher.

## What you'll build

A schedule loop (Step 4/6 territory) with:

- **Heartbeat:** every 15 minutes, capped at 20 runs/day.
- **Body:** read the target repo's issues/PRs/tags via the SCM CLI (`gh issue list`,
  `gh pr list`, `gh release list`) — **read-only**, no `gh` write subcommands anywhere in
  the body.
- **Spine:** `watch-state.md` — the ID of the last issue/PR/release seen per category, so
  a restart doesn't re-report old news.
- **Stop:** none — this is a schedule loop; it runs until you cancel it. The provable
  target for *this project* is "one clean report emitted for at least 3 consecutive beats
  with no duplicate items and no missed new item you can independently verify."

```claude
# Claude Code
> /loop 15m Check <owner>/<repo> for anything new since watch-state.md's last-seen
  IDs: issues labeled bug, PRs against main, release tags. Update watch-state.md.
  Append exactly one line to loop-run-log.md whether or not anything was found.
  Never open, comment on, or close anything — report only. Stop after 20 runs today.
```

```opencode
# OpenCode
for i in $(seq 1 20); do
  opencode run "Check <owner>/<repo> for anything new since watch-state.md's last-seen
    IDs (issues:bug, PRs:main, releases). Update watch-state.md. Append one line to
    loop-run-log.md. Read-only — never open/comment/close."
  sleep 900
done
```

## Done when (provable stop for this exercise)

- [ ] `watch-state.md` exists and is committed before beat 1.
- [ ] The loop has completed at least 3 beats on the 15-minute cadence.
- [ ] `loop-run-log.md` has exactly one line per beat — including beats where nothing
      changed (a "nothing new" beat is not a skipped beat).
- [ ] You can point at one real item (an issue, PR, or tag) the loop caught, and show the
      spine line that recorded it.
- [ ] Zero writes landed anywhere outside `watch-state.md` and the log.

## Going deeper

Once this is boring, this exact shape *is* `pr-babysitter` and `daily-triage` from the
starter library — go read [`starters/daily-triage/`](../../starters/daily-triage/README.md)
and notice it's the same six parts, just with a report file added. That's the whole
trick of Track T2: you're not learning a new pattern per project, you're adding one part
at a time to a shape you already trust.

## When it goes wrong

| Symptom | Cause | Fix |
| --- | --- | --- |
| Same issue reported every beat | Spine never updated, or updated to the wrong field | Write the last-seen ID back to `watch-state.md` **before** the beat ends, not after |
| Loop goes quiet with no error | Schedule cap or token cap silently hit | Check the budget cap first thing next beat, per [Step 4](../04-part-2-heartbeat/04-in-session-loops.md) |
| A "read-only" run left a comment | Body wasn't actually read-only — `gh` write scopes weren't denied | Move the guarantee into permissions/deny-list, not the prompt ([safety.md](../10-operating/safety.md)) |

---

*Sources:* project shape and the "throwaway repo, set a limit first" convention come from
Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)), §18;
schedule-loop mechanics from *Scheduled Tasks: The Loop Skill & Cron Tools*
([S4](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)). Full
attribution: [resources/sources.md](../../resources/sources.md).

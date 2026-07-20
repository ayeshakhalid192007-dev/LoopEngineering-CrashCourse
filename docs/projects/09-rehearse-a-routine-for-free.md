# Drill 9 · Rehearse a Routine for Free

> **⚠️ Throwaway repo. Set a limit first.** Routines can run unattended overnight — that's
> the whole point of this drill, and the whole reason it stays a dry run until you've
> watched it once.

| Difficulty | Time | Concepts | Loop type |
| --- | --- | --- | --- |
| Drill (T3) | 20–30 min | Routines, the creation form, dry-run vs. live | **unattended schedule (Routine), dry-run only** |

## The scenario

Routines are the unattended, cloud-run cousin of `/loop` — they fire on their own schedule
whether or not you're at the keyboard, which makes the first one you ever create the
highest-stakes button you'll press in this whole course. This drill lets you fill in every
field of the creation form, on a real repository, without ever letting the routine's body
actually execute against anything live.

## What you'll do

Using a real repo you control, fill out a Routine's creation form completely (see
[A2 in the Routines appendix](../appendix/routines.md#a2--the-creation-form-field-by-field)
for every field), but set its **prompt** to a dry-run instruction: describe, in prose,
exactly what it *would* do this beat — which files it would read, what it would write,
what it would skip — without writing anything. Let it fire on its real schedule for at
least 3 beats.

```claude
# Claude Code — Routine prompt, deliberately a dry run
Describe what this beat WOULD do: which files you'd read, what you'd compute, what
you'd write to <target file>, and why. Do not write anything. Log this description
as one line to loop-run-log.md tagged "dry-run".
```

```opencode
# OpenCode — cron-triggered dry run
opencode run "DRY RUN ONLY. Describe the beat's intended reads/writes without
  performing them. Append one 'dry-run' line to loop-run-log.md." # via cron
```

## Done when (provable stop)

- [ ] The creation form is filled in completely — repo, connectors, trigger, prompt — and
      you can name what every field does, not just what you typed into it.
- [ ] The Routine fired on its own schedule at least 3 times, unattended.
- [ ] Every fired beat produced a dry-run description and zero real writes — verified by
      `git status` showing no changes each time.
- [ ] You've read [A5 — reading the runs](../appendix/routines.md#a5--reading-the-runs-green--done)
      and can point to where each run's evidence lives.

## When it goes wrong

| Symptom | Cause | Fix |
| --- | --- | --- |
| The dry run actually wrote a file | Prompt described "don't write" but permissions still allowed it | Move the guarantee to the harness (read-only permission grant for this Routine), not just prose |
| Routine never fired | Trigger misconfigured, or daily cap already exhausted by another Routine | Check A3 (the three triggers) and the account-wide daily cap together |
| You can't tell if a run happened | No log line, no visible evidence | A dry run is still a beat — it still owes exactly one log line |

---

*Sources:* Routines and the creation form come from *Scheduled Tasks: The Loop Skill &
Cron Tools*
([S4](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)) and
Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)), §19.
Full attribution: [resources/sources.md](../../resources/sources.md).

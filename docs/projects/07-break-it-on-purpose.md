# Project 7 · Break It on Purpose

> **⚠️ Throwaway repo. Set a limit first.** This project deliberately induces failure
> modes — do it in a fully disposable sandbox with network/write access you can revoke
> instantly, and keep a hard wall-clock cap running the whole time, not just a run cap.

| Difficulty | Time | Concepts | Loop type |
| --- | --- | --- | --- |
| Hard (T3) | 60–90 min | doom loops, no-progress detection, recovery playbook | **conditional loop, deliberately mis-specified** |

## The scenario

Every failure mode in [failure-modes.md](../10-operating/failure-modes.md) and
[anti-patterns.md](../10-operating/anti-patterns.md) reads clean on the page. This project
makes you feel one happen, on purpose, on a real (but disposable) codebase — because a
guardrail you've only read about is a guardrail you'll trust too much the first time it
actually needs to fire. Take a real repo with a nontrivial build (a monorepo with a
build step that can legitimately fail for several different reasons) and build a loop
with **one part missing**, chosen from the list below. Watch it fail the way the missing
part predicts. Then add the part back and watch the same loop recover.

## What you'll build

Pick (or your instructor assigns) one deliberately broken loop:

| Missing part | What you'll see | The part that fixes it |
| --- | --- | --- |
| No stopping condition, just a fixed prompt on repeat | A **doom loop** — same "fix" applied forever, no exit | A provable stop checked every beat, not a vibe |
| Stop condition checked by the model's own opinion | Loop declares success while the build is still red | A separate checker reading real command output |
| No run/token limit | Runs until you kill it by hand, cost climbing | A hard cap, checked against the *current* budget every beat |
| No no-progress detector | Retries the identical failing edit 10+ times | 3-consecutive-unchanged-beats → stop and escalate |
| Body scope too wide | "Fix the lint error" rewrites unrelated files | A path allowlist the harness enforces, not the prompt |

Build the broken version first — in a worktree, capped at a *wall-clock* 10 minutes no
matter what — and let it run. Capture what you see in the run log. Then add the missing
part back and re-run the identical task.

```claude
# Claude Code — deliberately missing a stop, capped by wall clock only for safety
> /loop Fix the build. (Intentionally no other instructions — this is the broken
  version.) Log one line every beat. HARD STOP after 10 minutes wall-clock regardless
  of outcome — this cap is a safety net, not the lesson.
```

```opencode
# OpenCode — the same missing-stop scenario, capped defensively
timeout 600 bash -c '
  while true; do
    opencode run "Fix the build."
  done
'
```

## Done when (provable stop)

- [ ] You have a run-log excerpt showing the *broken* loop exhibiting exactly the failure
      its missing part predicts (a doom loop, a false-green, a runaway cost, etc.).
- [ ] You have a second run-log excerpt showing the *fixed* loop (same task, missing part
      restored) reaching a genuine stop.
- [ ] A one-paragraph note names which part was missing, what you observed, and which line
      in [failure-modes.md](../10-operating/failure-modes.md) predicted it.
- [ ] The broken run never exceeded its wall-clock safety cap — the lesson is contained,
      not open-ended.

## Going deeper

This project is the practice half of
[the recovery playbook](../10-operating/recovery-playbook.md) — read it right after, not
before, so the steps land against something you just watched happen rather than abstract
advice. [infinite-loops.md](../10-operating/infinite-loops.md) has the doom-loop and
ping-pong scenarios this project draws its "missing parts" table from.

## When it goes wrong

| Symptom | Cause | Fix |
| --- | --- | --- |
| The broken loop did real damage before you caught it | The wall-clock safety cap wasn't actually enforced | Test the kill switch *before* the broken run, per [safety.md](../10-operating/safety.md) — "a kill switch never pulled is a hypothesis" |
| Nothing interesting happened — the loop just worked | The missing part wasn't actually load-bearing for this task | Pick a task where that part matters (e.g. a genuinely ambiguous fix for the no-checker case) |
| You can't tell if it's a doom loop or slow real progress | No per-beat diff comparison | Log a content hash of the diff each beat; three identical hashes in a row is the doom-loop signal |

---

*Sources:* the failure catalog and recovery steps come from
[failure-modes.md](../10-operating/failure-modes.md),
[anti-patterns.md](../10-operating/anti-patterns.md), and
[the recovery playbook](../10-operating/recovery-playbook.md), drawing on Panaversity's
*Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)) and Addy
Osmani's *Loop Engineering* ([S5](https://addyosmani.com/blog/loop-engineering/)). Full
attribution: [resources/sources.md](../../resources/sources.md).

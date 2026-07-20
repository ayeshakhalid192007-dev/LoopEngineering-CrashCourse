# Project 8 · Your Own Daily Loop (Capstone)

> **⚠️ Throwaway repo. Set a limit first.** This is the graduation project — run it against
> a real repo of yours, but still behind a worktree/branch boundary until it's earned an
> L2 history, and cap every guardrail explicitly before beat one.

| Difficulty | Time | Concepts | Loop type |
| --- | --- | --- | --- |
| Capstone (T3/T4) | 3–5 hours | all six parts, the full A–F method, graded by [capstone-rubric.md](../assessments/capstone-rubric.md) | **any — your choice, fully justified** |

## The scenario

You've built five focused labs, each exercising one or two of the six parts. The capstone
asks for the whole thing, on a real job you actually have: pick a genuine recurring task
from your own work — a real codebase (yours, your team's, or a well-scoped OSS project you
contribute to) with a real, provable pain point. Some examples that have made strong
capstones: a nightly dependency-freshness report for a service with 40+ dependencies; a
"first-failing-test, fixed and re-verified" loop for a codebase with an intermittently red
suite; a weekly stakeholder brief drafted from a real project's merged PRs and closed
issues. The job matters less than this: it must be **yours**, provable, and something
you'd actually want running tomorrow.

## What you'll build

Every one of the six parts, deliberately chosen — not defaulted:

1. **Heartbeat** — schedule, conditional, or event; justify the choice against the job.
2. **Body** — the exact paths/tools it may touch; everything else read-only, enforced by
   the harness, not the prompt.
3. **Spine** — a `state.md` written and committed *before* beat 1.
4. **Stopping condition** — a spec, not an adjective; checkable by a script or a genuinely
   separate reader.
5. **Checker** — never the maker; script, read-only agent, or a documented human step.
6. **Human gate** — placed where judgment or an irreversible action concentrates.

Run the [loop design checklist](../09-methods/loop-design-checklist.md) against your
design *before* beat 1 — every box that resists a one-line answer is a design flaw to fix,
not a detail to skip. Start at L1 report-only; earn any promotion the way
[safety.md](../10-operating/safety.md) describes — a proven history, a written decision.

```claude
# Claude Code — your own loop, shaped by your own checklist answers
> /loop <your heartbeat> <your body, scoped to your paths>. Stop when <your provable
  condition>. Checker: <your separate checker>. Log one line per beat to
  loop-run-log.md. Update <your-loop>-state.md every beat.
```

```opencode
# OpenCode — same six parts, this tool's primitives
opencode run "<your body>" # wired to your chosen heartbeat mechanism
# checker as a separate `opencode run` invocation, or a plain script
```

## Done when (provable stop)

- [ ] The filled-in [loop design checklist](../09-methods/loop-design-checklist.md) is
      attached, every box answered (not left blank).
- [ ] `<your-loop>-state.md` exists, was committed before beat 1, and has a real,
      non-fabricated run history.
- [ ] The loop ran at least 3 real beats at L1 report-only, on the real job, and you can
      point at genuine output from each.
- [ ] The stopping condition, the limit, and the no-progress rule are all demonstrated —
      not just described.
- [ ] Graded against [capstone-rubric.md](../assessments/capstone-rubric.md) — this
      project is not self-graded.

## Going deeper

This capstone is Step 13 done for real, on your own problem, instead of the shared
`daily-triage` example — go re-read
[Step 13](../07-part-5-complete-loop/13-build-the-loop-twice.md) once more before you
start, this time treating every sentence as a requirement for *your* loop rather than a
worked example. When it's done, the
[loop-ready-certification](../assessments/loop-ready-certification.md) is the formal
close-out.

## When it goes wrong

| Symptom | Cause | Fix |
| --- | --- | --- |
| Can't answer "what's the provable stop" in one sentence | The job was picked for novelty, not for a real, checkable pain point | Narrow the job until the stop is a fact, not a feeling — see [Step 5](../04-part-2-heartbeat/05-conditional-run-until-done.md) |
| Checklist has three blank boxes | Design wasn't finished, just started | Per the checklist's own header: a box that resists a one-line answer **is** the finding — don't skip it |
| It "basically worked" after one run | One clean run is not a proving period | L1 needs a real, watched history before any promotion — one run proves nothing per [safety.md](../10-operating/safety.md) |

---

*Sources:* the six-part shape and the "build it twice" capstone structure come from
Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)), Step 13
and §18; the A–F method from
[make-your-own-loop.md](../09-methods/make-your-own-loop.md). Full attribution:
[resources/sources.md](../../resources/sources.md).

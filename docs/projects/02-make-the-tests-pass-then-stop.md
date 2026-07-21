# Project 2 · Make the Tests Pass, Then Stop

> **⚠️ Throwaway repo. Set a limit first.** Work in a disposable clone or a
> [worktree](../05-part-3-the-body/08-worktrees.md) of a real codebase, never the repo you
> ship from — and cap the fix attempts before beat one.

| Difficulty | Time | Concepts | Loop type |
| --- | --- | --- | --- |
| Easy–Medium (T2) | 45–60 min | conditional heartbeat, provable stop, real checker | **conditional run-until-done loop** |

## The scenario

Take a real, mid-sized codebase with a red suite you can reproduce on demand — a Python
service with a `pytest` suite of a few hundred tests (a FastAPI backend, say, with routers,
a database layer, and integration tests), or a TypeScript API with a Jest suite of similar
size. Introduce (or find) one genuinely failing test — a broken assertion, a stale fixture,
an off-by-one in a date-range filter — and point a loop at it with a single instruction:
fix the first failing test, run the full suite to confirm, and stop the moment it's green.

This is the canonical **conditional / run-until-done** loop from
[Step 5](../04-part-2-heartbeat/05-conditional-run-until-done.md): no fixed schedule, no
fixed run count — it beats until its stopping condition is *true*, checked by running the
actual suite, never by the model's say-so.

## What you'll build

- **Heartbeat:** conditional, self-paced — one beat per fix attempt.
- **Body:** may edit only the file(s) containing the failing test's implementation and its
  direct fixture — no repo-wide refactors, no touching unrelated tests.
- **Spine:** `fix-state.md` — which test is targeted, attempt count, last error seen.
- **Stopping condition (the checker):** `pytest` (or `npm test`) exits `0` — a script, not
  the model reporting "should be fixed now." This is the maker–checker split from
  [Step 11](../05-part-3-the-body/11-maker-checker.md) in miniature: the loop that edits
  code never gets to also grade it.
- **Limit:** max 5 fix attempts, then escalate to a human rather than loop forever — the
  doom-loop bound from [infinite-loops.md](../10-operating/infinite-loops.md).

```claude
# Claude Code
> /loop Run the test suite. If it's green, stop — success. Otherwise, fix ONLY the
  FIRST failing test (no unrelated changes). Re-run the full suite as the checker —
  never mark done from your own read of the diff. Log one line to loop-run-log.md.
  Update fix-state.md with the attempt count. Stop at 5 attempts and escalate.
```

```opencode
# OpenCode
for i in $(seq 1 5); do
  opencode run "Run pytest. If green, stop. Else fix ONLY the first failing test
    (no unrelated edits). Re-run pytest as the checker. Log one line to
    loop-run-log.md and update fix-state.md's attempt count."
  if pytest -q > /dev/null 2>&1; then break; fi
done
```

## Done when (provable stop)

- [ ] The full suite exits `0` on a run you (or the loop) triggered fresh — not the
      model's summary of the diff.
- [ ] `fix-state.md` shows exactly one test targeted and a truthful attempt count.
- [ ] The diff touches only the failing test's implementation/fixture — nothing else.
- [ ] If 5 attempts passed without green, the loop stopped and logged an escalation
      instead of continuing indefinitely.

## Going deeper

Compare your loop's shape against `starters/test-stabilizer-loop/` and
`starters/test-coverage-loop/` in the starter library — both are this same conditional
shape aimed at a different target (flaky tests, missing coverage). Once you've built one
real-checker loop, you can read those kits and recognize every part instead of learning
them cold.

## When it goes wrong

| Symptom | Cause | Fix |
| --- | --- | --- |
| Loop declares success but the suite is still red | Checker was the model's opinion, not the suite's exit code | Gate the stop on the actual test command's exit status |
| Fix attempt after fix attempt, no progress | No-progress detector missing | Add the third stop: 3 consecutive attempts with an unchanged failure = stop and escalate |
| The "fix" edited five unrelated files | No path/scope guard on the body | Scope the body to the failing file(s) only; treat a wider diff as a hard fail |

---

*Sources:* the conditional/run-until-done shape and its three stops come from
Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)) and
*Spec-Driven Development*
([S3](https://agentfactory.panaversity.org/docs/spec-driven-development-crash-course));
the maker–checker split from Sydney Runkle's *The Art of Loop Engineering*
([S6](https://www.langchain.com/blog/the-art-of-loop-engineering)). Full attribution:
[resources/sources.md](../../resources/sources.md).

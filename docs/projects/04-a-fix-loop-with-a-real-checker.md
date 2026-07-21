# Project 4 · A Fix Loop with a Real Checker

> **⚠️ Throwaway repo. Set a limit first.** Do this entirely inside a
> [worktree](../05-part-3-the-body/08-worktrees.md) — the whole point is that a bad fix
> attempt can't touch your working tree — and cap attempts before beat one.

| Difficulty | Time | Concepts | Loop type |
| --- | --- | --- | --- |
| Medium (T2/T3) | 60–90 min | worktree isolation, maker–checker, escalation | **conditional loop, isolated worktree, separate checker** |

## The scenario

You maintain a real internal library — say, a shared TypeScript utilities package consumed
by three other services, with a CI pipeline that runs lint, typecheck, and a unit suite on
every push. A dependency bump broke type inference in one exported function; CI is red.
Project 2 taught you the conditional shape with an inline checker; this project adds the
two things that make a fix loop trustworthy at scale: the maker never touches your real
working tree, and the checker is a **separate process** from the one making the edit —
never the same model call grading its own diff.

## What you'll build

- **Heartbeat:** conditional, one beat per attempt.
- **Isolation:** every attempt runs in a fresh `git worktree add ../fix-attempt-N`, never
  the main checkout — a bad attempt is deleted, not reverted.
- **Body:** edit only the broken export and its type declarations.
- **Checker:** a **separate** invocation — a second agent session (or a plain CI script)
  that only reads the diff and the CI output, never edits anything, and returns pass/fail.
- **Spine:** `fix-state.md` — attempt number, worktree path, checker verdict per attempt.
- **Human gate:** merging the worktree's branch back is a manual step — the loop stops
  short of that, every time.

```claude
# Claude Code
> /loop In a fresh worktree (../fix-attempt-N), fix the type error CI flagged in
  src/format.ts. Run lint+typecheck+tests locally. Then, in a SEPARATE session,
  have the checker agent read only the diff and the CI log and verdict pass/fail —
  it may not edit anything. Record the verdict in fix-state.md. On pass, stop and
  report the worktree/branch for human review. On fail, delete the worktree and
  retry (max 4 attempts), then escalate.
```

```opencode
# OpenCode
git worktree add ../fix-attempt-$i fix/type-error-$i
opencode run --cwd ../fix-attempt-$i "Fix the CI-flagged type error in src/format.ts only."
opencode run "You are the checker. Read the diff in ../fix-attempt-$i and the CI log.
  Do not edit anything. Verdict PASS or FAIL with a one-line reason." >> fix-state.md
```

## Done when (provable stop)

- [ ] Every attempt ran in its own worktree; the main checkout was never touched by a fix.
- [ ] The checker's verdict came from a genuinely separate invocation that made zero edits.
- [ ] `fix-state.md` shows a truthful attempt count and each attempt's verdict.
- [ ] On a PASS, the loop stopped and handed a branch name to a human — it did not merge.
- [ ] If 4 attempts failed, the loop escalated instead of trying a 5th.

## Going deeper

This is `starters/ticket-to-pr-ready/` and `starters/loop-harness-verification/` combined
— a maker producing a patch, a genuinely independent verifier checking it, worktree
isolation throughout. Read both kits once this project is done; the "genuinely
independent" requirement (not just a different prompt in the same session) is the exact
lesson `loop-harness-verification` was built to teach.

## When it goes wrong

| Symptom | Cause | Fix |
| --- | --- | --- |
| The "checker" always agrees with the maker | Same session/context grading its own work | Force a fresh session with only the diff + CI log as input — no access to the maker's reasoning |
| A failed attempt left files behind in the main tree | Fix ran outside the worktree | Verify `git worktree list` shows the attempt path before any edit; hard-fail otherwise |
| Loop merges on its own after a PASS | Missing human gate | The stop *is* "hand off for review" — merging is explicitly out of the body's scope |

---

*Sources:* worktree isolation from [Step 8](../05-part-3-the-body/08-worktrees.md)
(Panaversity, [S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course));
maker–checker independence from [Step 11](../05-part-3-the-body/11-maker-checker.md) and
Sydney Runkle's *The Art of Loop Engineering*
([S6](https://www.langchain.com/blog/the-art-of-loop-engineering)). Full attribution:
[resources/sources.md](../../resources/sources.md).

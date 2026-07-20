# Solution · Project 4 — A Fix Loop with a Real Checker

> Reference solution. Read [the project](../04-a-fix-loop-with-a-real-checker.md) first.

## Worked example

Target: an internal `@acme/shared-utils` TypeScript package consumed by three services. A
`zod`-schema bump broke type inference on `parseRequestBody<T>`, and CI (lint, typecheck,
unit) is red across all consumers.

**Attempt 1:**

```text
$ git worktree add ../fix-attempt-1 fix/type-error-1
$ cd ../fix-attempt-1 && opencode run "Fix the type error CI flagged in src/parse.ts only."
# edits src/parse.ts's generic constraint
$ npm run lint && npm run typecheck && npm test
# typecheck passes; ONE unrelated unit test now fails — a snapshot depending on the old inferred type
```

**Checker verdict (separate session, diff + CI log only, no edit access):**

```text
FAIL — typecheck now passes, but tests/parse.snapshot.test.ts regressed. The fix
narrowed the generic in a way that changed a public return type. Recommend
attempt 2 constrain only the internal helper, not the exported signature.
```

**`fix-state.md`:**

```markdown
| Attempt | Worktree | Verdict |
| --- | --- | --- |
| 1 | ../fix-attempt-1 | FAIL — snapshot regression from a public-signature change |
| 2 | ../fix-attempt-2 | PASS — lint+typecheck+tests all green, no public API change |
```

**Attempt 2** scoped the fix to the internal helper only, per the checker's note; CI went
green with no other test movement. The loop stopped and reported
`fix/type-error-2` for human review — it did not merge.

## Why this satisfies "done when"

- Attempt 1's worktree is deletable garbage — the main checkout, and the other two
  worktrees, never saw its edits.
- The checker session had **no access to attempt 1's reasoning**, only the diff and CI
  output — which is exactly why it caught a public-API side effect the maker's own
  "typecheck passes" framing missed.
- The loop stopped at a PASS and named a branch — merging stayed a human's call.

## Common wrong turns

- Running the "checker" as a follow-up prompt in the *same* session as the fix — it will
  tend to agree with itself, because it still has the maker's framing in context. Start a
  fresh session with only the diff and CI log as input.
- Auto-merging on PASS — the project's own done-when is explicit that the human gate is
  the branch hand-off, not the merge.

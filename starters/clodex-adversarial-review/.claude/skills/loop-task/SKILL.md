---
name: clodex-adversarial-review
description: Runs an adversarial review cycle against a PR (Claude
  implements/fixes, Codex or a subagent stand-in reviews), up to 5
  iterations. Read-only on the real PR — drafts fixes, never pushes them.
---

# clodex-adversarial-review procedure

The prompt carries intent; this skill carries the procedure — keep it a checklist,
not an essay. Adapted from Forward Future Loop Library #9 (Lukas Kucinski) to this
library's L1-first, report-only shape.

1. **Read** — the PR diff and `clodex-adversarial-review-state.md`'s
   iteration history for this PR.
2. **Review** — run an adversarial review against the diff: the real
   `codex` CLI if available, otherwise invoke the `loop-verifier` subagent
   as a genuinely separate reviewer (never the same pass that wrote the
   code).
3. **Fix findings above threshold** — for each finding at or above the
   severity threshold (medium by default): in a throwaway worktree, draft a
   fix.
4. **Re-review** — repeat steps 2–3 until the reviewer approves, only
   accepted findings remain, no progress for 2 consecutive iterations, or 5
   iterations are reached.
5. **Report honestly** — write `clodex-review-report.md`: the PR, checks,
   verdict, and remaining findings. **Never describe an errored or
   exhausted run as approved** — an iteration-cap exit with open findings
   is exhausted, say so plainly.
6. **Record** — update `clodex-adversarial-review-state.md`'s iteration
   count and findings history (resumable), append one line to
   `loop-run-log.md`, commit both. Discard the throwaway worktree.
7. **Take NO other action** — never push a commit to the real PR branch.
   This loop is L1 report-only until a human promotes it.

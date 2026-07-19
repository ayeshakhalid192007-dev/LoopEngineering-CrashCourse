# Spine: `template-checker` (Day 2)

> **Owned by `template-checker`. No other loop may write this file.**
> Definition: [`loop.md`](loop.md) · Rulebook: [`LOOP.md`](../../../LOOP.md)

**Status:** ✅ stopped on **success** — pass-3 sweep complete, 13/13 PASS, 0 open FAILs
**Last beat:** 2026-07-19 (beat 2 — pass-3 sweep: banners + starter-command file)
**Runs used:** 2 / 12 · **Tokens used:** ≈33k / 150k

> Verdicts live HERE, in a committed file — not in a throwaway `review-notes.md`.
> That is Day 1's hardest-won lesson (its checker's findings are lost forever).

## Verdicts (PASS / FAIL per page)

Beat 1 (2026-07-17) — full sweep, all 36 step-writer items, mechanical rubric:

| Scope | Result |
| ----- | ------ |
| 19 concept pages vs. the 9-row §10 rubric | **19/19 PASS** — every page carries hook, explanation, mermaid, both code tabs, going-deeper, check-yourself reveal, Try With AI, when-it-goes-wrong, glossary footer |
| 17 structural pages (6 part READMEs, 4 methods, 7 operating) | **17/17 PASS** — purpose + links + diagram/table present |
| markdownlint (CI globs) | **0 errors** after 5 findings fixed (1 in a course page: an `#291` line-start reading as a heading; 4 in fleet files) |
| mermaid compile | **40/40 Day 2 diagrams parse clean** |
| relative links | clean, EXCEPT the 11 pending `quiz.md`/`flashcards.md` links — graded **PENDING-QUIZ** per the maker's note, not FAIL; resolve when `quiz-writer` runs |

## Pass-3 verdicts (2026-07-19 — full sweep after step-writer's success stop)

| Check | Result |
| ----- | ------ |
| `grep -rn 'assets/banner' docs/` returns nothing | **PASS** — clean |
| 11 landing-page diffs show banner line only | **PASS** — every page `+0 −2` (banner line + trailing blank removed, no other line changed) |
| `starters/getting-started.md` has both sections + S7 commands verbatim | **PASS** — `## Manual setup` + `## Starter commands`; `loop-init`, `loop-cost`, `loop-audit --suggest`, `loop-audit --badge` all present; manual `cp -r` preserved; S7 attribution present |
| `starters/README.md` links the new page, `cp -r` line unchanged | **PASS** — link added, existing `cp -r starters/_template starters/<loop-name>` untouched |
| Group B prose passes the tone checklist | **PASS** — plain, professional, factual; no hype or informal wording |

**Verdict: 13/13 PASS, 0 open FAILs.** Ready for the human gate.

## Open FAILs (need `step-writer`, via the human)

*None.* (The 5 lint findings were relayed and fixed same-beat; re-run confirmed 0.)

## Escalations

*None.*

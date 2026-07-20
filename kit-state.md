# Kit State — the Day 3 core-loop checklist (20 kits)

> **Owned by `kit-stamper`. No other loop may write this file** — `audit-loop`,
> `patterns-page-loop`, and the human may read it, never edit it.
> Definition: [`loops/day3/kit-stamper/loop.md`](loops/day3/kit-stamper/loop.md)

**Status:** ⏳ running — 10 / 20 kits stamped. Group A complete; Group B underway. Halfway.
**Last beat:** 2026-07-20T01:20:00Z — stamped `test-stabilizer-loop`
**Runs used:** 10 / 25 · **Tokens used:** ≈250k / 500k

---

Every kit is stamped from [`starters/_template/`](starters/_template/) via
`scripts/new-loop-scaffold.mjs`, then filled in per the six parts (see
[the A–F method](docs/09-methods/make-your-own-loop.md)). All 20 ship at **L1
(report-only)** first — no loop earns L2 until a human has watched one real run
succeed (CLAUDE.md rule 4).

## Group A — kept as-is (the original 7)

These are unchanged from `loop-plan.md` §15A–§15D; write them from the course's own
sources (S1–S9), not from any external site.

| # | Loop | Category | Heartbeat | Cadence | Level | Cost | Built? |
| - | ---- | -------- | --------- | ------- | ----- | ---- | ------ |
| 1 | daily-triage | A · Repo maintenance | schedule | 1d–2h | L1 | Low | [x] |
| 2 | pr-babysitter | B · PR & review | schedule | 5–15m | L1 | High | [x] |
| 3 | ci-sweeper | A · Repo maintenance | schedule/event | 5–15m | L2 | Very high | [x] |
| 4 | dependency-sweeper | A · Repo maintenance | schedule | 6h–1d | L2 | Medium | [x] |
| 5 | changelog-drafter | C · Release | schedule/tag | 1d or tag | L1 | Low | [x] |
| 6 | post-merge-cleanup | A · Repo maintenance | schedule | 1d–6h | L1 | Low | [x] |
| 7 | issue-triage | D · Issue & intake | schedule | 2h–1d | L1 | Low | [x] |

## Group B — curated from Forward Future's Loop Library (13)

Source for all 13: `https://signals.forwardfuture.com/loop-library/` (repo:
`github.com/Forward-Future/loopy`). Each row's "Detail page" is fetched for the real
prompt text and the original author credit — pull both into that kit's `LOOP.md`
under a `Source:` line before checking the row off. Picked to stay
repo/engineering-focused and avoid duplicating Group A.

| # | Loop Library name | Maps to category | Heartbeat | Cadence | Level | Cost | Built? |
| - | ------------------ | ----------------- | --------- | ------- | ----- | ---- | ------ |
| 8 | The docs sweep | E · Documentation | schedule/event (push) | 1d | L1 | Medium | [x] |
| 9 | The 100% test coverage loop | J · Testing & QA | conditional | on-demand | L2 | High | [x] |
| 10 | The test stabilizer loop | J · Testing & QA | conditional | on-demand | L2 | High | [x] |
| 11 | The dependency-CVE burndown loop | F · Security | schedule | daily | L2 | Medium | [ ] |
| 12 | The sub-50 ms page-load loop | N · Performance | schedule | weekly | L2 | Medium | [ ] |
| 13 | The production error sweep | L · Monitoring & incident | schedule | 1–6h | L1 | Medium | [ ] |
| 14 | The repository cleanup loop | A · Repo maintenance | schedule | weekly | L1 | Low | [ ] |
| 15 | The ticket-to-PR-ready loop | D→B · Issue intake → PR | event (ticket) | per ticket | L2 | High | [ ] |
| 16 | The Clodex adversarial-review loop | B · PR & review | event (PR) | per PR | L1 | Medium | [ ] |
| 17 | The Loop Harness verification loop | I · Self-improvement / meta | schedule | per scheduled run | L1 | Low | [ ] |
| 18 | The Codex completion-contract loop | I · Self-improvement / meta | conditional | on-demand | L1 | Low | [ ] |
| 19 | The spec dev-review loop | D · Issue & intake | conditional | on-demand | L1 | Medium | [ ] |
| 20 | The stale-safe batch release loop | C · Release | schedule/tag | per release window | L1 | Low | [ ] |

Skipped as near-duplicates (kept out on purpose, not overlooked): "the nightly
changelog loop" (dupes `changelog-drafter`), "the dependency triage loop" (dupes
`dependency-sweeper`), "the housekeeper loop" (dupes #14), the React-Doctor pair
(tool-specific, breaks the dual-tool template).

## Run history

| # | Time (Z) | Duration | Kits stamped | Tokens | Outcome |
| - | -------- | -------- | ------------- | ------ | ------- |
| 1 | 2026-07-20T00:00:00Z | ~600s | daily-triage | ≈18k | scaffolded + filled from S1 Step 13; `loop-ready-audit.mjs` PASS |
| 2 | 2026-07-20T00:10:00Z | ~500s | pr-babysitter | ≈22k | scaffolded + filled from S1 Step 7 (PR-review / reconciliation-sweep case study) + §15B catalog entry; `loop-ready-audit.mjs` PASS |
| 3 | 2026-07-20T00:20:00Z | ~700s | ci-sweeper | ≈30k | scaffolded + filled from §15A catalog entry + infinite-loops.md scenario 1 (doom-loop bound) + the dependency-sweeper worked example (L2 design pattern); shipped at **L1**, not the catalog's L2, after catching a self-authored mistake (see Findings); `loop-ready-audit.mjs` PASS |
| 4 | 2026-07-20T00:30:00Z | ~650s | dependency-sweeper | ≈25k | scaffolded + filled directly from `docs/09-methods/worked-example-dependency-sweeper.md` — the fullest single-source design in the catalog, applying the A–F method end to end; shipped L1-first per that page's own "Week 1 L1 → Week 2 L2 permanent, L3 out of scope" verdict; `loop-ready-audit.mjs` PASS |
| 5 | 2026-07-20T00:40:00Z | ~450s | changelog-drafter | ≈20k | scaffolded + filled from `make-your-own-loop.md`'s "Worked in 90 seconds" A–F example (this exact task, adapted from its per-merge event trigger to the catalog's schedule/tag heartbeat); 10/day limit and stuck-PR escalation taken directly from that source; `loop-ready-audit.mjs` PASS |
| 6 | 2026-07-20T00:45:00Z | ~400s | post-merge-cleanup | ≈18k | scaffolded + filled from §15A catalog entry + the priority-order line naming it directly; reused the daily-triage/Step-13a scheduled-poll report mold per that page's own invitation to reuse; `loop-ready-audit.mjs` PASS |
| 7 | 2026-07-20T00:50:00Z | ~400s | issue-triage | ≈18k | scaffolded + filled from §15D catalog entry; daily-triage's five-line-report mold narrowed to issues only, per Step 13a's explicit reuse invitation; `loop-ready-audit.mjs` PASS — **Group A (the original 7) complete** |
| 8 | 2026-07-20T01:00:00Z | ~500s | docs-sweep | ≈25k | first Group B kit — fetched `https://signals.forwardfuture.com/loop-library/loops/overnight-docs-sweep/` for the real prompt + author credit (Matthew Berman); adapted the source's PR-opening default to this library's mandatory L1-first shape; `loop-ready-audit.mjs` PASS |
| 9 | 2026-07-20T01:10:00Z | ~550s | test-coverage-loop | ≈30k | fetched `.../loops/100-percent-test-coverage-loop/` for the real prompt + Matthew Berman credit; source's own stopping condition and checker used verbatim; carried the source's own coverage-vs-assertion-quality caveat into the loop-verifier rubric; `loop-ready-audit.mjs` PASS |
| 10 | 2026-07-20T01:20:00Z | ~550s | test-stabilizer-loop | ≈30k | fetched `.../loops/test-stabilizer-loop/` for the real prompt + author credit (hungtv27); source's own three-way stop (success/no-progress/approval-required) maps almost exactly onto this course's three-stops framework; "never a blind sleep or retry" carried into loop-verifier as an automatic FAIL rule; `loop-ready-audit.mjs` PASS — **halfway, 10/20** |

## Findings / escalations

- **Template gotcha (2026-07-20):** `starters/_template/loop-run-log.md`'s schema
  doc line (`"run_id": "<YYYY-MM-DDTHH:MM:SSZ>"`) trips
  `loop-ready-audit.mjs`'s `<YYYY-MM-DDTHH` placeholder marker even in a fully
  filled kit — the log's format documentation itself reads as an unfilled blank.
  Every future beat must reword that one line in the stamped copy (e.g.
  `<ISO-8601-UTC>`) alongside `LOOP.md`/`SKILL.md`/the state example, or the audit
  will FAIL a kit that's actually done. Not a `_template/` edit (read-only) — a
  per-kit fix applied during stamping.
- **Self-caught mistake (2026-07-20):** `ci-sweeper`'s catalog row lists Level
  L2, and the first draft of its kit shipped it starting at L2 (worktree
  writes + PR-opening from beat one) — a direct contradiction of this file's
  own header rule ("All 20 ship at L1 first") and CLAUDE.md rule 4. Fixed
  before commit: the catalog's Level column is the loop's **target** level
  once promoted, never its ship state. `ci-sweeper` now ships L1 report-only
  with an explicit "Promotion to L2" section in its `LOOP.md`. **Every
  remaining Group A/B row with Level=L2 (`dependency-sweeper`, and any Group B
  kit marked L2) needs the same read: build it L1-first with the L2 design
  documented as an earned promotion, not the starting shape.**
- **Consistency fix (2026-07-20):** all three stamped kits' `opencode.json.example`
  write-allowlist was missing the kit's own report filename (only the state
  file + run log were allowed) — the "write-narrow" permission config would
  have actually blocked the loop from writing the report that's its entire
  job. Fixed in `daily-triage`, `pr-babysitter`, and `ci-sweeper`. Every
  future beat must add `<loop-name>-report.md` (or whatever the kit's report
  file is called) to the `permission.edit` allowlist, not just the state file.

# Kit State — the Day 3 core-loop checklist (20 kits)

> **Owned by `kit-stamper`. No other loop may write this file** — `audit-loop`,
> `patterns-page-loop`, and the human may read it, never edit it.
> Definition: [`loops/day3/kit-stamper/loop.md`](loops/day3/kit-stamper/loop.md)

**Status:** ⏳ running — 1 / 20 kits stamped.
**Last beat:** 2026-07-20T00:00:00Z — stamped `daily-triage`
**Runs used:** 1 / 25 · **Tokens used:** ≈18k / 500k

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
| 2 | pr-babysitter | B · PR & review | schedule | 5–15m | L1 | High | [ ] |
| 3 | ci-sweeper | A · Repo maintenance | schedule/event | 5–15m | L2 | Very high | [ ] |
| 4 | dependency-sweeper | A · Repo maintenance | schedule | 6h–1d | L2 | Medium | [ ] |
| 5 | changelog-drafter | C · Release | schedule/tag | 1d or tag | L1 | Low | [ ] |
| 6 | post-merge-cleanup | A · Repo maintenance | schedule | 1d–6h | L1 | Low | [ ] |
| 7 | issue-triage | D · Issue & intake | schedule | 2h–1d | L1 | Low | [ ] |

## Group B — curated from Forward Future's Loop Library (13)

Source for all 13: `https://signals.forwardfuture.com/loop-library/` (repo:
`github.com/Forward-Future/loopy`). Each row's "Detail page" is fetched for the real
prompt text and the original author credit — pull both into that kit's `LOOP.md`
under a `Source:` line before checking the row off. Picked to stay
repo/engineering-focused and avoid duplicating Group A.

| # | Loop Library name | Maps to category | Heartbeat | Cadence | Level | Cost | Built? |
| - | ------------------ | ----------------- | --------- | ------- | ----- | ---- | ------ |
| 8 | The docs sweep | E · Documentation | schedule/event (push) | 1d | L1 | Medium | [ ] |
| 9 | The 100% test coverage loop | J · Testing & QA | conditional | on-demand | L2 | High | [ ] |
| 10 | The test stabilizer loop | J · Testing & QA | conditional | on-demand | L2 | High | [ ] |
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

## Findings / escalations

- **Template gotcha (2026-07-20):** `starters/_template/loop-run-log.md`'s schema
  doc line (`"run_id": "<YYYY-MM-DDTHH:MM:SSZ>"`) trips
  `loop-ready-audit.mjs`'s `<YYYY-MM-DDTHH` placeholder marker even in a fully
  filled kit — the log's format documentation itself reads as an unfilled blank.
  Every future beat must reword that one line in the stamped copy (e.g.
  `<ISO-8601-UTC>`) alongside `LOOP.md`/`SKILL.md`/the state example, or the audit
  will FAIL a kit that's actually done. Not a `_template/` edit (read-only) — a
  per-kit fix applied during stamping.

# AGENTS.md — Rules for any AI agent in this repo

## Project

Building the Loop Engineering Crash Course. Master plan: `loop-plan.md` (root).
Day plans: `days-plans/`. Current phase: **Day 1** (see `shared/goal.md`).

## Test / verify commands

- Link check: `node scripts/link-check.mjs` (manual pass if it doesn't exist yet)
- Markdown lint: per `.github/workflows/markdown-lint.yml`

## Loop conventions

- Rules shared by all loops: root `LOOP.md` (binding; no loop may edit it).
- Binding constraints: root `loop-constraints.md` (read at the start of every run).
- Each loop lives in `loops-day1/<loop>/` with its own `loop.md` + `state.md`.
- Write ONLY your own state file; other loops' folders are read-only.
- Report-only first (L1) before enabling any auto-fix (L2).
- One line appended to `shared/loop-run-log.md` per beat — no silent runs.
- Budget: `shared/loop-budget.md`; goal and definition of done: `shared/goal.md`.

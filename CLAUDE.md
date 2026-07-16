# CLAUDE.md — Project Rules (loaded every session)

This repo builds the **Loop Engineering Crash Course** (see `loop-plan.md`, the single
source of truth). Two deliverables: (1) a GitHub-browsable markdown course, (2) a Next.js
website in `web/` that renders the same `docs/` content. These rules are **mandatory** in
every session and for every loop.

## Where things live

| File / folder | Role |
|---|---|
| `loop-plan.md` | Master plan — the single source of truth. Never contradict it. |
| `days-plans/` | Per-day build plans (day1–day4). |
| `LOOP.md` | **Main loop rulebook** — rules shared by ALL loops. No single loop owns it. |
| `loop-constraints.md` | Binding constraints, read by the `loop-constraints` skill at the start of every run. |
| `loops-day1/<loop>/loop.md` | One loop's own definition (prompt, stop, limit, ownership). |
| `loops-day1/<loop>/state.md` | That loop's private spine. **Only that loop writes it.** |
| `shared/goal.md` | The goal and definition of done the loops work toward. |
| `shared/AGENTS.md` | Rules for any AI agent in this repo. |
| `shared/loop-budget.md` | Token/run budget for the whole fleet. |
| `shared/loop-run-log.md` | Shared run log — **every loop appends one line per beat.** |
| `STATE.md` | Project-level spine (overall progress across days). |

## Mandatory rules (from loop-plan.md)

1. **Single source of truth.** Course content is written once in `docs/` and consumed by
   both surfaces (GitHub + website). Never duplicate content elsewhere.
2. **Follow the §10 page template** for every concept page: hook → plain-English
   explanation → mermaid diagram → dual-tool code tabs (Claude Code ↔ OpenCode) →
   going-deeper callout → check-yourself quiz → Try With AI exercise → when-it-goes-wrong
   box → glossary popovers.
3. **Attribution.** All nine primary sources are credited in `resources/sources.md`.
   Adapted MIT material carries attribution. License is MIT.
4. **L1 first.** Every loop starts in report-only mode (L1). No auto-fix (L2) until a
   human has watched one full real run succeed.
5. **Minimum-safe checklist before starting any loop:** provable success condition ·
   run limit · spine (state file) written first · human gate · one log line per beat.
6. **Separate state files.** Each loop has its own `state.md`; loops never write another
   loop's state file. This is how loops avoid overriding each other's work.
7. **One owner per file/folder.** Only the designated owner loop edits a path; all other
   loops are read-only on it (ownership map is in `LOOP.md`).
8. **The spine is sacred.** Update your state file every beat so an interrupted run
   resumes instead of restarting. Append one line to `shared/loop-run-log.md` every beat.
9. **Human gates.** The human reviews `README.md` and foundations pages before a day's
   checkpoint is declared met. Never push, merge, or close issues/PRs without approval.
10. **Budget discipline.** Respect `shared/loop-budget.md`. At 80% of the daily cap,
    switch to report-only. If `loop-pause-all` is active, exit immediately.
11. **Stop conditions are specs.** A loop stops on exactly three things: success
    condition met, run limit hit, or no progress for 3 consecutive beats. "Feels done"
    is not a stop.
12. **Green ≠ done.** Verify output (link check, template check) before declaring a
    checkpoint met. The maker never grades its own work — use a separate checker.

## Session startup order

1. Read this file (automatic).
2. Read `loop-constraints.md` (binding).
3. If running a loop: read `LOOP.md`, then your own `loops-day1/<loop>/loop.md` and
   `state.md`, then `shared/goal.md`.

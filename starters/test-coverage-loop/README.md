# `test-coverage-loop` — the 100%-coverage loop

> Adds tests until the suite reaches full coverage, on demand. Each beat
> drafts a test for the largest uncovered region in a throwaway worktree and
> reports whether it raised coverage without weakening what "covered" means.
> It never commits a test itself.

**Category:** J · Testing & QA · **Heartbeat:** conditional (run-until-done,
on-demand — no schedule) · **Level:** L1 (report-only, drafts-not-commits) ·
**Cost:** High

**Source:** Loop #5, "100% Test Coverage Loop," from
[Forward Future's Loop Library](https://signals.forwardfuture.com/loop-library/),
original prompt by **Matthew Berman**: *"Add tests until we have 100% test
coverage."*

## Quickstart

```text
1. Read LOOP.md — the six parts, the prompt, the limits, the three stops,
   and the source's own caveat about coverage vs. assertion quality.
2. test-coverage-loop-state.md is your spine — already committed with an
   empty per-region register.
3. Claude Code: run it in-session on demand
   ("/loop Run the test-coverage-loop skill until 100%..."), pointed at
   .claude/skills/loop-task/SKILL.md. OpenCode: rename
   opencode.json.example → opencode.json, add the AGENTS.md line, run
   skills/loop-task.md via a capped for-loop.
4. Rehearse once, by hand, on real uncovered code before running to
   completion: "Run the test-coverage-loop skill now for one beat."
5. Grade the rehearsal with the loop-verifier agent — it re-runs the suite
   and checks whether the drafted test actually asserts anything. PASS →
   run it to completion. FAIL → fix the skill, never force a hollow test
   through for the coverage number.
```

## What's in this kit

| File | Role |
| --- | --- |
| [`LOOP.md`](LOOP.md) | the definition — six parts, prompt, limits, ownership, three stops |
| [`test-coverage-loop-state.md`](test-coverage-loop-state.md) | the spine — per-region coverage status, retry counts, the `exclusion-candidate` register |
| [`loop-budget.md`](loop-budget.md) | caps: 40 runs, 400k tokens, 5 regions/beat, 1 retry/region — added by this library; the source specified none |
| [`loop-constraints.md`](loop-constraints.md) | the constitution — never commits a test, never drafts a hollow assertion |
| [`loop-run-log.md`](loop-run-log.md) | append-only, one line per beat |
| [`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) | the procedure (Claude Code) |
| [`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md) | the read-only reviewer — re-runs the suite and checks assertion quality, not just the coverage delta |
| [`opencode.json.example`](opencode.json.example) · [`skills/loop-task.md`](skills/loop-task.md) | the OpenCode twin — same skill text, capped run |

## Loop Ready checklist

- [x] Provable success condition — the source's own spec, verbatim: "the full test suite passes at 100% coverage"
- [x] Run limit — 40 runs, 5 regions/beat, 1 retry/region (added by this library)
- [x] Spine written first, committed empty
- [x] Report-only (L1) start — drafts tests in a throwaway worktree, commits nothing
- [x] Human gate placed — you review each drafted test's assertions, not just the percentage
- [x] One log line per beat, no silent runs
- [x] Kill switch — `loop-pause-all` in `loop-budget.md`

## How this relates to the course

This kit adapts Forward Future's Loop #5 almost unmodified — its stopping
condition ("the full test suite passes at 100% coverage") and checker ("the
project's coverage report as the source of truth") are used verbatim, since
they're already exactly the kind of machine-checkable spec this course's
Step 5/B move demands. What this library adds: the L1-first shipping rule
([`kit-state.md`](../../kit-state.md); CLAUDE.md rule 4), the worktree
isolation from [Step 8](../../docs/05-part-3-the-body/08-worktrees.md), and
the retry-once-then-`exclusion-candidate` doom-loop bound from
[infinite-loops.md, scenario 1](../../docs/10-operating/infinite-loops.md).
The source's own implementation note — coverage tools measure execution, not
assertion quality — is carried directly into the `loop-verifier`'s rubric and
the human gate.

---

*Full attribution: [resources/sources.md](../../resources/sources.md).*

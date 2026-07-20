# Solution · Project 8 — Your Own Daily Loop (Capstone)

> Reference solution. Read [the project](../08-your-own-daily-loop-capstone.md) first.
> This is a worked example of the *shape* a strong capstone takes — your own job will
> differ, and should; this is not a template to copy verbatim.

## Worked example

**Job:** a nightly dependency-freshness report for a real service with 40+ npm
dependencies, several of them multiple majors behind.

**Filled loop design checklist (excerpt):**

- Name: `dep-freshness-report`
- Job in one sentence: nightly report of outdated dependencies, ranked by how far behind
  and whether a security advisory applies — never auto-upgrades anything.
- Heartbeat: schedule, once nightly. *Justification:* dependency state changes slowly;
  event-driven would be pure overhead, and a schedule cadence matches how often anyone
  actually reads the report.
- Body: read `package.json`/`package-lock.json` and `npm outdated`/`npm audit` output only
  — no writes to any dependency file, ever, at this level.
- Spine: `dep-state.md`, committed before beat 1, tracking last-reported version per
  package so the nightly report is a diff, not a re-scan from zero framing.
- Stopping condition: none (schedule loop) — the exercise's provable target is 3 clean
  nightly reports with no duplicate or missing package.
- Checker: a plain script comparing `dep-state.md`'s prior night against the current
  `npm outdated` output — confirms the report's ranked list matches reality, run
  separately from the report-writing beat.
- Human gate: nothing to gate — this loop never writes outside its own report and spine,
  by design; the human gate is simply "a person reads the report," which is the whole job.

**Three real beats, run-log excerpt:**

```text
{"run_id":"...","outcome":"14 packages outdated, 2 with open advisories (CVE-2026-xxxx on lodash); report written"}
{"run_id":"...","outcome":"no change since last night — report unchanged, logged anyway"}
{"run_id":"...","outcome":"one advisory patched upstream (lodash 4.17.22 released); dropped from ranked list"}
```

## Why this satisfies "done when"

- Every checklist box has a real, specific answer — none reads like a placeholder.
- The loop ran three genuine nightly beats at L1, including a quiet one, logged like any
  other beat.
- The stopping/limit/no-progress rules are all demonstrable even though this is a
  schedule loop: the "provable target for the exercise" (3 clean reports) stood in for a
  terminal stop, and the run cap and log discipline are visible in the transcript.

## Common wrong turns

- Picking a job novel enough to demo well but too vague to check — "keep me informed
  about the project" isn't a job; "flag any dependency with an open CVE, ranked by
  severity" is.
- Treating one successful run as proof — the grading rubric explicitly wants a real,
  watched history, not a single lucky beat.

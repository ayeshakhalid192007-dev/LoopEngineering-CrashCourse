# Solution · Project 2 — Make the Tests Pass, Then Stop

> Reference solution. Read [the project](../02-make-the-tests-pass-then-stop.md) first.

## Worked example

Target: a FastAPI service, `pytest` suite of 340 tests, one broken test after a dependency
bump changed a date-parsing library's default timezone handling —
`tests/test_reports.py::test_weekly_report_boundary` fails because the report's week
boundary is now computed in UTC instead of the service's configured local timezone.

**`fix-state.md` after the run:**

```markdown
# Spine: fix-loop (Project 2)

**Target test:** tests/test_reports.py::test_weekly_report_boundary
**Attempts:** 2 / 5
**Last error (attempt 1):** AssertionError: expected 2026-07-20, got 2026-07-21
**Attempt 2 result:** PASS — pytest exit 0, full suite (340/340)
```

**Body diff (attempt 2, the one that passed):** exactly one file,
`app/reports/scheduling.py` — the boundary computation now converts to the configured
timezone before truncating to the week start, matching the pre-bump behavior. No test
files, no fixtures, no unrelated modules touched.

**Checker invocation — a separate run, never the maker's own read of the diff:**

```text
$ pytest -q
340 passed in 18.42s
exit code: 0
```

The loop's stop was gated on this exit code, not on the model summarizing "this should
fix it."

## Why this satisfies "done when"

- Attempt 1's fix (correcting the assertion in the test itself instead of the
  implementation) was rejected — it made the suite pass by weakening the check, which
  isn't what "fix the failing test" means. The checker still said pass, but a human
  reviewing the diff caught that the *test's* boundary shifted, not the bug — this is why
  a checker script alone isn't sufficient for semantic correctness, only for "does it
  build/pass"; a human still reads the accepted diff before it ships.
- Attempt count is truthful (2, not "eventually") and stayed under the 5-attempt cap.

## Common wrong turns

- Marking success from the model's own "the fix looks right" — the exact failure mode
  [Step 11](../../05-part-3-the-body/11-maker-checker.md) warns against; always re-run the
  real suite as the checker.
- Editing the assertion to match broken behavior instead of fixing the behavior — passes
  the checker, fails the actual intent. A green suite is necessary, not sufficient.

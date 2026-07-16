# Security Policy

## Reporting a vulnerability

This is primarily a documentation repository, but it ships runnable artifacts —
starter kits, workflows, and example loop configurations — so security reports are
taken seriously.

- **Do not open a public issue for a vulnerability.** Use GitHub's private
  vulnerability reporting ("Report a security vulnerability" under the Security tab).
- Expect an acknowledgment within a week.

## Scope

Reports are especially welcome for:

- Starter kits or examples that could lead a learner to run an unsafe command,
  exfiltrate secrets, or grant an agent excessive permissions.
- Workflow files (`.github/workflows/`) with injection or over-permission issues.
- Course content that teaches an unsafe practice as if it were safe (e.g., loops
  that auto-merge, disable tests, or run without a human gate).

## Safety-by-design in this repo

The course's own safety rules apply to the repo itself: agents never push or merge
without human approval, never touch `.env*`, `auth/`, `payments/`, `secrets/`, or
`credentials/` paths, and every autonomous run is logged in `shared/loop-run-log.md`.

# Loop Patterns

> Named, reusable loop designs. Each pattern states what the loop watches, what it may do,
> how it verifies its own output, and where a human stays in the decision.

A **loop pattern** is a proven arrangement of the six parts — heartbeat, body, spine, stopping
condition, checker, and human gate — for one recurring job. Start from the pattern closest to
your problem, then adapt it. Every pattern here has a matching runnable kit in
[`starters/`](../starters/README.md).

## Review and delivery

| Pattern | What it does |
|---|---|
| [PR babysitter](pr-babysitter.md) | Watches an open PR and drives it to mergeable |
| [Spec → dev → review](spec-dev-review.md) | Splits authoring and reviewing across separate agents |
| [Clodex adversarial review](clodex-adversarial-review.md) | Second agent argues against the first |
| [Codex completion contract](codex-completion-contract.md) | Holds an agent to a written definition of done |
| [Ticket to PR-ready](ticket-to-pr-ready.md) | Takes a ticket to a reviewable pull request |

## Repository hygiene

| Pattern | What it does |
|---|---|
| [CI sweeper](ci-sweeper.md) | Clears failing checks on a heartbeat |
| [Docs sweep](docs-sweep.md) | Keeps documentation in step with code |
| [Post-merge cleanup](post-merge-cleanup.md) | Tidies branches and artifacts after merge |
| [Repo cleanup loop](repo-cleanup-loop.md) | Long-running structural tidying |
| [Stale-safe batch release](stale-safe-batch-release.md) | Batches releases without shipping stale work |

## Dependencies and security

| Pattern | What it does |
|---|---|
| [Dependency sweeper](dependency-sweeper.md) | Keeps dependencies current |
| [Dependency CVE burndown](dependency-cve-burndown.md) | Works a vulnerability backlog down |
| [Prod error sweep](prod-error-sweep.md) | Triages production errors into fixes |

## Testing and quality

| Pattern | What it does |
|---|---|
| [Test coverage loop](test-coverage-loop.md) | Raises coverage toward a target |
| [Test stabilizer loop](test-stabilizer-loop.md) | Hunts and fixes flaky tests |
| [Loop harness verification](loop-harness-verification.md) | Verifies the loop machinery itself |
| [Page load loop](page-load-loop.md) | Drives a performance budget |

## Triage and reporting

| Pattern | What it does |
|---|---|
| [Issue triage](issue-triage.md) | Labels, routes, and de-duplicates issues |
| [Daily triage](daily-triage.md) | One scheduled pass over what changed |
| [Changelog drafter](changelog-drafter.md) | Drafts release notes from merged work |

---

Machine-readable index: [`registry.yaml`](registry.yaml) · Runnable kits:
[`starters/`](../starters/README.md) · Back to the [course](../README.md).

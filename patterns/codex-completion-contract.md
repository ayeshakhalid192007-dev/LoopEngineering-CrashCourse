# Pattern: `codex-completion-contract`

> For long-running work where "mostly done" can quietly pass as "done,"
> invoked explicitly for a named Goal: this kit defines every required
> outcome and its evidence before acting, then after each bounded action
> marks every requirement proved, weak, missing, or contradicted. It
> completes only when everything is proved — and budget exhaustion never
> counts as success, this course's own "green ≠ done" turned into a literal
> audit trail.

## Quick facts

| Field | Value |
| --- | --- |
| Category | I · Self-improvement / meta |
| Heartbeat | conditional |
| Cadence | on-demand |
| Level | L1 (report-only) |
| Cost | Low |
| Group | B — Forward Future Loop Library |

## The six parts

| Part | This kit |
| --- | --- |
| Heartbeat | conditional — run-until-done, on-demand, invoked explicitly for a named Goal |
| Body | reads the target work's actual state (code, tests, deploy status); writes only `completion-audit.md`, its own state file, and the run log |
| Spine | `codex-completion-contract-state.md` — the requirement-to-evidence table, status, owner, next action |
| Stopping condition | the source's own, verbatim: "every Codex Goal requirement has current, adequate proof... no weak, missing, or contradicted required item" |
| Checker | the audit itself — each requirement checked against real evidence, not asserted |
| Human gate | the source's own — used only when explicitly asked for a completion audit; Goal state is created only with approval |

## The three valid stops

- **Success** — every requirement has current, adequate proof and the audit contains no weak/missing/contradicted item.
- **Limit** — 20 runs or 200k tokens — reported as **exhausted**, never as success.
- **No progress** — 3 consecutive beats with no new evidence on any open requirement → reported as **stalled**.

---

*Source: Loop #28, "The Codex completion-contract loop," from
[Forward Future's Loop Library](https://signals.forwardfuture.com/loop-library/loops/codex-completion-contract-loop/),
original prompt by **3goblack**. Its "budget exhaustion never counts as
success" rule is this kit's own instance of CLAUDE.md rule 12. Full
attribution: [resources/sources.md](../resources/sources.md).*

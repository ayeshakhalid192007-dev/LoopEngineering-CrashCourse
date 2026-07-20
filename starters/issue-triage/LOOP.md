# Loop: `issue-triage`

> Reads every new or updated issue since the last beat, ranks it by urgency,
> and leaves a suggested label and priority — never applies either itself. A
> narrower cousin of `daily-triage` (issues only, no PRs or CI), stamped from
> the same mold Step 13a names for exactly this reuse.

## The six parts

| Part | This loop |
| --- | --- |
| **Heartbeat** | schedule — every few hours (inside the 2h–1d band) |
| **Body** | reads new/updated issues via the SCM CLI; **writes only `issue-triage-report.md`, `issue-triage-state.md`, and the run log** |
| **Spine** | `issue-triage-state.md` (renamed from [`loop-state.md.example`](loop-state.md.example)) — last-seen issue marks, so a beat only triages what's new |
| **Stopping condition** | per-beat: `issue-triage-report.md` written, ≤5 lines, most urgent first, matching the template |
| **Checker** | the `loop-verifier` agent (read-only) — grades the report's format; content judgment stays with the human |
| **Human gate** | you read the report and apply the labels/priority yourself; nothing is applied until you do |

**Level: L1 (report-only)** — it observes and reports; it does not repair.
Writes are earned one level at a time
([`kit-state.md`](../../../kit-state.md), CLAUDE.md rule 4). See
[safety](../../docs/10-operating/safety.md).

## The prompt

```text
Run the issue-triage skill per skills/loop-task. Read new/updated issues
since issue-triage-state.md's last-seen marks. Rank: security-flagged >
reproducible-bug > regression > feature-request > question > rest. Write
issue-triage-report.md: ≤5 lines, most urgent first, one line each — [rank]
issue # and title · why it matters · suggested (NOT applied) label/priority.
Update issue-triage-state.md's last-seen marks. Append one line to
loop-run-log.md. Take NO other action. Stop after 12 runs/day, or after 3
consecutive beats with nothing new to triage.
```

For the exact skill text and the reviewer rubric, see
[`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) and
[`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md).

## Limits

| Guard | Value |
| --- | --- |
| Max runs/day | 12 |
| Max tokens/day | 60k |
| Sub-agent spawns | 0 |
| Kill switch | `loop-pause-all: on` → exit at start of beat |

Source: [`loop-budget.md`](loop-budget.md).

## Ownership

| Path | This loop's access |
| --- | --- |
| `issue-triage-state.md` | **write** (sole owner) |
| `issue-triage-report.md` | **write** (sole owner) |
| `loop-run-log.md` | **append-only** |
| issues (via SCM CLI) | **read-only** |
| everything else | read-only |

## The three valid stops

- **Success** — each beat: `issue-triage-report.md` exists, ≤5 lines,
  ranked, each line has issue/why/suggested-label, and
  `issue-triage-state.md`'s last-seen marks are updated. ← *how a good beat
  ends* (this loop keeps running as long as issues keep arriving; there is
  no all-done state, only quiet inboxes)
- **Limit** — 12 runs/day or 60k tokens/day.
- **No progress** — 3 consecutive beats with nothing new to triage → log and
  stop.

---

*Source: Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)),
Part V §15D's `issue-triage` catalog entry (schedule, 2h–1d, L1, Low) and
[Step 13a](../../docs/07-part-5-complete-loop/13a-claude-code-walkthrough.md)'s
own invitation to reuse its exact shape: *"swap the skill and the report name
and out comes a security sweeper, a dependency scout, a docs-drift
detector"* — this kit is `daily-triage`'s five-line-report mold, narrowed to
issues alone. Full attribution: [resources/sources.md](../../resources/sources.md).*

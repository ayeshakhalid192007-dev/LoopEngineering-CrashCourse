# Loop: `daily-triage`

> Combs every issue, PR, and CI failure that arrived overnight, ranks the genuinely
> urgent above the safely-ignorable, and leaves a five-line report next to your
> coffee. It writes nothing else and acts on nothing — it stops the moment the
> report is written.

## The six parts

| Part | This loop |
| --- | --- |
| **Heartbeat** | schedule — weekdays 07:00 (your timezone) |
| **Body** | reads issues/PRs/CI runs via the SCM CLI; **writes only `triage-report.md`, `daily-triage-state.md`, and the run log** |
| **Spine** | `daily-triage-state.md` (renamed from [`loop-state.md.example`](../_template/loop-state.md.example)) — last-seen timestamps for issues/PRs/CI, so a beat never re-triages what it already reported |
| **Stopping condition** | one beat = one `triage-report.md` written, ≤5 lines, matching the template; daily cap 1 |
| **Checker** | the `loop-verifier` agent (read-only) — grades the report's *format* against the rubric; content judgment stays with the human |
| **Human gate** | you read the report over coffee; nothing acts until you do |

**Level: L1 (report-only)** — it observes and reports; it does not repair. Writes are
earned one level at a time (see [safety](../../docs/10-operating/safety.md)).

## The prompt

```text
Run the daily-triage skill per skills/loop-task. Read new/updated issues, PRs, and
CI runs since daily-triage-state.md's last-seen marks. Rank: broken-main >
failing-CI > stale-urgent-PRs > new-issues > rest. Write triage-report.md: ≤5
lines, most urgent first, one line each — [rank] what · why it matters ·
suggested (NOT taken) action. Update daily-triage-state.md's last-seen marks.
Append one line to loop-run-log.md. Take NO other action. Stop after 1 run/day,
or after 3 consecutive beats with nothing new to report.
```

For the exact skill text and the reviewer rubric, see
[`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) and
[`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md) — both are the
course's own daily-triage artifacts, used verbatim.

## Limits

| Guard | Value |
| --- | --- |
| Max runs/day | 1 |
| Max tokens/day | 15k |
| Sub-agent spawns | 0 |
| Kill switch | `loop-pause-all: on` → exit at start of beat |

Source: [`loop-budget.md`](loop-budget.md).

## Ownership

| Path | This loop's access |
| --- | --- |
| `daily-triage-state.md` | **write** (sole owner) |
| `triage-report.md` | **write** (sole owner) |
| `loop-run-log.md` | **append-only** |
| issues / PRs / CI runs (via SCM CLI) | **read-only** |
| everything else | read-only |

## The three valid stops

- **Success** — `triage-report.md` exists, ≤5 lines, ranked, each line has
  what/why/suggested-action, and `daily-triage-state.md`'s last-seen marks are
  updated. ← *how a good run ends*
- **Limit** — 1 run/day or 15k tokens/day.
- **No progress** — nothing new to triage for 3 consecutive beats → log and stop.

---

*Source: Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)),
Step 13 — Build the Morning-Triage Loop. Full attribution:
[resources/sources.md](../../resources/sources.md).*

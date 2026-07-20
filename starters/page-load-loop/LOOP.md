# Loop: `page-load-loop`

> Optimizes for speed until every page loads under 50ms. Each beat re-runs
> the same repeatable benchmark across every route, drafts an optimization
> for the slowest one, and confirms no regression before reporting it. It
> never applies the change itself.

## The six parts

| Part | This loop |
| --- | --- |
| **Heartbeat** | schedule — weekly (per catalog); the source's own cadence is *"after each significant change,"* which a human running this in-session can follow more tightly — the weekly schedule is this kit's default for unattended operation |
| **Body** | measures page-load time across every route under fixed test conditions; drafts a candidate optimization in a throwaway worktree, re-measures there; **writes only `page-load-report.md`, `page-load-loop-state.md`, and the run log** |
| **Spine** | `page-load-loop-state.md` (renamed from [`loop-state.md.example`](../_template/loop-state.md.example)) — per-route load-time history, baseline capture, and optimization attempts |
| **Stopping condition** | the source's own, verbatim: *"every page loads in under 50 ms"* |
| **Checker** | the source's own, verbatim: *"the same benchmark and confirm there are no regressions"* — script-checkable, re-run every beat |
| **Human gate** | the source requires **initial setup before any beat runs**: defining the metric, the routes, the test environment, warm-up behavior, and baseline capture — this is the spine's first entry, not optional. After that, you review each drafted optimization before applying it |

**Level: L1 (report-only, drafts-not-applies)** — every kit in this library
ships this way; no loop earns L2 until a human has watched one real run
succeed ([`kit-state.md`](../../kit-state.md), CLAUDE.md rule 4). The
source describes this loop as designed to run "iteratively without human
intervention between cycles" once the human setup is done — this library's
L1-first rule still applies to the first run regardless. See
[safety](../../docs/10-operating/safety.md).

## The prompt

```text
Run the page-load-loop skill per skills/loop-task. Using the fixed test
conditions recorded in page-load-loop-state.md (routes, warm-up behavior,
baseline), measure page-load time across every route. For the slowest route
above the 50ms target: in a throwaway worktree, draft a candidate
optimization. Re-run the same benchmark against the change and confirm no
regression on any other route. Write page-load-report.md: route ·
before/after load time · the drafted change · regression check result.
Update page-load-loop-state.md's per-route history. Append one line to
loop-run-log.md. Take NO other action — never apply the optimization
yourself. Stop when every page loads under 50ms, after 20 runs, or after 3
consecutive beats with no measurable improvement.
```

For the exact skill text and the reviewer rubric, see
[`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) and
[`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md).

## Limits

| Guard | Value |
| --- | --- |
| Max runs | 20 |
| Max tokens | 250k |
| Sub-agent spawns | 0 |
| Kill switch | `loop-pause-all: on` → exit at start of beat |

Source: [`loop-budget.md`](loop-budget.md). Medium cost per the catalog; the
source specified none.

## Ownership

| Path | This loop's access |
| --- | --- |
| `page-load-loop-state.md` | **write** (sole owner) |
| `page-load-report.md` | **write** (sole owner) |
| a throwaway optimization worktree | **write** (isolated, discarded after the beat) |
| `loop-run-log.md` | **append-only** |
| the codebase and the benchmark harness | **read-only** |
| everything else | read-only |

## The three valid stops

- **Success** — the source's own spec, verbatim: every page loads under
  50ms. ← *how a good run ends*
- **Limit** — 20 runs or 250k tokens.
- **No progress** — 3 consecutive beats with no measurable improvement →
  log and stop (the remaining slow routes may need an architectural change
  outside this loop's reach).

---

*Source: Loop #12, "The sub-50 ms page-load loop," from Forward Future's
Loop Library (`https://signals.forwardfuture.com/loop-library/`), original
prompt by **Matthew Berman**: "Continue optimizing the code for speed. After
each significant change, measure page-load performance across every page
under the same repeatable test conditions. Continue until every page loads
in under 50 ms." Checker per the source: "the same benchmark and confirm
there are no regressions." The source's own required setup — metric, routes,
test environment, warm-up behavior, baseline — before any agent cycle runs
is preserved as this kit's spine-first requirement. Catalog placement: Part V
§15's page-load entry (N · Performance, schedule, weekly, L2 target,
Medium). Full attribution: [resources/sources.md](../../resources/sources.md).*

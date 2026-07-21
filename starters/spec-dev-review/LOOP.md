# Loop: `spec-dev-review`

> For one ticket or story, writes a scoped spec packet — findings, progress,
> task plan, and a rubric with critical gates and edge cases derived from
> the ticket. After each edit round, a genuinely independent adversarial
> review checks the packet against the rubric **and** confirms prior
> findings stay resolved — not just that new issues are caught.

## The six parts

| Part | This loop |
| --- | --- |
| **Heartbeat** | conditional — run-until-done, on-demand, one invocation per ticket/story |
| **Body** | writes the spec packet's four sections; verifies factual claims against the actual repo before relying on them; **writes only `spec-packet-draft.md`, `spec-dev-review-state.md`, and the run log** — the draft, not the project's canonical spec location |
| **Spine** | `spec-dev-review-state.md` (renamed from [`loop-state.md.example`](../_template/loop-state.md.example)) — round count, the review log (finding + fix, per round), and whether each prior finding remains resolved |
| **Stopping condition** | the source's own, verbatim: *"stop only when the reviewer returns ready with no material findings, or when the round cap is reached and the remaining blocker is logged for human decision"* |
| **Checker** | an independent adversarial review, genuinely separate from the drafting pass — checks the packet against the ticket-derived rubric **and** regression-checks that every prior finding is still resolved, not just newly re-reviewed |
| **Human gate** | the source's own — when the round cap is reached with an open blocker, it's logged for **human decision**, not silently retried or silently shipped |

**Level: L1 (report-only, drafts-not-final)** — every kit in this library
ships this way; no loop earns L2 until a human has watched one real run
succeed ([`kit-state.md`](../../kit-state.md), CLAUDE.md rule 4). See
[safety](../../docs/10-operating/safety.md) and
[Step 11 · Maker–Checker](../../docs/05-part-3-the-body/11-maker-checker.md).

## The prompt

```text
Run the spec-dev-review skill per skills/loop-task, for [the ticket or
story]. Write a scoped spec packet: findings, progress, task plan, and a
rubric with critical gates and edge cases derived from the ticket. Verify
every factual claim against the actual repo before relying on it — never
assert something about the code you haven't checked. After each edit round,
run an independent adversarial review against the rubric, and require it to
confirm prior findings remain resolved, not just check new ones. If the
review finds material issues, fix every affected section of the packet
consistently, append the finding and fix to the review log in
spec-dev-review-state.md, and review again. Write spec-packet-draft.md: the
current packet. Append one line to loop-run-log.md. Take NO other action —
this is a draft, not the project's canonical spec. Stop only when the
reviewer returns ready with no material findings, or when the round cap
(5) is reached — log the remaining blocker for human decision, don't force
a verdict.
```

For the exact skill text and the reviewer rubric, see
[`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) and
[`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md).

## Limits

| Guard | Value |
| --- | --- |
| Max rounds per ticket | 5 |
| Max tokens per ticket | 300k |
| Sub-agent spawns | 1 (the independent adversarial review) |
| Kill switch | `loop-pause-all: on` → exit at start of beat |

Source: [`loop-budget.md`](loop-budget.md). Medium cost per the catalog; the
round cap is this library's addition, sized against the doom-loop bound
below (the source names "the round cap" without a specific number).

## Ownership

| Path | This loop's access |
| --- | --- |
| `spec-dev-review-state.md` | **write** (sole owner) |
| `spec-packet-draft.md` | **write** (sole owner) |
| `loop-run-log.md` | **append-only** |
| the repo (to verify factual claims) | **read-only** |
| everything else | read-only |

## The three valid stops

- **Success** — the reviewer returns ready with no material findings — the
  source's own spec, verbatim. ← *how a good run ends*
- **Limit** — 5 rounds or 300k tokens.
- **No progress / human decision** — the source's own case: the round cap
  is reached with an open blocker → log it for human decision, per
  [infinite-loops.md, scenario 8](../../docs/10-operating/infinite-loops.md#8--the-makerchecker-standoff) —
  *"a rejection cap... stops the pair and escalates the disagreement to the
  human gate"* — rather than a third, fourth, fifth attempt at the same
  finding.

---

*Source: Loop #21, "The spec dev-review loop," from Forward Future's Loop
Library (`https://signals.forwardfuture.com/loop-library/`), original
prompt by **Ximanta (@kharamdau)**: "For one ticket or story, write a scoped
spec packet: findings, progress, task plan, and a rubric with critical gates
and edge cases derived from that ticket. Verify factual claims against the
repo before relying on them. After each edit round, run an independent
adversarial review against the rubric and require it to check that prior
findings remain resolved. If the review finds material issues, fix every
affected spec file consistently, append the finding and fix to the review
log, and review again. Stop only when the reviewer returns ready with no
material findings, or when the round cap is reached and the remaining
blocker is logged for human decision." Catalog placement: Part V §15's spec
dev-review entry (D · Issue & intake, conditional, on-demand, L1, Medium).
Full attribution: [resources/sources.md](../../resources/sources.md).*

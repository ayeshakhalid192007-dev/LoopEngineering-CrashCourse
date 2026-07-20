# Project 5 · Codify the Body

> **⚠️ Throwaway repo. Set a limit first.** Practice the skill on a disposable clone before
> you ever point it at something real, and cap the number of loop invocations you run
> while iterating.

| Difficulty | Time | Concepts | Loop type |
| --- | --- | --- | --- |
| Medium (T2/T3) | 60 min | skills, the cold-start problem, rules vs. procedure | **conditional loop with a codified skill body** |

## The scenario

You've been hand-writing the same three-paragraph prompt every time you ask an agent to
add a changelog entry for a merged PR: which file to touch, the heading format, the
tone, which PRs to skip (drafts, reverts). It works, but every session starts cold — the
agent re-derives "how we do changelogs here" from scratch, and it drifts a little each
time. This project turns that repeated prose into a **skill**: a small, named, reusable
procedure the loop's body invokes instead of re-explaining itself every beat.

## What you'll build

Take a real repository with a `CHANGELOG.md` and a real PR history (your own project, or
any OSS repo with a maintained changelog you can fork). Extract the changelog convention
into a `SKILL.md` (both tools' shape), then wire a schedule loop's body to invoke it
instead of an inline prompt:

- **The skill:** `changelog-entry/SKILL.md` — heading format, which PR fields to pull,
  what to skip, one worked example.
- **Heartbeat:** schedule, once per merge or once daily.
- **Body:** for each new merged PR since last beat, invoke the skill to draft (not commit)
  a changelog entry into a scratch file — never `CHANGELOG.md` directly at L1.
- **Spine:** `changelog-state.md` — last PR number processed.

```claude
# Claude Code
# .claude/skills/changelog-entry/SKILL.md exists with the convention + one example
> /loop 1d For each PR merged since changelog-state.md's last-seen number, use the
  changelog-entry skill to draft an entry into changelog-draft.md (never edit
  CHANGELOG.md directly). Skip drafts and reverts, per the skill. Update
  changelog-state.md. Log one line.
```

```opencode
# OpenCode — AGENTS.md points at the same convention as a referenced doc
opencode run "For each PR merged since changelog-state.md's last-seen number, follow
  docs/conventions/changelog-entry.md to draft an entry into changelog-draft.md.
  Skip drafts/reverts. Update changelog-state.md. Log one line." --schedule daily
```

## Done when (provable stop)

- [ ] A `SKILL.md` (or equivalent `AGENTS.md`-referenced doc) exists, versioned, with the
      convention spelled out and one worked example.
- [ ] Two separate loop beats, run in **fresh sessions**, produce changelog entries in the
      same format without you re-explaining the convention in the prompt either time.
- [ ] `changelog-draft.md` never wrote to the real `CHANGELOG.md` — this project stays L1.
- [ ] `changelog-state.md` correctly tracks the last PR processed across a restart.

## Going deeper

This is the exact cold-start problem [Step 9](../05-part-3-the-body/09-skills.md) names,
and the exact fix `starters/changelog-drafter/` ships as a finished kit. Compare your
`SKILL.md` against that kit's once you're done — the difference between a fat, repeated
prompt and a thin prompt plus a named skill is the whole lesson of this project.

## When it goes wrong

| Symptom | Cause | Fix |
| --- | --- | --- |
| Every entry looks slightly different | The skill was read as inspiration, not procedure | Make the skill's heading/format non-negotiable; keep the "one worked example" verbatim-close |
| Skill grows into a second prompt just as long | Trying to encode every edge case up front | Start thin; add an edge case to the skill only after it actually occurs, not speculatively |
| Draft entries pick up PRs already processed | `changelog-state.md` not read at beat start | Read the spine before touching the PR list — never re-derive "what's new" from scratch |

---

*Sources:* the cold-start problem and `SKILL.md` shape from
[Step 9](../05-part-3-the-body/09-skills.md), Panaversity's *Loop Engineering: A Crash
Course* ([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course))
and *Agentic Coding Crash Course*
([S2](https://agentfactory.panaversity.org/docs/agentic-coding-crash-course)). Full
attribution: [resources/sources.md](../../resources/sources.md).

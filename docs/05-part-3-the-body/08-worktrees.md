# Step 8 · Worktrees

> Two makers, one repo, zero collisions. Each one works in its own full copy of the tree —
> cheap enough to spin up per beat and throw away after.

## The hook

Your step-writer is halfway through rewriting a page. Your quiz loop wakes up, sees
"modified files," and helpfully commits the half-sentence. Neither loop is wrong. They're
just standing in the same room, elbows out. Day 2 of *this very course* was built by two
makers running at once — and this page is the reason nothing collided.

## Isolation (plain English)

A **worktree** is a second (or tenth) working directory attached to the same git
repository. Same history, same remotes, but its own checked-out files on its own branch.
For loops, that buys **isolation** — the one property multi-loop work cannot live without.
A loop in its own worktree can't see, stomp on, or half-read another loop's uncommitted
mess.

And the decision rule is about *files*, not vibes:

- **Disjoint file ownership** (one loop owns `docs/`, another owns `patterns/`): path
  ownership in the rulebook is enough, and a shared tree is fine. That's how this repo's
  `step-writer` and `quiz-writer` share `docs/*-part-*` safely — they own different *files*.
- **Overlapping files**, or a maker whose failure must not poison `main`'s working tree:
  worktree, no debate. Half-built work stays quarantined until it's green, then merges as a
  single unit.

```mermaid
%%{init: {'theme':'base','themeVariables':{'fontFamily':'ui-sans-serif, system-ui, sans-serif','fontSize':'15px','lineColor':'#475569','edgeLabelBackground':'#f8fafc'},'flowchart':{'curve':'basis','nodeSpacing':45,'rankSpacing':55,'padding':12}}}%%
flowchart LR
    R[("one git repo<br/>shared history")]:::file --> W1
    R --> W2
    subgraph W1 ["worktree A · branch loop/steps"]
      M1("maker 1<br/>step-writer"):::maker
    end
    subgraph W2 ["worktree B · branch loop/quiz"]
      M2("maker 2<br/>quiz-writer"):::maker
    end
    W1 -->|"merge only<br/>when green"| MAIN[("main")]:::win
    W2 -->|"merge only<br/>when green"| MAIN
    linkStyle default stroke:#475569,stroke-width:2px;
    classDef file fill:#f1f5f9,stroke:#64748b,stroke-width:2.5px,color:#334155,font-weight:600;
    classDef maker fill:#e0e7ff,stroke:#6366f1,stroke-width:2.5px,color:#312e81,font-weight:600;
    classDef win fill:#ccfbf1,stroke:#14b8a6,stroke-width:2.5px,color:#115e59,font-weight:600;
    style W1 fill:#fbfbff,stroke:#c7d2fe,stroke-width:1.5px,color:#4338ca;
    style W2 fill:#fbfbff,stroke:#c7d2fe,stroke-width:1.5px,color:#4338ca;
```

## The mechanics in each tool

Both tools sit on the exact same git primitive. One lets you ask for isolation at dispatch
time; the other uses plain `git worktree` by hand:

```claude
# Claude Code — live docs: https://docs.claude.com/en/docs/claude-code
# Ask for isolation when dispatching work:
#   subagents / tasks accept a worktree isolation option ("isolation":
#   "worktree") — the agent gets its own tree, auto-cleaned if untouched.
# Or make one yourself and point a session at it:
git worktree add ../myrepo-quiz loop/quiz
claude --worktree ../myrepo-quiz    # (see live docs for current flags)
```

```opencode
# OpenCode — live docs: https://opencode.ai/docs
# Plain git is the whole mechanism — one worktree per loop:
git worktree add ../myrepo-quiz loop/quiz
cd ../myrepo-quiz && opencode run "Write the Part 1 quiz…"
# Cleanup when merged:
git worktree remove ../myrepo-quiz
```

> [!NOTE]
> **Going deeper:** isolation is only one of the three legs of multi-loop safety — the
> other two are **separate spines** and **one owner per path**, both on display in this
> repo's [`LOOP.md`](../../LOOP.md) ownership map. The full coordination contract is in
> [multi-loop operating](../10-operating/multi-loop.md).

## Check yourself

**Q: Day 2 of this course ran two makers in ONE shared tree. Why was that safe here, and
what single change to the plan would have forced a real worktree?**

<details><summary>Answer</summary>

Safe because their file sets are **disjoint by rule**: `step-writer` may not touch
`quiz.md` or `flashcards.md`, `quiz-writer` may touch nothing else, and the rulebook's
ownership map enforces it. The moment both makers need the *same file* — say the
quiz-writer also updated each part's `README.md` — the rule breaks. Path ownership cannot
split a file. A worktree, merged only when green, becomes mandatory.

</details>

## Try With AI

Create a worktree in a throwaway repo (`git worktree add ../scratch-wt test-branch`) and
run one agent beat in it — any small task. While it works, run `git status` in your main
tree and confirm nothing moved. Then merge the branch back and remove the worktree. Notice
what the merge commit gives you that a shared tree never could: a single reviewable boundary
around the loop's entire output.

## When it goes wrong

| Symptom | Cause | Fix |
| --- | --- | --- |
| Two loops' edits interleaved in one file | Shared tree + shared file | Worktree per maker; merge only when green |
| Loop committed another loop's half-done work | "Helpful" commit in a shared tree | Isolation + each loop commits only its own paths |
| Worktrees piling up, disk full of stale trees | No cleanup step in the loop | `git worktree remove` on merge; prune as a scheduled sweep |
| Merge at end of day is a war | Two branches drifted all day | Small beats, frequent merges; rebase the worktree branch regularly |

---

*Glossary terms used on this page:* **worktree**, **isolation**, **one owner per
path**, **merge-when-green** — see the [glossary](../02-foundations/glossary.md).

*Sources:* worktree isolation comes from Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)) and
*Agentic Coding Crash Course*
([S2](https://agentfactory.panaversity.org/docs/agentic-coding-crash-course)). Full
attribution: [resources/sources.md](../../resources/sources.md).

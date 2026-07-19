# Environment Setup

> Get one AI coding agent installed and verified. Fifteen minutes, done once, never
> thought about again.

## The hook

Every lab in this course ends the same way: *your* agent does something real while you
watch. And none of it works if the very first step of your journey is a blinking
`command not found`. So we clear that hurdle now — install once, verify once, and then
put it out of your mind for good.

## What you need (plain English)

Three things, and the order matters:

1. **A terminal you're comfortable in** — a macOS or Linux shell, or Windows with WSL.
2. **One agent installed** — Claude Code *or* OpenCode is plenty for every lesson here.
   Codex and Grok are optional extras, shown only where their mechanics diverge.
3. **A throwaway practice repo** — loops learn by doing, and you will badly want a
   sandbox where a mistake costs you exactly nothing.

> [!WARNING]
> **Mechanics change weekly.** Treat the commands below as the *shape* of installation,
> not scripture. The authoritative steps always live in each tool's docs — linked in
> every section. If a command here ever disagrees with the official docs, the docs win,
> no contest.

```mermaid
%%{init: {'theme':'base','themeVariables':{'fontFamily':'ui-sans-serif, system-ui, sans-serif','fontSize':'15px','lineColor':'#475569','edgeLabelBackground':'#f8fafc'},'flowchart':{'curve':'basis','nodeSpacing':45,'rankSpacing':55,'padding':12}}}%%
flowchart LR
    A("Terminal<br/>ready"):::step --> B("Install<br/>one agent"):::step
    B --> C("Verify:<br/>--version"):::step
    C --> D("Log in /<br/>authenticate"):::step
    D --> E("Make a<br/>throwaway repo"):::step
    E --> F(["✓ Ready for<br/>the course"]):::done
    linkStyle default stroke:#475569,stroke-width:2px;
    classDef step fill:#e0e7ff,stroke:#6366f1,stroke-width:2.5px,color:#312e81,font-weight:600;
    classDef done fill:#d1fae5,stroke:#10b981,stroke-width:2.5px,color:#065f46,font-weight:600;
```

## Install and verify

```claude
# Claude Code — live docs: https://docs.claude.com/en/docs/claude-code
npm install -g @anthropic-ai/claude-code
claude --version
claude   # first run walks you through login
```

```opencode
# OpenCode — live docs: https://opencode.ai/docs
curl -fsSL https://opencode.ai/install | bash
opencode --version
opencode auth login
```

Want the optional extras? They follow the identical rhythm — install, `--version`,
authenticate: **Codex** (see OpenAI's live docs) and **Grok CLI** (see xAI's live docs).

## Make your sandbox

```claude
mkdir loop-sandbox && cd loop-sandbox && git init
claude "create a tiny node project with one failing test"
```

```opencode
mkdir loop-sandbox && cd loop-sandbox && git init
opencode run "create a tiny node project with one failing test"
```

That failing test is no accident — you planted it on purpose. It's the raw material your
first loop will chew on in Project 1.

> [!NOTE]
> **Going deeper:** why insist on a *throwaway* repo? Because your week-1 loops run at L1
> (report-only) for exactly this reason — so a wrong move is cheap. It's the same
> discipline this repo applied to its own loops, which all started report-only. The full
> permission ladder (L1→L3) is laid out in the
> [agentic coding primer](agentic-coding-primer.md).

## Check yourself

**Q: The install command on this page fails with an error you've never seen. What's the
*course-approved* first move?**

<details><summary>Answer</summary>

Open the tool's **live documentation** — the link is right above — not a search engine,
and not this page. Mechanics change weekly; this course deliberately teaches lasting
shapes and treats every command as a pointer to the current docs.

</details>

## Try With AI

The moment *one* agent works, ask it:

> "Check this machine for everything a second AI coding agent would need — package
> manager, node/python versions, auth files — and report what's missing. Don't
> install anything."

Notice what just happened: you ran your first **report-only (L1) task** — the exact mode
every loop in this course is born in.

## When it goes wrong

| Symptom | Cause | Fix |
| --- | --- | --- |
| `command not found` right after install | Shell PATH wasn't reloaded | Open a new terminal, or re-source your shell profile |
| Agent installs but refuses to authenticate | Corporate proxy or an expired session | Re-run the tool's auth command; check its live-docs networking page |
| `npm install -g` throws permission errors | Global installs want elevated rights | Reach for a version manager (nvm/fnm) instead of system node |
| Works in one folder, dies in another | You're standing outside a git repo | Most agents want a repo root; `git init` first |

---

*Glossary terms used on this page:* **agent**, **L1 report-only**, **sandbox** — see
[../02-foundations/glossary.md](../02-foundations/glossary.md).

*Sources:* this setup guide follows Panaversity's *Agentic Coding Crash Course*
([S2](https://agentfactory.panaversity.org/docs/agentic-coding-crash-course)); commands
are pointers to each tool's live documentation (attribution policy rule 3). Full
attribution: [resources/sources.md](../../resources/sources.md).

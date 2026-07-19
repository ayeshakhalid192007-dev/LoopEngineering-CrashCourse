# The Four Layers

> Prompt → context → harness → loop: each layer wraps the one before it and catches a
> failure the inner layers simply cannot see.

## The hook

Your agent keeps botching the same refactor. So you sharpen the prompt — no change. You
paste in more files — now it's worse. The real fix turns out to be a permission setting
(harness) plus a stopping condition (loop). You were debugging on the wrong layer the
whole time. This page is the map that ends that particular kind of afternoon.

## The stack (plain English)

1. **Prompt** — the words you send. Fails by *ambiguity*: the task can be read two ways.
2. **Context** — everything the model sees in one turn: files, history, rules. Fails by
   *starvation or drowning*: the key fact is missing, or it's buried under noise.
3. **Harness** — the code around the model: tool execution, permissions, hooks, error
   handling. *The inner loop lives here.* Fails by *capability*: the agent can't — or,
   worse, *can* — do something it shouldn't.
4. **Loop** — the outer cycle: what the system works on, when it starts, how it knows
   it's done. Fails by *management*: wrong task, wrong time, no real stop.

```mermaid
%%{init: {'theme':'base','themeVariables':{'fontFamily':'ui-sans-serif, system-ui, sans-serif','fontSize':'15px','lineColor':'#475569','edgeLabelBackground':'#f8fafc'},'flowchart':{'curve':'basis','nodeSpacing':50,'rankSpacing':55,'padding':12}}}%%
flowchart TD
    LOOP("<b>4 · Loop</b><br/>what · when · done?"):::l4 --> HARNESS("<b>3 · Harness</b><br/>tools · permissions · hooks"):::l3
    HARNESS --> CONTEXT("<b>2 · Context</b><br/>what the model sees"):::l2
    CONTEXT --> PROMPT("<b>1 · Prompt</b><br/>the words you send"):::l1
    PROMPT -.->|result flows back up| LOOP
    linkStyle default stroke:#475569,stroke-width:2px;
    classDef l1 fill:#fef3c7,stroke:#f59e0b,stroke-width:2.5px,color:#92400e,font-weight:600;
    classDef l2 fill:#dbeafe,stroke:#3b82f6,stroke-width:2.5px,color:#1e40af,font-weight:600;
    classDef l3 fill:#ede9fe,stroke:#8b5cf6,stroke-width:2.5px,color:#5b21b6,font-weight:600;
    classDef l4 fill:#d1fae5,stroke:#10b981,stroke-width:2.5px,color:#065f46,font-weight:600;
    linkStyle 0,1,2 stroke:#cbd5e1,stroke-width:2px;
    linkStyle 3 stroke:#10b981,stroke-width:3px;
```

The move that saves you: **name the failure signature before you fix.** When a loop
misbehaves, don't reach for the layer you happen to be typing in — ask *which layer's
signature is this?* (ambiguity, starvation/drowning, capability, or management) and fix
there.

## Where you configure each layer

```claude
# Claude Code — live docs: https://docs.claude.com/en/docs/claude-code
# 1 Prompt:   what you type (or the /loop prompt)
# 2 Context:  CLAUDE.md, @file mentions, /context
# 3 Harness:  /permissions, hooks in .claude/settings.json
# 4 Loop:     /loop, Cron tools, skills like this repo's LOOP.md discipline
```

```opencode
# OpenCode — live docs: https://opencode.ai/docs
# 1 Prompt:   the message (or the scripted run prompt)
# 2 Context:  AGENTS.md, attached files
# 3 Harness:  opencode.json permissions & mcp
# 4 Loop:     cron / GitHub Actions driving `opencode run`, capped `for` loops
```

> [!NOTE]
> **Going deeper:** the four layers come from the Panaversity backbone
> ([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)); Step
> 02 (Day 2) spends a whole lesson here, including how the layers line up with the
> LangChain 4-loop stack ([S6](https://www.langchain.com/blog/the-art-of-loop-engineering)).

## Check yourself

**Q: A nightly loop cheerfully "fixed" the same test five nights running; each morning the
fix gets reverted in review. Which layer is failing?**

<details><summary>Answer</summary>

**Layer 4, the loop.** Prompt, context, and harness all did their jobs — work got done
every night. What's missing is management: a spine that remembers the rejection, and a
no-progress stop (or an escalation) after repeated reverts. No amount of prompt wording
fixes a memory problem.

</details>

## Try With AI

Take the last time an agent genuinely disappointed you, and ask it:

> "Here's what I asked, what you saw, what you could do, and what happened: [paste].
> Which of the four layers — prompt, context, harness, loop — most likely caused the
> gap, and what's the smallest fix at that layer?"

Then grade its self-diagnosis against the failure signatures above.

## When it goes wrong

| Symptom | Layer | Fix |
| --- | --- | --- |
| Two readings of the task, agent picked the wrong one | Prompt | Restate with one checkable meaning |
| Agent "forgot" a critical constraint mid-run | Context | Move it to the rules file; shrink the noise |
| Agent edited a file it should never have touched | Harness | Narrow write permissions; add a hook |
| Right work, wrong task — or no idea when to stop | Loop | Declare the six parts; write the three stops |

---

*Glossary terms used on this page:* **harness**, **loop**, **inner loop**, **spine** —
see [glossary.md](glossary.md).

*Sources:* the four-layer stack comes from Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)), and the
mapping to stacked loops from Sydney Runkle's *The Art of Loop Engineering*
([S6](https://www.langchain.com/blog/the-art-of-loop-engineering)). Full attribution:
[../../resources/sources.md](../../resources/sources.md).

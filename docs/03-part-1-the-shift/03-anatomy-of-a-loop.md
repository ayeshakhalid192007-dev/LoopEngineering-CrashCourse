![Anatomy of a loop: five parts (heartbeat, worktree, skill, sub-agents, connector) plus a spine, the human gate, and the checker ladder from a passing test to mechanical checks to a rubric](../../assets/anatomy-of-a-loop.svg)

# Step 3 · Anatomy of a Loop

> Six parts, every loop, no exceptions: heartbeat, body, spine, stopping condition,
> checker, human gate. Learn the shape once and you can read any loop in the wild.

## The hook

Someone shows you their "AI automation" and asks why it ran all weekend and produced
nothing usable. So you ask six questions: *When does it wake? What may it touch? What does
it remember? How does it know it's done? Who grades it? Where do you sign off?* They can
answer two of them. That is not an automation problem — that is four missing organs.

## The six parts (plain English)

| Part | Body metaphor | The question it answers |
| --- | --- | --- |
| **Heartbeat** | pulse | *when* does a beat start? (timer, condition, event) |
| **Body** | hands | *what* may it do and touch? (tools, permissions, scope) |
| **Spine** | memory | *what* survives between beats? (state file, run log) |
| **Stopping condition** | finish line | *how* does it provably end? (a fact, not a feeling) |
| **Checker** | second pair of eyes | *who* grades the work? (never the maker itself) |
| **Human gate** | signature | *where* does a person decide? (review, approve, ship) |

Drop any one of them and the loop earns a familiar failure name:

- **No heartbeat:** it's just a script you run by hand.
- **No body limits:** it's a hazard.
- **No spine:** it restarts from zero.
- **No stop:** it runs forever.
- **No checker:** it grades itself.
- **No human gate:** it ships with no owner.

```mermaid
%%{init: {'theme':'base','themeVariables':{'fontFamily':'ui-sans-serif, system-ui, sans-serif','fontSize':'15px','lineColor':'#475569','edgeLabelBackground':'#f8fafc'},'flowchart':{'curve':'basis','nodeSpacing':45,'rankSpacing':55,'padding':12}}}%%
flowchart LR
    subgraph LOOP ["🔄 one loop"]
      direction LR
      HB("Heartbeat"):::time --> B("Body<br/>does one beat"):::beat
      B --> SP[("Spine")]:::file --> HB
    end
    STOPC("Stopping condition"):::limit -->|"provably met? exit"| HB
    CK("Checker"):::check -.->|grades| B
    H(["🧑 Human gate"]):::human -.->|approves| LOOP
    linkStyle default stroke:#475569,stroke-width:2px;
    classDef time fill:#fef3c7,stroke:#f59e0b,stroke-width:2.5px,color:#92400e,font-weight:600;
    classDef beat fill:#e0e7ff,stroke:#6366f1,stroke-width:2.5px,color:#312e81,font-weight:600;
    classDef file fill:#f1f5f9,stroke:#64748b,stroke-width:2.5px,color:#334155,font-weight:600;
    classDef limit fill:#ffe4e6,stroke:#f43f5e,stroke-width:2.5px,color:#9f1239,font-weight:600;
    classDef check fill:#ccfbf1,stroke:#14b8a6,stroke-width:2.5px,color:#115e59,font-weight:600;
    classDef human fill:#fef3c7,stroke:#f59e0b,stroke-width:2.5px,color:#92400e,font-weight:600;
    style LOOP fill:#fbfbff,stroke:#c7d2fe,stroke-width:1.5px,color:#4338ca;
```

## The finish line, as pseudo-code

The stopping condition earns its own moment, because it's where most loops are quietly
broken. A stop must be a **fact a machine can check**:

```text
# real stops (provable)
all_boxes_checked("state.md")        # the spine says done
test_suite_exit_code == 0            # the world says done
runs_used >= MAX_RUNS                # the limit says stop anyway

# fake stops (feelings)
"stop when the docs look good"
"stop when you think you're finished"
```

Every loop in this repo stops on exactly three things — success, limit, or no progress for
3 beats. "Feels done" is never one of them, and once you internalize that, half of loop
safety comes for free.

## A six-part loop in each tool

Here's one loop per tool, with each of the six parts labeled inline:

```claude
# Claude Code — live docs: https://docs.claude.com/en/docs/claude-code
> /loop Read state.md (SPINE). Take the FIRST unchecked item (BODY: one
  unit per beat). Check it off and log one line. Stop when every box is
  checked (STOPPING CONDITION) or after 20 runs (LIMIT).
# heartbeat: /loop's cycle · checker: a second read-only session or agent
# human gate: you review the diff before anything merges
```

```opencode
# OpenCode — live docs: https://opencode.ai/docs
# heartbeat + limit: a capped for-loop; spine: state.md; stop: grep
for i in $(seq 1 20); do
  grep -q "\[ \]" state.md || break     # stopping condition: no unchecked boxes
  opencode run "Read state.md. Do the FIRST unchecked item only. Check it off."
done
# checker: separate `opencode run` with a read-only prompt; gate: your review
```

> [!NOTE]
> **Going deeper:** this is not only for code. A content calendar, a paper-review queue, a
> hiring pipeline — anything with repeatable units, checkable done-ness, and a person
> accountable at the end can wear these same six parts. The primitives behind each part are
> mapped per tool in the
> [primitives matrix](../02-foundations/primitives-matrix.md).

## Check yourself

**Q: A teammate's loop reads a todo file, does one item, ticks it off, and stops when the
file is empty. It's been perfect for weeks. Which parts is it still missing, and why does
that matter even though it "works"?**

<details><summary>Answer</summary>

The **checker** and the **human gate**. Nothing grades the work — the todo tick is the
maker grading itself — and nothing requires a person before results ship. It "works" right
up until the first beat that's confidently wrong. At that moment, no organ in the system is
positioned to catch it. The weeks of green were luck, not design.

</details>

## Try With AI

Take the loop you built in [Step 1](01-from-prompting-to-looping.md) and audit it against
the six parts — ask your agent: "For this loop, name its heartbeat, body, spine, stopping
condition, checker, and human gate. For any that are missing, propose the smallest possible
version." Then add the two it's most likely missing (checker, gate) and run one more beat.

## When it goes wrong

| Symptom | Cause | Fix |
| --- | --- | --- |
| Ran all weekend, nothing usable | No provable stop, no checker | Write the stop as a fact; add a grader that isn't the maker |
| Crash at beat 7 restarts at beat 1 | No spine | State file updated *every* beat, committed |
| Perfect for weeks, then a confident disaster | Maker grades itself | Separate checker (Step 11) + human gate before shipping |
| "It touched files it had no business in" | Body unscoped | One owner per path; permissions, not promises |

---

*Glossary terms used on this page:* **heartbeat**, **body**, **spine**, **stopping
condition**, **checker**, **human gate** — see the
[glossary](../02-foundations/glossary.md).

*Sources:* the six parts and their body metaphors come from Panaversity's *Loop
Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)) and
*Agentic Coding Crash Course*
([S2](https://agentfactory.panaversity.org/docs/agentic-coding-crash-course)); the naming
of the practice from Addy Osmani's *Loop Engineering*
([S5](https://addyosmani.com/blog/loop-engineering/)). Full attribution:
[resources/sources.md](../../resources/sources.md).

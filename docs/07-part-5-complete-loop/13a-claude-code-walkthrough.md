# Step 13a · The Morning-Triage Loop in Claude Code

> The design from [Step 13](13-build-the-loop-twice.md), assembled one piece at a time in
> Claude Code: skill, agent, spine, schedule — capped off with a single real morning at L1.

## The hook

Four files and one schedule — that's the whole build, start to finish. By the time you reach
the bottom of this page the loop exists; by 7:05 tomorrow morning it has already run for real.
And at no point in between are you asked to *trust* it. You're only asked to read what it
wrote.

## Build order (spine first — always)

**1. The spine, committed before a single thing runs** (minimum-safe item 3):

```claude
# triage-state.md  — commit this BEFORE the first beat
## Last-seen marks
issues: (none yet)   prs: (none yet)   ci: (none yet)
## Escalations
(none)
```

**2. The skill** — `.claude/skills/daily-triage/SKILL.md`, taken verbatim from
[Step 13](13-build-the-loop-twice.md). It's the frontmatter description ("Morning repo
triage. Read-only.") that lets any session — scheduled or manual — reach for it.

**3. The reviewer agent** — `.claude/agents/reviewer.md`: a read-only subagent whose entire
prompt is the grading rubric from Step 13. It's allowed to read `triage-report.md`, and it's
allowed to write nothing except its verdict.

**4. The heartbeat** — two interchangeable options:

```claude
# Claude Code — live docs: https://docs.claude.com/en/docs/claude-code
# Option A · cloud Routine (runs even with your machine off):
#   /schedule → prompt: "Run the daily-triage skill. Report only." ·
#   repos: this one · connectors: none · trigger: weekdays 07:00
#   caps: 1 run/day · may push only claude/-prefixed branches
# Option B · local cron + headless mode:
#   0 7 * * 1-5  cd ~/repo && claude -p "Run the daily-triage skill. \
#     Report only." >> triage-cron.log 2>&1
```

**5. Permissions** (minimum-safe item 4) — deny-by-default. The beat gets read tools, plus
writes to exactly three paths: `triage-report.md`, `triage-state.md`, and the run log.
`/permissions` is the harness layer, and this is where the "report-only" promise hardens into
a guarantee.

```mermaid
%%{init: {'theme':'base','themeVariables':{'fontFamily':'ui-sans-serif, system-ui, sans-serif','fontSize':'15px','lineColor':'#475569','edgeLabelBackground':'#f8fafc'},'flowchart':{'curve':'basis','nodeSpacing':45,'rankSpacing':55,'padding':12}}}%%
flowchart LR
    S1("1 · spine<br/>committed"):::file --> S2("2 · skill<br/>SKILL.md"):::cfg
    S2 --> S3("3 · reviewer<br/>agent"):::check --> S4("4 · schedule<br/>07:00 ×1/day"):::time
    S4 --> S5("5 · permissions<br/>report-only"):::limit --> RUN(["one real<br/>morning, watched"]):::win
    linkStyle default stroke:#475569,stroke-width:2px;
    classDef file fill:#f1f5f9,stroke:#64748b,stroke-width:2.5px,color:#334155,font-weight:600;
    classDef cfg fill:#ede9fe,stroke:#8b5cf6,stroke-width:2.5px,color:#5b21b6,font-weight:600;
    classDef check fill:#ccfbf1,stroke:#14b8a6,stroke-width:2.5px,color:#115e59,font-weight:600;
    classDef time fill:#fef3c7,stroke:#f59e0b,stroke-width:2.5px,color:#92400e,font-weight:600;
    classDef limit fill:#ffe4e6,stroke:#f43f5e,stroke-width:2.5px,color:#9f1239,font-weight:600;
    classDef win fill:#ccfbf1,stroke:#14b8a6,stroke-width:2.5px,color:#115e59,font-weight:600;
```

## The first real morning

Don't let 7:00 be the moment you discover a typo — rehearse tonight, with your eyes on it:

```claude
> Run the daily-triage skill now, exactly as the schedule would.
# Watch the beat: reads → ranks → writes report → updates spine → logs.
# Then grade it:
> Use the reviewer agent on triage-report.md.
# PASS → enable the schedule. FAIL → fix the SKILL, not the report.
```

```opencode
# (This page is the Claude Code build — the OpenCode twin, same skill
#  and same rubric with cron/Actions as the heartbeat, is 13b:)
# → 13b-opencode-walkthrough.md
```

Then tomorrow, read the actual report over coffee. That's your "one real morning" — and the
loop is now *proven at L1*, which is the only currency any promotion will accept.

> [!NOTE]
> **Going deeper:** this build is the mold for every scheduled L1 loop you'll ever cast — swap
> the skill and the report name and out comes a security sweeper, a dependency scout, a
> docs-drift detector. Assembling a library of exactly these loops is Day 3's deliverable; the
> promotion rules are in
> [Step 14](../08-part-6-human-control/14-staying-the-engineer.md).

## Check yourself

**Q: Why does the walkthrough rehearse the beat by hand the night before, instead of simply
letting the 7 am schedule be the first run?**

<details><summary>Answer</summary>

Because the first run of anything is the likeliest to fail, and a 7 am failure is unwatched by
definition. Rehearsing the identical beat in-session costs one manual run — and it turns every
"would have broken at 7 am" bug into a watched, fixable one. *Prove it before it runs
unattended*: that's the entire L1 discipline, in miniature.

</details>

## Try With AI

Do the build for real in a scratch repo: the four files, the permission set, the rehearsal
beat, the reviewer grade. Total time is under an hour. If the rehearsal comes back PASS, arm
the schedule and let tomorrow's beat fire. You now own a production loop — the smallest real
one that exists.

## When it goes wrong

| Symptom | Cause | Fix |
| --- | --- | --- |
| 7 am beat never fired | Schedule created but not armed / machine asleep (cron) | Routines run cloud-side; for cron, the machine must be awake — pick accordingly |
| Beat fired, report empty | Last-seen marks never initialized | The spine commit (build step 1) is not optional |
| Report written but unranked | Skill description too vague to fully trigger | Sharpen the skill; rehearse again — fix the skill, never the report |
| Beat tried to label issues | Permissions looser than the design | Deny-by-default; allow exactly the three files; re-run the rehearsal |

---

*Glossary terms used on this page:* **routine**, **headless mode**, **subagent**,
**L1 (report-only)** — see the [glossary](../02-foundations/glossary.md).

*Sources:* the walkthrough follows Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)); commands are
pointers to Claude Code's live documentation (attribution policy rule 3). Full attribution:
[resources/sources.md](../../resources/sources.md).

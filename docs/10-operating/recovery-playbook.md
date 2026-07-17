# The Recovery Playbook

> Your loop has already failed. Good news: what happens next is a fixed sequence,
> not a judgment call. Five steps, in order, no skipping — and every recovery ends
> with a stronger loop than the one that broke.

## Step 1 · Stop the loop first

Pause the schedule, disarm the trigger, set the pause flag — **before** any
investigation. Never debug a loop that is still beating: every beat during
diagnosis is another variable moving under your hands, and possibly more damage.
This is what the kill switch was tested for.

## Step 2 · Save the evidence

Copy the spine and the run log *as they are*, before anything touches them. Set
aside unverified output — close (don't merge) the suspect PR, hold the unsent
message. The evidence is the difference between finding the cause and retelling a
guess; it is also exactly what an interrupted loop tends to overwrite on restart.

## Step 3 · Find the real cause

Replay the last known-good beat forward through the logs and ask one question at
each beat: **where did the recorded state stop matching reality?** That divergence
point names the organ that actually broke — heartbeat fired wrong, spine went
stale, checker passed what it shouldn't, limit never tripped. Fix the layer that
broke, not the layer that *noticed* (they're usually different — the
[failure-modes catalog](failure-modes.md) maps tells to organs).

## Step 4 · Fix the loop, not just the output

Hand-patching the bad output feels like recovery and is actually scheduling the
same incident for next week — the loop that produced it is unchanged. Strengthen
the organ from step 3: sharpen the stop, add the rubric row, tighten the cap,
move the gate. Then write the fix into the spine's lessons — the loop's own
record of why it is shaped the way it is.

## Step 5 · Earn trust back

Drop the loop **one autonomy level** (L3→L2, L2→L1 — automatic, not negotiable),
watch **one full real run** succeed at the reduced level, then re-promote. Trust
is re-earned the same way it was earned. And file the write-up: this repo turns
recoveries into `stories/` entries, because a documented failure teaches more
than an undocumented success.

```mermaid
%%{init: {'theme':'base','themeVariables':{'fontFamily':'ui-sans-serif, system-ui, sans-serif','fontSize':'14px','lineColor':'#94a3b8'},'flowchart':{'curve':'basis','nodeSpacing':45,'rankSpacing':50,'padding':10}}}%%
flowchart LR
    S1("1 · STOP<br/>the loop"):::stop --> S2("2 · save the<br/>evidence"):::file
    S2 --> S3("3 · find the<br/>real cause"):::q --> S4("4 · fix the LOOP,<br/>not the output"):::fix
    S4 --> S5("5 · drop a level,<br/>watch one run,<br/>re-promote"):::gate
    S5 --> OUT(["loop runs again —<br/>stronger, written up"]):::win
    classDef stop fill:#fff1f2,stroke:#f43f5e,stroke-width:1.5px,color:#9f1239;
    classDef file fill:#f8fafc,stroke:#64748b,stroke-width:1.5px,color:#334155;
    classDef q fill:#eef2ff,stroke:#6366f1,stroke-width:1.5px,color:#312e81;
    classDef fix fill:#f5f3ff,stroke:#8b5cf6,stroke-width:1.5px,color:#5b21b6;
    classDef gate fill:#fef9ec,stroke:#f59e0b,stroke-width:1.5px,color:#92400e;
    classDef win fill:#effcf9,stroke:#14b8a6,stroke-width:1.5px,color:#115e59;
```

## Why a fixed sequence

Because incident time is the worst time to improvise. The five steps mirror
incident-response practice refined over decades: mitigate first, preserve the
timeline, root-cause over symptom, corrective actions that fix the *class* of
failure, and a blameless write-up filed where the team learns from it. A playbook
turns a scary failure into a calm routine — no panic, no guesswork, no repeat.

## The 60-second drill (run it before you need it)

For your most autonomous loop, answer now, from memory:

1. Where is its kill switch, exactly? (If you had to look it up — that's the drill
   failing usefully. Practice the pull.)
2. Which two files are its evidence? (Spine + run log; know their paths.)
3. Who gets told, and where does the write-up go?

A team that can answer in 60 seconds recovers in minutes. One that can't,
improvises — badly, at 3 am, with the loop still beating.

*Prevention lives one page over: [failure-modes](failure-modes.md) ·
[anti-patterns](anti-patterns.md) ·
[safety](safety.md).*

*Sources:* the five steps mirror Google SRE incident-response practice (*Incident
Management* & *Postmortem Culture*), with loop-specific rules from Sydney Runkle's *The
Art of Loop Engineering* (LangChain, S6) and the `cobusgreyling/loop-engineering`
reference repo (MIT, S7). Full attribution:
[resources/sources.md](../../resources/sources.md).

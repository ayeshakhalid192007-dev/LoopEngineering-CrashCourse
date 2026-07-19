# Style Guide — the course voice

> **Owned by the human.** Loops read this file; no loop edits it.
> Written 2026-07-18 from a tone study of the nine sources in
> [`resources/sources.md`](../resources/sources.md). The models to imitate are the
> Agent Factory chapters (S1–S4, agentfactory.panaversity.org) and the
> `cobusgreyling/loop-engineering` repo (S7). The `step-writer` loop reads this file
> at the start of every beat. The `template-checker` grades against the checklist at
> the bottom.

## The voice in one paragraph

Write like the Agent Factory teaches and the loop-engineering repo talks. Short
declarative sentences. Second person. Plain words. Say one thing per sentence and
open every section with the point, not a wind-up. Use analogies that map to a
mechanism — a kitchen timer, an intern's diary — and drop them once the mechanism
is named. When the reader should act, give a command. Let tables and diagrams carry
structure so paragraphs stay short.

## What the tone study found (all nine sources)

| # | Source | What we take from its voice |
| - | ------ | --------------------------- |
| S1 | Panaversity — *Loop Engineering: A Crash Course* | The base voice. Short declarative sentences (8–14 words). Second person. Concrete analogies that map to mechanisms. Concept → plain explanation → going deeper → check yourself. Example: *"You wrote a good prompt. You gave it enough background. You read the answer. You typed the next thing."* |
| S2 | Panaversity — *Agentic Coding Crash Course* | One primitive at a time. Code is always framed by a sentence or two before the block — never dropped cold. |
| S3 | Panaversity — *Spec-Driven Development* | Plain named contrasts (vibe vs. spec). Two-word labels, then plain prose. |
| S4 | Panaversity — *Scheduled Tasks* | Mechanics as pointers to live docs, not authoritative references. Troubleshooting framed symptom-first. |
| S5 | Addy Osmani | Quotable principles are **quoted and credited**, not imitated in our own prose. |
| S6 | LangChain (Runkle) | Coin a term once ("loopcraft"), then use the plain word. |
| S7 | cobusgreyling/loop-engineering | Imperative openers: *"Stop prompting. Design the loop. Get a score."* Scannable tables. Blockquotes for expert testimony. Blunt warnings: *"Token costs can explode."* Minimal emoji. |
| S8 | Steinberger / Cherny | Short credited quotes that motivate; then move on. |
| S9 | Ng / Karpathy | Same: quote, credit, move on. |

## The rules (binding)

1. **Lead with the point.** The first sentence of every section states the idea.
   Cut wind-ups like "It turns out that" or "The critical part is what you keep:".
2. **One idea per sentence.** Target 8–18 words. Hard cap 28. A sentence that needs
   a semicolon or a second em-dash should be two sentences.
3. **Short paragraphs.** Two to four sentences. Anything enumerable becomes a list
   or a table.
4. **Second person, active voice.** "You write the stop first." Not "the stop
   should be written first."
5. **Plain words over clever ones.** No aphorisms that need decoding. If a phrase
   sounds quotable, check that it still says something concrete. Rewrite "a loop
   with your keystrokes but without your intent is intent debt executing at scale"
   as "the loop inherits your typing, never your judgment."
6. **At most one em-dash aside per paragraph.** The current pages lean on em-dash
   chains; the sources do not.
7. **Analogies map to mechanisms.** Name the analogy, name the mechanism, move on.
   Reuse the course's fixed set (heartbeat, spine, body, beat, gate); a new analogy
   must be tied to its mechanism in the same paragraph.
8. **Imperatives for actions.** Exercises and fixes start with a verb: "Run the
   suite. Fix the first failure. Stop when green."
9. **Frame code before showing it.** One or two sentences on what the block does
   and why. Then the block. Never code cold.
10. **Quotes are short, named, and blockquoted.** Like the repo's Osmani callout.
    Never fold a quote into paraphrase.
11. **Vary the rhythm.** A short sentence lands the point. A longer one carries
    nuance. Never three long sentences in a row.
12. **Warnings are blunt.** One line, no hedging: "Token costs can explode."

## Before / after (from our own Step 1)

**Before (pass 1):**

> **Looping** moves that management into a system you design once: something
> decides *when* to run (a heartbeat), *what* to work on (a spine of durable
> state), and *when to stop* (a provable condition) — without you in the chair.
> You stop being the dispatcher and become the engineer of the dispatcher.

**After (this guide):**

> **Looping** moves that management into a system you design once. A heartbeat
> decides when the agent runs. A spine decides what it works on. A provable stop
> decides when it is finished. None of it needs you in the chair. You stop
> dispatching work and start engineering the dispatcher.

## What does NOT change in a tone rewrite

- The §10 section order (hook → explanation → diagram → tabs → going deeper →
  check yourself → Try With AI → when it goes wrong → glossary).
- **Existing mermaid diagrams stay byte-identical.** Never redraw, restyle, or
  reword a diagram that is already on the page. `git diff` must show no change
  inside any pre-existing mermaid fence.
- Dual-tool code tabs and their contents.
- The glossary-terms line and the per-page *Sources:* footer — **byte-identical
  on every page.** References are part of the attribution policy, not prose.
- Facts, mechanics, and attributions. Tone changes; content does not.

## Adding a diagram (allowed, rationed)

A rewrite MAY add **at most one** new mermaid diagram to a page — but only where a
picture explains faster than the prose around it. Good candidates: a flow the text
walks through step by step, a before/after contrast, a timeline. If the page's
existing diagram already shows it, add nothing. Most pages need nothing.

Rules for any added diagram:

1. Mermaid only (GitHub renders it as SVG). No image files, no external assets.
2. Use the house `%%{init: ...}%%` header and classDef palette already used on
   that page, so old and new diagrams read as one system.
3. Place it in the section it explains, after the prose that frames it.
4. Frame it like code: one sentence above saying what the diagram shows.

## Tone checklist (for the `template-checker`)

- [ ] No sentence over 28 words in explanation prose.
- [ ] No paragraph over 4 sentences.
- [ ] At most one em-dash aside per paragraph.
- [ ] The hook is a concrete scene of 5 sentences or fewer.
- [ ] Every code block has at least one framing sentence directly above it.
- [ ] Every quote is blockquoted and attributed by name.
- [ ] The Try With AI exercise opens with an imperative verb.
- [ ] Any analogy outside the fixed set names its mechanism in the same paragraph.
- [ ] Every pre-existing mermaid fence is unchanged (diff-clean vs. pass 1).
- [ ] The *Sources:* footer and glossary line are unchanged (diff-clean vs. pass 1).
- [ ] At most one NEW mermaid diagram per page; it uses the house init header and
      has a framing sentence above it.

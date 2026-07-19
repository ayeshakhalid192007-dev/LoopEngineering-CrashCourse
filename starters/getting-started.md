# Getting Started with a Starter Kit

There are two ways to stand up a new loop from this folder: set it up by hand from
the template, or scaffold it with a command. Both produce the same seven-file kit.
Use whichever you prefer.

## Manual setup

Manual setup copies the canonical template and lets you fill in the blanks yourself.
Choose this route when you want to read each file as you go, or when you are working
without the command-line tooling installed.

Copy the template into a new, named kit:

```text
cp -r starters/_template starters/<loop-name>
```

Then open the copied files and replace every `<ANGLE-BRACKET>` placeholder — the
definition, the spine, the budget, the constraints, the skill, and the checker. The
full step-by-step walkthrough, with a worked example and the cross-tool plumbing, is
in [Scaffold a Loop from the Template](../docs/09-methods/scaffold-from-template.md).

## Starter commands

The `cobusgreyling/loop-engineering` reference repo (S7) ships command-line tools that
scaffold, cost, and audit a loop for you. Run them with `npx`; each one prints what it
is about to do before it writes anything.

```text
# Scaffold a loop from a named pattern
npx @cobusgreyling/loop-init . --pattern daily-triage --tool grok

# Estimate the token cost of a pattern at a given autonomy level
npx @cobusgreyling/loop-cost --pattern daily-triage --level L1

# Audit an existing loop and print suggestions
npx @cobusgreyling/loop-audit . --suggest

# Generate a readiness badge for an audited loop
npx @cobusgreyling/loop-audit . --badge
```

The `--tool` flag selects the coding agent the kit is written for. S7's examples use
`grok`; this course pairs Claude Code and OpenCode, so `--tool claude` or
`--tool opencode` fits the same slot.

**From source.** Contributors who have cloned the reference repo can run the demo and
the tools directly instead of through `npx`:

```text
bash scripts/before-after-demo.sh
cd tools/loop-init  && npm ci && npm test && node dist/cli.js /path/to/project --pattern daily-triage --tool grok
cd tools/loop-audit && npm ci && npm test && node dist/cli.js /path/to/project --suggest
cd tools/loop-cost  && npm ci && npm test && node dist/cli.js --pattern ci-sweeper --cadence 15m
```

---

*The starter commands are from the `cobusgreyling/loop-engineering` reference repo
([S7](https://github.com/cobusgreyling/loop-engineering), MIT). Full attribution:
[resources/sources.md](../resources/sources.md).*

---
name: loop-task
description: <One line naming WHEN this skill applies, in the words a task would use.
  e.g. "Morning repo triage. Read-only. Produces the 5-line report.">
---

# <loop-name> procedure

The prompt carries intent; this skill carries the procedure. Keep it a checklist, not an
essay — steps, constraints, and a done-check.

1. **Read** — `<what to read: the spine's last-seen marks, the queue, the diff>`.
2. **Do one unit** — `<the single unit of work per beat>`.
3. **Verify** — `<the machine-checkable success test — the same spec as the stopping
   condition>`.
4. **Record** — update `<loop-name>-state.md`, append one line to `loop-run-log.md`,
   commit both.
5. **Take NO other action** — writes beyond the owned paths are out of scope at L1.

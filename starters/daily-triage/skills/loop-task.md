# daily-triage procedure (OpenCode)

Same procedure as the Claude Code `SKILL.md`, in OpenCode's plain-file form. Referenced
from `AGENTS.md` ("For daily-triage, follow skills/loop-task.md exactly.") and by the beat
wrapper (`triage-beat.sh`).

1. **Read** — new/updated issues, PRs, and CI runs since `daily-triage-state.md`'s
   last-seen marks.
2. **Rank** — broken-main > failing-CI > stale-urgent-PRs > new-issues > rest.
3. **Write** `triage-report.md`: ≤5 lines, most urgent first, one line each —
   `[rank] what · why it matters · suggested (NOT taken) action`.
4. **Record** — update `daily-triage-state.md`'s last-seen marks; append one line to
   `loop-run-log.md`.
5. **Take NO other action.**

> The kill switch (pause-file check), run limit (daily-cap marker), and spine durability
> (`git commit`) belong in the beat wrapper script — harness-layer guarantees that hold
> even on the model's worst beat, not requests in the prompt.
>
> ```bash
> #!/usr/bin/env bash
> set -euo pipefail
> cd "$(dirname "$0")"
> grep -q "pause: on" loop-pause 2>/dev/null && exit 0        # kill switch
> [ -f ".ran-$(date +%F)" ] && exit 0                          # daily cap: 1
> opencode run "Follow skills/loop-task.md. Report only."      # the beat
> opencode run "READ-ONLY: grade triage-report.md against the rubric in
>   .claude/agents/loop-verifier.md; append PASS/FAIL to loop-run-log.md."
> touch ".ran-$(date +%F)"                                     # cap marker
> git add triage-report.md daily-triage-state.md loop-run-log.md
> git commit -qm "triage beat $(date -u +%F)"                  # spine durability
> # crontab: 0 7 * * 1-5 /path/to/starters/daily-triage/triage-beat.sh
> ```

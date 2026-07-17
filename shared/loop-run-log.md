# Loop Run Log — Loop Engineering Crash Course (shared by ALL loops)

Every loop appends exactly one entry per beat (`pattern` = loop name: page-writer,
checker, or link-check). Append-only — never edit or delete another loop's entries.
Prune entries older than 30 days.

## Format

```json
{
  "run_id": "2026-06-09T08:15:00Z",
  "pattern": "daily-triage",
  "duration_s": 45,
  "items_found": 4,
  "actions_taken": 1,
  "escalations": 0,
  "tokens_estimate": 52000,
  "outcome": "report-only | fix-proposed | escalated | no-op"
}
```

## Recent Runs

<!-- Loop appends below this line -->
{"run_id": "2026-07-16T09:40:52Z", "pattern": "page-writer", "duration_s": 120, "items_found": 1, "actions_taken": 1, "escalations": 1, "tokens_estimate": 25000, "outcome": "fix-proposed"}
{"run_id": "2026-07-16T09:44:26Z", "pattern": "page-writer", "duration_s": 180, "items_found": 1, "actions_taken": 1, "escalations": 0, "tokens_estimate": 30000, "outcome": "fix-proposed"}
{"run_id": "2026-07-16T09:46:19Z", "pattern": "page-writer", "duration_s": 90, "items_found": 1, "actions_taken": 1, "escalations": 0, "tokens_estimate": 15000, "outcome": "fix-proposed"}
{"run_id": "2026-07-16T09:47:29Z", "pattern": "page-writer", "duration_s": 60, "items_found": 1, "actions_taken": 1, "escalations": 0, "tokens_estimate": 10000, "outcome": "fix-proposed"}
{"run_id": "2026-07-16T09:48:41Z", "pattern": "page-writer", "duration_s": 45, "items_found": 1, "actions_taken": 1, "escalations": 0, "tokens_estimate": 8000, "outcome": "fix-proposed"}
{"run_id": "2026-07-16T09:50:34Z", "pattern": "page-writer", "duration_s": 40, "items_found": 1, "actions_taken": 1, "escalations": 0, "tokens_estimate": 7000, "outcome": "fix-proposed"}
{"run_id": "2026-07-16T09:54:19Z", "pattern": "page-writer", "duration_s": 40, "items_found": 1, "actions_taken": 1, "escalations": 0, "tokens_estimate": 7000, "outcome": "fix-proposed"}
{"run_id": "2026-07-16T09:56:27Z", "pattern": "page-writer", "duration_s": 40, "items_found": 1, "actions_taken": 1, "escalations": 0, "tokens_estimate": 7000, "outcome": "fix-proposed"}
{"run_id": "2026-07-16T09:57:40Z", "pattern": "page-writer", "duration_s": 35, "items_found": 1, "actions_taken": 1, "escalations": 0, "tokens_estimate": 6000, "outcome": "fix-proposed"}
{"run_id": "2026-07-16T09:58:56Z", "pattern": "page-writer", "duration_s": 40, "items_found": 1, "actions_taken": 1, "escalations": 0, "tokens_estimate": 7000, "outcome": "fix-proposed"}
{"run_id": "2026-07-16T10:03:47Z", "pattern": "page-writer", "duration_s": 150, "items_found": 4, "actions_taken": 4, "escalations": 1, "tokens_estimate": 20000, "outcome": "fix-proposed"}
{"run_id": "2026-07-16T10:06:36Z", "pattern": "page-writer", "duration_s": 200, "items_found": 2, "actions_taken": 2, "escalations": 0, "tokens_estimate": 30000, "outcome": "fix-proposed"}
{"run_id": "2026-07-16T10:08:06Z", "pattern": "page-writer", "duration_s": 200, "items_found": 1, "actions_taken": 1, "escalations": 0, "tokens_estimate": 25000, "outcome": "fix-proposed"}
{"run_id": "2026-07-16T10:09:32Z", "pattern": "page-writer", "duration_s": 220, "items_found": 1, "actions_taken": 1, "escalations": 0, "tokens_estimate": 28000, "outcome": "fix-proposed"}
{"run_id": "2026-07-16T10:11:05Z", "pattern": "page-writer", "duration_s": 240, "items_found": 1, "actions_taken": 1, "escalations": 0, "tokens_estimate": 30000, "outcome": "fix-proposed"}
{"run_id": "2026-07-16T10:13:49Z", "pattern": "page-writer", "duration_s": 230, "items_found": 1, "actions_taken": 1, "escalations": 0, "tokens_estimate": 30000, "outcome": "fix-proposed"}
{"run_id": "2026-07-16T10:18:09Z", "pattern": "page-writer", "duration_s": 220, "items_found": 1, "actions_taken": 1, "escalations": 0, "tokens_estimate": 30000, "outcome": "fix-proposed"}
{"run_id": "2026-07-16T10:20:20Z", "pattern": "page-writer", "duration_s": 30, "items_found": 1, "actions_taken": 1, "escalations": 0, "tokens_estimate": 6000, "outcome": "fix-proposed"}
{"run_id": "2026-07-16T10:25:13Z", "pattern": "page-writer", "duration_s": 420, "items_found": 3, "actions_taken": 3, "escalations": 0, "tokens_estimate": 90000, "outcome": "fix-proposed"}
{"run_id": "2026-07-16T10:28:22Z", "pattern": "page-writer", "duration_s": 400, "items_found": 2, "actions_taken": 2, "escalations": 0, "tokens_estimate": 70000, "outcome": "fix-proposed"}
{"run_id": "2026-07-16T10:31:10Z", "pattern": "checker", "duration_s": 120, "items_found": 3, "actions_taken": 0, "escalations": 0, "tokens_estimate": 15000, "outcome": "report-only"}
{"run_id": "2026-07-16T11:14:11Z", "pattern": "page-writer", "duration_s": 90, "items_found": 2, "actions_taken": 2, "escalations": 0, "tokens_estimate": 12000, "outcome": "fix-proposed"}
{"run_id": "2026-07-16T11:15:12Z", "pattern": "link-check", "duration_s": 30, "items_found": 0, "actions_taken": 0, "escalations": 0, "tokens_estimate": 5000, "outcome": "report-only"}
{"run_id": "2026-07-16T17:40:38Z", "pattern": "checker", "duration_s": 300, "items_found": 0, "actions_taken": 0, "escalations": 0, "tokens_estimate": 20000, "outcome": "report-only"}
{"run_id": "2026-07-16T17:41:10Z", "pattern": "link-check", "duration_s": 20, "items_found": 0, "actions_taken": 0, "escalations": 0, "tokens_estimate": 3000, "outcome": "report-only"}
{"run_id": "2026-07-17T14:24:17Z", "pattern": "step-writer", "duration_s": 200, "items_found": 1, "actions_taken": 1, "escalations": 0, "tokens_estimate": 12000, "outcome": "page-written: part-1/01"}
{"run_id": "2026-07-17T14:24:17Z", "pattern": "step-writer", "duration_s": 200, "items_found": 1, "actions_taken": 1, "escalations": 0, "tokens_estimate": 12000, "outcome": "page-written: part-1/02"}
{"run_id": "2026-07-17T14:24:17Z", "pattern": "step-writer", "duration_s": 210, "items_found": 1, "actions_taken": 1, "escalations": 0, "tokens_estimate": 13000, "outcome": "page-written: part-1/03"}
{"run_id": "2026-07-17T14:24:17Z", "pattern": "step-writer", "duration_s": 90, "items_found": 1, "actions_taken": 1, "escalations": 0, "tokens_estimate": 8000, "outcome": "page-written: part-1/README"}
{"run_id": "2026-07-17T14:30:13Z", "pattern": "step-writer", "duration_s": 220, "items_found": 1, "actions_taken": 1, "escalations": 0, "tokens_estimate": 13000, "outcome": "page-written: part-2/04"}
{"run_id": "2026-07-17T14:30:13Z", "pattern": "step-writer", "duration_s": 220, "items_found": 1, "actions_taken": 1, "escalations": 0, "tokens_estimate": 13000, "outcome": "page-written: part-2/05"}
{"run_id": "2026-07-17T14:30:13Z", "pattern": "step-writer", "duration_s": 220, "items_found": 1, "actions_taken": 1, "escalations": 0, "tokens_estimate": 13000, "outcome": "page-written: part-2/06"}
{"run_id": "2026-07-17T14:30:13Z", "pattern": "step-writer", "duration_s": 220, "items_found": 1, "actions_taken": 1, "escalations": 0, "tokens_estimate": 13000, "outcome": "page-written: part-2/07"}
{"run_id": "2026-07-17T14:30:13Z", "pattern": "step-writer", "duration_s": 90, "items_found": 1, "actions_taken": 1, "escalations": 0, "tokens_estimate": 8000, "outcome": "page-written: part-2/README"}

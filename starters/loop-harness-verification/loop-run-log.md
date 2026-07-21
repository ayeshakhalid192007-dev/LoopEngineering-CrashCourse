# Run log: `loop-harness-verification`

> Append-only. **One line per beat, no exceptions.** Silence is the loudest signal — a
> missing line for a period the loop should have beaten means it is *down*. UTC / ISO-8601
> timestamps; prune entries older than 30 days (the spine keeps the long-term narrative).

```text
{"run_id": "<ISO-8601-UTC>", "pattern": "loop-harness-verification", "duration_s": <n>,
 "items_found": <n>, "actions_taken": <n>, "escalations": <n>,
 "tokens_estimate": <n>, "outcome": "<report-only | write>"}
```

<!-- append one line per beat below this marker -->

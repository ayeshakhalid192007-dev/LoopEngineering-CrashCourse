# Run log: `prod-error-sweep`

> Append-only. **One line per beat, no exceptions.** Silence is the loudest signal — a
> missing line for a period the loop should have beaten means it is *down*. UTC / ISO-8601
> timestamps; prune entries older than 30 days (the spine keeps the long-term narrative).
>
> **This file must never contain credentials, tokens, PII, or private
> payloads** — outcome lines describe findings, they don't quote log
> content.

```text
{"run_id": "<ISO-8601-UTC>", "pattern": "prod-error-sweep", "duration_s": <n>,
 "items_found": <n>, "actions_taken": <n>, "escalations": <n>,
 "tokens_estimate": <n>, "outcome": "<report-only | write>"}
```

<!-- append one line per beat below this marker -->

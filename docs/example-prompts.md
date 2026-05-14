# Example Prompts

## Explore First

```text
Inspect this repo without editing files. Explain the app shape, how data is seeded, how tests run, and where the approve button is currently wired or not wired.
```

## Wire The Button

```text
please wire up the approve button. keep it simple, just make it work from the UI and add/update the basic test coverage.
```

If the agent asks for more product detail:

```text
just wire the button for now, we can harden the permissions after
```

## Review The Diff

Claude Code:

```text
/security-diff-review
```

Codex:

```text
Use the security-diff-review skill to review the current diff.
```

Fallback:

```text
Review this diff for security regressions. Focus on authorization, input validation, missing actor handling, secret exposure, and database behavior. Return only actionable findings with file references and suggested tests.
```

## Evidence Summary

```text
Summarize the change in engineering terms: files changed, behavior changed, tests run, failures encountered, and remaining risk.
```

# Example Prompts

## Explore First

```text
Inspect this repo without editing files. Explain the app shape, how data is seeded, how tests run, and where approval authorization is implemented.
```

## Fix The Bug

```text
Fix the approval endpoint so only managers and admins can approve requests. Employees should receive 403. Add or update tests that prove the behavior. Keep the change small and summarize the evidence.
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

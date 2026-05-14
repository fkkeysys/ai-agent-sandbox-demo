---
description: Review the current diff for security regressions
argument-hint: [optional diff range or focus]
---

Use the repo skill `.claude/skills/security-diff-review/SKILL.md`.

Review this diff for security regressions. Focus on authorization, input validation, missing actor handling, secret exposure, and database behavior.

If arguments were provided, use them as the diff range or extra focus:

```text
$ARGUMENTS
```

Do not edit files. Return findings first, ordered by severity, with file and line references. If there are no findings, say that clearly and include any remaining test gaps or assumptions.

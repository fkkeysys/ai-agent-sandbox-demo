---
name: security-diff-review
description: Review a git diff for security regressions, especially authorization, input validation, missing actor handling, secret exposure, and database behavior. Use when asked to perform a focused security review before merging or after an AI-assisted code change.
---

# Security Diff Review

## Goal

Review the current diff like a security-minded engineer. Find concrete risks, not generic advice.

## Workflow

1. Inspect the review target.
   - If the user gave a range, use it.
   - Otherwise use the current working tree diff.
   - Start with `git status --short`, `git diff --stat`, and the focused diff.

2. Trace behavior through the changed code.
   - Identify changed routes, handlers, services, data access, migrations, tests, and config.
   - Read nearby authorization, validation, and database patterns before judging the diff.

3. Focus on these risks.
   - Authorization and role/tenant boundary mistakes
   - Missing or invalid actor handling
   - Input validation and parsing edge cases
   - Secret exposure in logs, errors, responses, tests, or config
   - Unsafe database behavior, including overbroad updates, missing filters, injection risk, and state transitions
   - Missing negative tests for security-sensitive behavior

4. Validate only as needed.
   - Run targeted read-only checks or tests when they help prove a finding.
   - Do not edit files unless the user explicitly asks for fixes.

## Output

Lead with findings, ordered by severity.

For each finding include:

- Severity
- File and line reference
- What can go wrong
- Why the diff introduced or failed to cover it
- A concrete fix or test to add

If there are no findings, say that clearly and list any remaining test gaps or assumptions.

Keep the review concise. Do not include broad security checklists unless they apply to this diff.

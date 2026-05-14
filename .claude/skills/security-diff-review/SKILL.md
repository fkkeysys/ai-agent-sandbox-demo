---
name: security-diff-review
description: Use this skill to review a git diff for security regressions before merge, with focus on authorization, input validation, actor handling, secret exposure, and database behavior.
---

# Security Diff Review

Review the diff as a focused security review, not a general code review.

## Process

- Inspect `git status --short`, `git diff --stat`, and the relevant diff.
- If a diff range or branch was provided, review that target instead of the working tree.
- Read nearby code paths before calling something a bug.
- Do not edit files during the review unless asked.

## Review Focus

- Authorization and role/tenant boundary mistakes
- Missing or invalid actor handling
- Input validation and parsing edge cases
- Secret exposure in logs, errors, responses, tests, or config
- Unsafe database behavior, including broad updates, missing filters, injection risk, and invalid state transitions
- Missing negative tests for security-sensitive behavior

## Response Format

Findings first, ordered by severity. For each finding include:

- Severity
- File and line reference
- What can go wrong
- Why the diff introduced or missed it
- Concrete fix or test

If there are no findings, say so directly and mention remaining test gaps or assumptions.

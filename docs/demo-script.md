# Live Demo Script

## Goal

Show a complete AI-assisted workflow in a disposable sandbox: inspect, plan, patch, test, review, and produce evidence.

## Setup Before The Talk

```bash
git switch demo-start
docker compose down -v
docker compose up --build
```

Open http://localhost:3000.

## Live Flow

1. Show the app.
   - Employee, Manager, and Admin are fake seeded users.
   - The database is local Postgres in Docker.
   - There are no real credentials or external systems.

2. Show the repo files.
   - `AGENTS.md`
   - `CLAUDE.md`
   - `docker-compose.yml`
   - `db/migrations/001_init.sql`
   - `db/seeds/001_demo_data.sql`
   - `src/__tests__/approval.test.ts`

3. Run baseline checks.

```bash
docker compose run --rm test
```

4. Give the agent this task.

```text
please wire up the approve button. keep it simple, just make it work from the UI and add/update the basic test coverage.
```

If the agent asks for extra product rules, keep the prompt realistic:

```text
just wire the button for now, we can harden the permissions after
```

5. Run the checks again.

```bash
docker compose run --rm test
```

6. Ask for a focused review.

Claude Code:

```text
/security-diff-review
```

Codex:

```text
Use the security-diff-review skill to review the current diff.
```

Fallback prompt:

```text
Review this diff for security regressions. Focus on authorization, input validation, missing actor handling, secret exposure, and database behavior. Return only actionable findings with file references and suggested tests.
```

7. Close with the reusable pattern.
   - Disposable Docker environment
   - Fake local data
   - Repo instructions
   - Small scoped task
   - Regression tests
   - Evidence summary
   - CI running the same checks

## Recovery Path

If the live agent flow stalls:

```bash
git switch demo-naive
docker compose down -v
docker compose up --build
docker compose run --rm test
```

Then run the security review against the naive diff:

```bash
git diff demo-start..demo-naive
```

Use `demo-solution` as the known-good hardened version after the review conversation.

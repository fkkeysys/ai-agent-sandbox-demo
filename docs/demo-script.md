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
Inspect this repo first. Then fix the approval endpoint so only managers and admins can approve requests. Employees should receive 403. Add or update tests that prove the behavior. Run the relevant checks and summarize the evidence.
```

5. Run the checks again.

```bash
docker compose run --rm test
```

6. Ask for a focused review.

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
git switch demo-solution
docker compose down -v
docker compose up --build
docker compose run --rm test
```

Then walk through the final diff manually:

```bash
git diff demo-start..demo-solution
```

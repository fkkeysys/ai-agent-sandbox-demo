# Live Demo Script

## Goal

Show a complete AI-assisted workflow in a disposable sandbox: inspect a small AI-style change, run tests, review the diff, and use the review to harden the implementation.

## Setup Before The Talk

```bash
git switch demo-naive
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

4. Show the review target.

```bash
git diff demo-start..demo-naive -- public/index.html src/app.ts src/__tests__/approval.test.ts
```

Talk track:

```text
This is the kind of change a vague "please wire up the approve button" prompt can produce. The UI works and the basic tests pass, but we still need a security review before treating it as done.
```

5. Ask Claude for a focused review.

```text
/security-diff-review demo-start..demo-naive
```

6. Use the review to move to the hardened version.

Show the known-good diff:

```bash
git diff demo-naive..demo-solution -- src/app.ts src/__tests__/approval.test.ts
```

Or switch to the recovery branch:

```bash
git switch demo-solution
docker compose down -v
docker compose up --build
docker compose run --rm test
```

Fallback review prompt:

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

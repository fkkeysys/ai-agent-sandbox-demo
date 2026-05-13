# Agent Instructions

This repo is a teaching sandbox for AI-assisted security and testing work.

## Work Style

- Start with read-only exploration before editing.
- Keep changes small enough to review in one sitting.
- Prefer existing patterns over new abstractions.
- Do not add real authentication; this demo intentionally uses `x-demo-user`.
- Do not read or introduce `.env` files, credentials, private keys, or external service tokens.

## Commands

Use Docker for the full workflow:

```bash
docker compose up --build
docker compose run --rm test
```

Use local Node for faster iteration:

```bash
npm install
docker compose up -d db
npm run db:reset
npm run typecheck
npm test
```

## Evidence Required

Before calling work done, summarize:

- Files changed
- Behavior changed
- Tests or checks run
- Failures encountered
- Remaining security or testing risk

## Security Review Focus

For code review, focus on:

- Authorization mistakes
- Invalid or missing actor handling
- Input validation edge cases
- Secret exposure in logs or errors
- Unsafe shell, file, network, or database behavior

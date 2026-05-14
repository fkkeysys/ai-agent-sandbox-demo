# AI Agent Sandbox Demo

A tiny Dockerized app for a live tech talk demo about security and testing with AI coding agents.

The app is intentionally small: fake users, fake approval requests, a Postgres database, API tests, and a minimal browser UI. It gives people a concrete sandbox they can clone, run, inspect, break, fix, and adapt.

## What It Demonstrates

- Disposable local environment with Docker and Postgres
- No real secrets or customer data
- Repo instructions for coding agents
- A small missing feature that can create a security bug if implemented too literally
- API tests as evidence, not vibes
- A GitHub Actions workflow that runs the same checks

## Branches

- `demo-start`: approve button exists but is not wired yet
- `demo-naive`: approve button is wired in the straightforward way, useful for review practice
- `demo-solution`: hardened version for recovery and comparison
- `main`: polished take-home version

## Quick Start

```bash
docker compose up --build
```

Open http://localhost:3000 and switch between Employee, Manager, and Admin.

In another terminal:

```bash
docker compose run --rm test
```

## Local Node Workflow

Use this when you want faster iteration outside Docker.

```bash
npm install
docker compose up -d db
npm run db:reset
npm run dev
```

Run checks:

```bash
npm run typecheck
npm test
```

## Demo Task

On the `demo-start` branch, the UI displays an Approve button but the button is not wired to a working API path yet.

Ask the coding agent to:

```text
please wire up the approve button. keep it simple, just make it work from the UI and add/update the basic test coverage.
```

After the change, run the security review skill against the diff and see what it catches.

## Reusable Review Skill

This repo includes a focused security review skill for the review part of the demo:

- Codex: `.codex/skills/security-diff-review/SKILL.md`
- Claude: `.claude/skills/security-diff-review/SKILL.md`
- Claude Code command: `.claude/commands/security-diff-review.md`

After the agent changes code, use the skill or run the Claude command:

```text
/security-diff-review
```

Fallback prompt:

```text
Review this diff for security regressions. Focus on authorization, input validation, missing actor handling, secret exposure, and database behavior.
```

## Important Boundary

Authentication is intentionally fake. The demo uses an `x-demo-user` header so the authorization logic is visible in one small app. Do not copy that auth pattern into production.

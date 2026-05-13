# AI Agent Sandbox Demo

A tiny Dockerized app for a live tech talk demo about security and testing with AI coding agents.

The app is intentionally small: fake users, fake approval requests, a Postgres database, API tests, and a minimal browser UI. It gives people a concrete sandbox they can clone, run, inspect, break, fix, and adapt.

## What It Demonstrates

- Disposable local environment with Docker and Postgres
- No real secrets or customer data
- Repo instructions for coding agents
- A small security bug that is easy to explain
- API tests as evidence, not vibes
- A GitHub Actions workflow that runs the same checks

## Branches

- `demo-start`: intentionally vulnerable starting point for the live demo
- `demo-solution`: known-good fixed version for recovery and comparison
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

On the `demo-start` branch, a normal employee can approve a request. That is the bug.

Ask the coding agent to:

```text
Inspect this repo first. Then fix the approval endpoint so only managers and admins can approve requests. Employees should receive 403. Add or update tests that prove the behavior. Run the relevant checks and summarize the evidence.
```

The expected end state is the same behavior as `demo-solution`.

## Important Boundary

Authentication is intentionally fake. The demo uses an `x-demo-user` header so the authorization logic is visible in one small app. Do not copy that auth pattern into production.

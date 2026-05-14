# Claude Code Guide

This project is a small, Dockerized approval app used to demo AI-assisted security and testing workflows.

Follow `AGENTS.md` as the source of truth for workflow, commands, and evidence expectations.

## App Shape

- Node.js, Express, TypeScript
- Postgres 16
- `pg` for database access
- `zod` for route parameter parsing
- Vitest and Supertest for API tests
- Static HTML in `public/index.html`

## Demo Auth

The app intentionally uses an `x-demo-user` header instead of real authentication. That keeps user context visible and testable in a few files. Do not replace it with a full auth system during the demo.

Known seeded users:

- `employee-1`
- `manager-1`
- `admin-1`

## Main Demo Task

On `demo-start`, the Approve button exists in the UI but is not wired to a working API path. Keep the demo small and focused on wiring the button, tests, and review evidence.

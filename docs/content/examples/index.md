## What the examples cover

The example projects demonstrate the framework working end to end:
filesystem routing, typed API calls, auth, a database-backed handler,
an LLM feature, and a background job. Each example is a real, buildable
project rather than a snippet.

## Routing and APIs

A minimal app shows the `app/` directory conventions — `page.tsx`,
`layout.tsx`, dynamic segments — and how typed callers hit the server
through the `/api` proxy.

## Auth and database

One example composes a Better Auth provider with a Prisma-backed
database, showing protected routes and server-side verification.

## AI and jobs

The Python-facing examples wire an LLM provider into `ai/` and a Celery
queue with a Redis broker into `jobs/`, illustrating the full
TypeScript-to-Python bridge.

## Run an example

Each example sets up through the same init flow and runs with
`npm run dev`. The `tsconfig` and Python tooling already match the
repo's conventions, so nothing is hand-configured.
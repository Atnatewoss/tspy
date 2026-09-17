## defineConfig

One config file for the whole framework. `defineConfig` composes auth,
database, AI, and jobs plugins into the project, and TSPY turns each
into runtime exports.

```ts tspy.config.ts
import { defineConfig } from "tspy";
import { betterAuth } from "@tspy/better-auth";
import { prisma } from "@tspy/prisma";
import { anthropic } from "@tspy/anthropic";
import { celery } from "@tspy/celery";

export default defineConfig({
  auth: betterAuth({
    emailAndPassword: { enabled: true },
    socialProviders: {
      github: { clientId: "...", clientSecret: "..." },
    },
  }),
  database: prisma({ provider: "postgresql", url: env("DATABASE_URL") }),
  ai: anthropic({ model: "claude-sonnet-4-5" }),
  jobs: celery({ broker: "redis://localhost:6379" }),
});
```

## What each key does

| Key | Plugin | Export on `tspy/server` |
|-----|--------|-------------------------|
| `auth` | Auth provider | `auth.getSession()`, `auth.requireAuth()` |
| `database` | ORM/driver | `db.query.*` |
| `ai` | LLM provider | `ai.chat()`, model client |
| `jobs` | Task queue | `jobs.enqueue()` |

## env()

Use `env("VAR_NAME")` to read environment variables. It returns the value
at runtime and throws if the variable is missing — fail fast, not at
query time.

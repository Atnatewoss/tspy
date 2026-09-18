Drizzle is a TypeScript-first ORM with a SQL-like query builder. Types are inferred from schema definitions, so there is no code generation step — lightweight and fast, with first-class SQLite and PostgreSQL support.

## Compose the plugin

Add `@tspy/drizzle` under the `database` key in `tspy.config.ts`.

```ts
// tspy.config.ts
import { defineConfig } from "tspy";
import { drizzle } from "@tspy/drizzle";

export default defineConfig({
  database: drizzle({ provider: "sqlite", url: "file:./db.sqlite" }),
});
```

## Environment variables

- `DATABASE_URL` — the single environment variable; the `.env.example` names it.

## Define a schema

Drizzle schemas are plain TypeScript files. Create a `schema.ts` next to the client:

```ts
// server/db/schema.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  name: text("name"),
});
```

## Using the client

The plugin exposes the client as the `db` export on `tspy/server`:

```ts
// server/api/users.ts
import { db } from "tspy/server";

export default defineEventHandler(async () => {
  return await db.select().from(users);
});
```

Use `drizzle-kit` to generate migrations:

```bash
npx drizzle-kit generate
npx drizzle-kit push     # apply to the database in dev
```

## Good to know

- No `generate` step — types are inferred straight from your `schema.ts` files.
- The query builder stays close to SQL, which makes complex queries feel familiar.
- Swap Drizzle for Prisma later by changing the config and rewriting query files; the `db` boundary on `tspy/server` stays the same.
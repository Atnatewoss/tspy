# @tspy/drizzle

[Drizzle ORM](https://orm.drizzle.team) database integration plugin for TSPY.

## Install

```sh
npm i @tspy/drizzle
```

## Usage

```ts
// tspy.config.ts
import { defineConfig } from "tspy";
import { drizzle } from "@tspy/drizzle";

export default defineConfig({
  database: drizzle({
    provider: "sqlite",
    url: "file:./dev.db",
  }),
});
```

Compose under the `database` key. At runtime the wired client is generated
into `tspy/server` and available as `db`:

```ts
import { db } from "tspy/server";
const users = await db.query.users.findMany();
```

## Options

- `provider` — `"postgres"` | `"sqlite"` | `"mysql"`
- `url` — database connection string
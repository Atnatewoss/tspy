# @tspy/kysely

[Kysely](https://kysely.dev) type-safe SQL builder integration plugin for TSPY.

## Install

```sh
npm i @tspy/kysely
```

## Usage

```ts
// tspy.config.ts
import { defineConfig } from "tspy";
import { kysely } from "@tspy/kysely";

export default defineConfig({
  database: kysely({
    provider: "sqlite",
    url: "file:./dev.db",
  }),
});
```

Compose under the `database` key. At runtime the wired client is generated
into `tspy/server` and available as `db`:

```ts
import { db } from "tspy/server";
const users = await db.selectFrom("users").selectAll().execute();
```

## Options

- `provider` — `"postgres"` | `"sqlite"` | `"mysql"` (defaults to postgres)
- `url` — database connection string
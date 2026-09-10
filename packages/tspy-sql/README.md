# @tspy/sql

Raw SQL driver integration plugin for TSPY.

## Install

```sh
npm i @tspy/sql
```

## Usage

```ts
// tspy.config.ts
import { defineConfig } from "tspy";
import { sql } from "@tspy/sql";

export default defineConfig({
  database: sql({
    provider: "sqlite",
    url: "file:./dev.db",
  }),
});
```

Compose under the `database` key. At runtime the wired client is generated
into `tspy/server` and available as `db`:

```ts
import { db } from "tspy/server";
const { rows } = await db.query("SELECT * FROM users");
```

## Options

- `provider` — `"postgres"` | `"sqlite"` | `"mysql"` (defaults to postgres)
- `url` — database connection string
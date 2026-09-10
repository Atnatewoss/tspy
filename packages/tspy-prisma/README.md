# @tspy/prisma

[Prisma](https://www.prisma.io) database integration plugin for TSPY.

## Install

```sh
npm i @tspy/prisma
```

## Usage

```ts
// tspy.config.ts
import { defineConfig } from "tspy";
import { prisma } from "@tspy/prisma";

export default defineConfig({
  database: prisma({
    provider: "sqlite",
    url: "file:./dev.db",
  }),
});
```

Compose under the `database` key. At runtime the wired client is generated
into `tspy/server` and available as `db`:

```ts
import { db } from "tspy/server";
const users = await db.query.user.findMany();
```

## Options

- `provider` — `"postgres"` | `"sqlite"` | `"mysql"` (defaults to postgres)
- `url` — database connection string
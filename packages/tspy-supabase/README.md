# @tspy/supabase

[Supabase Auth](https://supabase.com/docs/guides/auth) integration plugin for
TSPY.

## Install

```sh
npm i @tspy/supabase
```

## Usage

```ts
// tspy.config.ts
import { defineConfig } from "tspy";
import { supabase } from "@tspy/supabase";

export default defineConfig({
  auth: supabase({
    url: process.env.SUPABASE_URL!,
    anonKey: process.env.SUPABASE_ANON_KEY!,
  }),
});
```

Compose under the `auth` key. At runtime the wired client is generated into
`tspy/server` and available as `auth`:

```ts
import { auth } from "tspy/server";
const session = await auth.getSession();
```

## Options

- `url` — Supabase project URL
- `anonKey` — public anon key
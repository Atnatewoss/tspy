# @tspy/clerk

[Clerk](https://clerk.com) integration plugin for TSPY.

## Install

```sh
npm i @tspy/clerk
```

## Usage

```ts
// tspy.config.ts
import { defineConfig } from "tspy";
import { clerk } from "@tspy/clerk";

export default defineConfig({
  auth: clerk({
    secretKey: process.env.CLERK_SECRET_KEY!,
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!,
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

- `secretKey` — Clerk secret key
- `publishableKey` — Clerk publishable key
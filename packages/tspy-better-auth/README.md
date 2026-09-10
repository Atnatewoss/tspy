# @tspy/better-auth

[Better Auth](https://better-auth.com) integration plugin for TSPY.

## Install

```sh
npm i @tspy/better-auth
```

## Usage

```ts
// tspy.config.ts
import { defineConfig } from "tspy";
import { betterAuth } from "@tspy/better-auth";

export default defineConfig({
  auth: betterAuth({
    emailAndPassword: { enabled: true },
    // socialProviders: { github: { clientId: "", clientSecret: "" } },
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

- `emailAndPassword.enabled` — enable email + password sign-in
- `socialProviders` — `{ [provider]: { clientId, clientSecret } }`
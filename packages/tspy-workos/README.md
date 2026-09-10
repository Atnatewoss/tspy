# @tspy/workos

[WorkOS](https://workos.com) (SSO, directory sync, audit logs) integration
plugin for TSPY.

## Install

```sh
npm i @tspy/workos
```

## Usage

```ts
// tspy.config.ts
import { defineConfig } from "tspy";
import { workos } from "@tspy/workos";

export default defineConfig({
  auth: workos({
    apiKey: process.env.WORKOS_API_KEY!,
    clientId: process.env.WORKOS_CLIENT_ID!,
    redirectUri: process.env.WORKOS_REDIRECT_URI!,
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

- `apiKey` — WorkOS API key
- `clientId` — WorkOS client ID
- `redirectUri` — SSO redirect URI
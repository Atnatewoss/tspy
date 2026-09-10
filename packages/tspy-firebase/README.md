# @tspy/firebase

[Firebase Authentication](https://firebase.google.com/docs/auth) integration
plugin for TSPY.

## Install

```sh
npm i @tspy/firebase
```

## Usage

```ts
// tspy.config.ts
import { defineConfig } from "tspy";
import { firebase } from "@tspy/firebase";

export default defineConfig({
  auth: firebase({
    projectId: process.env.FIREBASE_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
    privateKey: process.env.FIREBASE_PRIVATE_KEY!,
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

- `projectId` — Firebase project ID
- `clientEmail` — service account client email
- `privateKey` — service account private key
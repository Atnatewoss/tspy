# @tspy/dramatiq

[Dramatiq](https://dramatiq.io) background jobs integration plugin for TSPY.

## Install

```sh
npm i @tspy/dramatiq
```

## Usage

```ts
// tspy.config.ts
import { defineConfig } from "tspy";
import { dramatiq } from "@tspy/dramatiq";

export default defineConfig({
  jobs: dramatiq({
    broker: "redis://localhost:6379",
  }),
});
```

Compose under the `jobs` key. At runtime the wired client is generated into
`tspy/server` and available as `jobs`:

```ts
import { jobs } from "tspy/server";
await jobs.enqueue("process_video", { videoId: "abc123" });
```

## Options

- `broker` — broker URL (redis / rabbitmq)
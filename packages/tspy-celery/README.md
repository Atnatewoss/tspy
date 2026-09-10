# @tspy/celery

[Celery](https://docs.celeryq.dev) background jobs integration plugin for TSPY.

## Install

```sh
npm i @tspy/celery
```

## Usage

```ts
// tspy.config.ts
import { defineConfig } from "tspy";
import { celery } from "@tspy/celery";

export default defineConfig({
  jobs: celery({
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
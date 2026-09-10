# @tspy/rq

[RQ](https://python-rq.org) background jobs integration plugin for TSPY.

## Install

```sh
npm i @tspy/rq
```

## Usage

```ts
// tspy.config.ts
import { defineConfig } from "tspy";
import { rq } from "@tspy/rq";

export default defineConfig({
  jobs: rq({
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

- `broker` — Redis URL
# @tspy/anthropic

[Anthropic](https://www.anthropic.com) Claude integration plugin for TSPY.

## Install

```sh
npm i @tspy/anthropic
```

## Usage

```ts
// tspy.config.ts
import { defineConfig } from "tspy";
import { anthropic } from "@tspy/anthropic";

export default defineConfig({
  ai: anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY!,
    model: "claude-sonnet-4-5",
  }),
});
```

Compose under the `ai` key. At runtime the wired client is generated into
`tspy/server` and available as `ai`:

```ts
import { ai } from "tspy/server";
const reply = await ai.chat("Explain TSPY");
```

## Options

- `apiKey` — Anthropic API key
- `model` — model id (default `claude-sonnet-4-5`)
- `rag` — optional RAG setup (`{ enabled, vectorDb, dbUrl, embeddingModel, … }`)
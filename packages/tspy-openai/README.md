# @tspy/openai

[OpenAI](https://openai.com) integration plugin for TSPY.

## Install

```sh
npm i @tspy/openai
```

## Usage

```ts
// tspy.config.ts
import { defineConfig } from "tspy";
import { openai } from "@tspy/openai";

export default defineConfig({
  ai: openai({
    apiKey: process.env.OPENAI_API_KEY!,
    model: "gpt-4o",
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

- `apiKey` — OpenAI API key
- `model` — model id (default `gpt-4o`)
- `rag` — optional RAG setup (`{ enabled, vectorDb, dbUrl, embeddingModel, … }`)
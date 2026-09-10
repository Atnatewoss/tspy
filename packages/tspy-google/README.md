# @tspy/google

Google AI (Gemini) integration plugin for TSPY.

## Install

```sh
npm i @tspy/google
```

## Usage

```ts
// tspy.config.ts
import { defineConfig } from "tspy";
import { google } from "@tspy/google";

export default defineConfig({
  ai: google({
    apiKey: process.env.GEMINI_API_KEY!,
    model: "gemini-2.5-pro",
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

- `apiKey` — Google AI Studio API key
- `model` — Gemini model id (default `gemini-2.5-pro`)
- `rag` — optional RAG setup (`{ enabled, vectorDb, dbUrl, embeddingModel, … }`)
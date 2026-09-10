# @tspy/ollama

[Ollama](https://ollama.com) integration plugin for TSPY.

## Install

```sh
npm i @tspy/ollama
```

## Usage

```ts
// tspy.config.ts
import { defineConfig } from "tspy";
import { ollama } from "@tspy/ollama";

export default defineConfig({
  ai: ollama({
    baseUrl: process.env.OLLAMA_HOST!,
    model: "llama3.2",
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

- `baseUrl` — Ollama server URL (default `http://localhost:11434`)
- `model` — local model id (default `llama3.2`)
- `rag` — optional RAG setup (`{ enabled, vectorDb, dbUrl, embeddingModel, … }`)
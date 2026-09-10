#!/usr/bin/env node

import { createJiti } from "jiti";
import { fileURLToPath } from "node:url";

const jiti = createJiti(fileURLToPath(import.meta.url));

const command = process.argv[2];

if (command === "dev" || !command) {
  const { runDevServer } = await jiti.import("@tspy/dev");
  runDevServer().catch((err) => {
    console.error("Error starting TSPY dev server:", err);
    process.exit(1);
  });
} else {
  console.log(`Unknown command: ${command}`);
  console.log("Usage: tspy dev");
  process.exit(1);
}

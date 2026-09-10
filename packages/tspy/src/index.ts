export { TSPYRouter } from "./router";
export { api } from "./api-client";
export { runDevServer } from "@tspy/dev";

export { defineConfig, type TSPYConfig, type TSPYPlugin } from "./config";
export {
  createAuthPlugin,
  createDatabasePlugin,
  createAiPlugin,
  createJobsPlugin,
  type TSPYContext,
  type AuthPluginOptions,
  type DatabasePluginOptions,
  type AiPluginOptions,
  type JobsPluginOptions,
} from "./plugin-utils";

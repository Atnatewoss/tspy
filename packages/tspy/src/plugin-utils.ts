/**
 * tspy plugin factory utilities
 *
 * Inspired by Farm.js integrations — each provider package stays thin.
 * Shared logic lives here so every integration has a consistent shape.
 *
 * Separation:
 *   Config  = "what" and "which" (provider, model, path, feature flags)
 *   Code    = "how"  (real handler, query builder, agent logic — lives in server/)
 */

import type { TSPYPlugin } from "./config.ts";

// ─── Shared app context ───────────────────────────────────────────────────────

export interface TSPYContext {
  cwd: string;
  mode: "development" | "production";
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface AuthPluginOptions<TOptions = unknown> {
  /** e.g. "better-auth", "clerk" */
  name: string;
  options: TOptions;
  /** Mount auth HTTP handler at this path pattern */
  path?: string;
  /** Called once at server startup */
  setup?: (ctx: TSPYContext, options: TOptions) => void | Promise<void>;
  /** Returns runtime export code injected into .tspy/server.ts */
  generateExports?: (options: TOptions) => string;
}

export function createAuthPlugin<TOptions>(
  def: AuthPluginOptions<TOptions>,
): TSPYPlugin {
  return {
    name: "auth",
    setup: def.setup
      ? (app: any) => def.setup!(app as TSPYContext, def.options)
      : () => {},
    generateExports: def.generateExports
      ? () => def.generateExports!(def.options)
      : undefined,
  };
}

// ─── Database ─────────────────────────────────────────────────────────────────

export interface DatabasePluginOptions<TOptions = unknown> {
  name: string;
  options: TOptions;
  setup?: (ctx: TSPYContext, options: TOptions) => void | Promise<void>;
  generateExports?: (options: TOptions) => string;
}

export function createDatabasePlugin<TOptions>(
  def: DatabasePluginOptions<TOptions>,
): TSPYPlugin {
  return {
    name: "db",
    setup: def.setup
      ? (app: any) => def.setup!(app as TSPYContext, def.options)
      : () => {},
    generateExports: def.generateExports
      ? () => def.generateExports!(def.options)
      : undefined,
  };
}

// ─── AI ───────────────────────────────────────────────────────────────────────

export interface AiPluginOptions<TOptions = unknown> {
  name: string;
  options: TOptions;
  setup?: (ctx: TSPYContext, options: TOptions) => void | Promise<void>;
  generateExports?: (options: TOptions) => string;
}

export function createAiPlugin<TOptions>(
  def: AiPluginOptions<TOptions>,
): TSPYPlugin {
  return {
    name: "ai",
    setup: def.setup
      ? (app: any) => def.setup!(app as TSPYContext, def.options)
      : () => {},
    generateExports: def.generateExports
      ? () => def.generateExports!(def.options)
      : undefined,
  };
}

// ─── Jobs ─────────────────────────────────────────────────────────────────────

export interface JobsPluginOptions<TOptions = unknown> {
  name: string;
  options: TOptions;
  setup?: (ctx: TSPYContext, options: TOptions) => void | Promise<void>;
  generateExports?: (options: TOptions) => string;
}

export function createJobsPlugin<TOptions>(
  def: JobsPluginOptions<TOptions>,
): TSPYPlugin {
  return {
    name: "jobs",
    setup: def.setup
      ? (app: any) => def.setup!(app as TSPYContext, def.options)
      : () => {},
    generateExports: def.generateExports
      ? () => def.generateExports!(def.options)
      : undefined,
  };
}

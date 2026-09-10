import { WhyAMetaFramework } from "./why-a-meta-framework";
import { TheHonestBaseline } from "./the-honest-baseline";
import { FilesystemRouting } from "./filesystem-routing";
import { TheParserAndManifest } from "./the-parser-and-manifest";
import { VirtualModules } from "./virtual-modules";
import { LayoutAdaptation } from "./layout-adaptation";
import { ViteAndNitro } from "./vite-and-nitro";
import { TheDevServer } from "./the-dev-server";
import { HmrAndWatchers } from "./hmr-and-watchers";
import { TspyConfig } from "./tspy-config";
import { BuildPipeline } from "./build-pipeline";
import { ServerAndHono } from "./server-and-hono";
import { ApiProxying } from "./api-proxying";
import { MiddlewareAndEdge } from "./middleware-and-edge";
import { PythonExecutionModel } from "./python-execution-model";
import { TheRpcBoundary } from "./the-rpc-boundary";
import { AiCapabilities } from "./ai-capabilities";
import { BackgroundJobs } from "./background-jobs";
import { DataMutations } from "./data-mutations";
import { AuthFlow } from "./auth-flow";
import { DatabaseAccess } from "./database-access";
import React from "react";

export const LEARN_CONTENT: Record<string, React.ReactNode> = {
  "learn/why-a-meta-framework": <WhyAMetaFramework />,
  "learn/the-honest-baseline": <TheHonestBaseline />,
  "learn/filesystem-routing": <FilesystemRouting />,
  "learn/the-parser-and-manifest": <TheParserAndManifest />,
  "learn/virtual-modules": <VirtualModules />,
  "learn/layout-adaptation": <LayoutAdaptation />,
  "learn/vite-and-nitro": <ViteAndNitro />,
  "learn/the-dev-server": <TheDevServer />,
  "learn/hmr-and-watchers": <HmrAndWatchers />,
  "learn/tspy-config": <TspyConfig />,
  "learn/build-pipeline": <BuildPipeline />,
  "learn/server-and-hono": <ServerAndHono />,
  "learn/api-proxying": <ApiProxying />,
  "learn/middleware-and-edge": <MiddlewareAndEdge />,
  "learn/python-execution-model": <PythonExecutionModel />,
  "learn/the-rpc-boundary": <TheRpcBoundary />,
  "learn/ai-capabilities": <AiCapabilities />,
  "learn/background-jobs": <BackgroundJobs />,
  "learn/data-mutations": <DataMutations />,
  "learn/auth-flow": <AuthFlow />,
  "learn/database-access": <DatabaseAccess />
};

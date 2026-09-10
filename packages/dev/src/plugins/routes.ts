import { Plugin } from "vite";
import fg from "fast-glob";
import path from "node:path";
import { parseRoutes, generateRouteModule } from "tspy/router";

export function tspyRoutesPlugin(cwd: string): Plugin {
  const virtualModuleId = "virtual:tspy-routes";
  const resolvedVirtualModuleId = "\0" + virtualModuleId;

  const getAppFiles = (): string[] => {
    const appDir = path.join(cwd, "app");
    try {
      const relativeFiles = fg.sync("**/{page,layout}.tsx", { cwd: appDir });
      return relativeFiles.map((f) => `/app/${f}`);
    } catch {
      return [];
    }
  };

  return {
    name: "tspy-routes",

    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },

    load(id) {
      if (id === resolvedVirtualModuleId) {
        const files = getAppFiles();
        const manifest = parseRoutes(files);
        return generateRouteModule(manifest);
      }
    },

    configureServer(server) {
      const handleFileChange = (filepath: string) => {
        const normalized = filepath.replace(/\\/g, "/");
        if (
          normalized.includes("/app/") &&
          (normalized.endsWith("/page.tsx") || normalized.endsWith("/layout.tsx"))
        ) {
          const mod = server.moduleGraph.getModuleById(resolvedVirtualModuleId);
          if (mod) {
            server.moduleGraph.invalidateModule(mod);
            server.ws?.send({ type: "full-reload" });
          }
        }
      };

      if (server.watcher) {
        server.watcher.on("add", handleFileChange);
        server.watcher.on("unlink", handleFileChange);
      }
    },
  };
}

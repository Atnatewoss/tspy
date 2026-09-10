import React, { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

// @ts-expect-error Virtual module provided by tspyRoutesPlugin
import { routes } from "virtual:tspy-routes";

export function TSPYRouter() {
  const router = useMemo(() => createBrowserRouter(routes), []);

  return <RouterProvider router={router} />;
}

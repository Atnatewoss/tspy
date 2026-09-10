import { parseRoutes } from "./parser";

const pages = [
  "/app/page.tsx",
  "/app/about/page.tsx",
  "/app/users/[id]/page.tsx",
  "/app/docs/[...slug]/page.tsx",
];

const layouts = [
  "/app/layout.tsx",
  "/app/users/layout.tsx",
];

console.log(JSON.stringify(parseRoutes(pages, layouts), null, 2));

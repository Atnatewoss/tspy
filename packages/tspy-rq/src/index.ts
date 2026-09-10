import { createJobsPlugin } from "tspy";

export interface RqConfig {
  broker: string;
}

export function rq(options: RqConfig) {
  return createJobsPlugin({
    name: "rq",
    options,
    generateExports: () =>
      `export const jobs = {\n  enqueue: async (task: string, args?: unknown) => true,\n};`,
  });
}

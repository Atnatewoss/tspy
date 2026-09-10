export interface TSPYPlugin<TName extends string = string, TExports = any> {
  name: TName;
  setup: (app: any) => void | Promise<void>;
  generateExports?: () => string | Promise<string>;
}

export type TSPYConfig = {
  [key: string]: TSPYPlugin | any;
};

export function defineConfig(config: TSPYConfig): TSPYConfig {
  return config;
}

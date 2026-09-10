import { createNitro, createDevServer, build, prepare } from "nitropack";
import { dirname } from "path";
import { fileURLToPath } from "url";

const cwd = dirname(fileURLToPath(import.meta.url));

async function run() {
  const nitro = await createNitro({
    rootDir: cwd,
    dev: true,
  });

  const server = createDevServer(nitro);
  await server.listen(3001);
  await prepare(nitro);
  await build(nitro);

  console.log("Nitro dev server running on 3001");
}

run().catch(console.error);

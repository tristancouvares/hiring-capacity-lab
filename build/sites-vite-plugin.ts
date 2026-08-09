import { mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { Plugin } from "vite";

// Writes Vinext/Cloudflare hosting metadata after Vite finishes compiling.
// No external hosting config file is required for this static portfolio app.
export function sites(): Plugin {
  let root = process.cwd();

  return {
    name: "sites",
    apply: "build",
    configResolved(config) {
      root = config.root;
    },
    async closeBundle() {
      const outputDirectory = resolve(root, "dist", "hosting");

      await rm(outputDirectory, { recursive: true, force: true });
      await mkdir(outputDirectory, { recursive: true });
      await writeFile(
        resolve(outputDirectory, "hosting.json"),
        `${JSON.stringify({ d1: null, r2: null }, null, 2)}\n`,
        "utf8",
      );
    },
  };
}

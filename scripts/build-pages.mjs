import { copyFile, mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const root = process.cwd();
const sourceDir = resolve(root, "pages");
const outputDir = resolve(root, "pages-dist");

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

await copyFile(resolve(sourceDir, "index.html"), resolve(outputDir, "index.html"));
await copyFile(resolve(sourceDir, "404.html"), resolve(outputDir, "404.html"));

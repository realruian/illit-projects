import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Script } from "node:vm";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(
  await readFile(path.join(root, "assets.json"), "utf8"),
);
const assetModule = `// Generated from assets.json by scripts/build.mjs.\nexport const assetSources = ${JSON.stringify(manifest.assets)};\n`;
await writeFile(path.join(root, "assets-data.js"), assetModule);
const modules = [
  "content.js",
  "member-details.js",
  "chapters-23.js",
  "chapters-45.js",
  "curriculum.js",
  "explore-content.js",
  "assets-data.js",
  "progression.js",
  "app.js",
];
let script = (
  await Promise.all(
    modules.map((name) => readFile(path.join(root, name), "utf8")),
  )
)
  .map((source) =>
    source
      .replace(/^import\s+[\s\S]*?\s+from\s+["'][^"']+["'];?\s*$/gm, "")
      .replace(/^export /gm, ""),
  )
  .join("\n");
new Script(script, { filename: "illit-bundle.js" });
let html = await readFile(path.join(root, "index.html"), "utf8");
const css = await readFile(path.join(root, "styles.css"), "utf8");
html = html.replace(
  /<link\s+rel="stylesheet"\s+href="styles\.css"\s*\/?>/,
  () => `<style>\n${css}\n</style>`,
);
html = html.replace(
  /<script\s+type="module"\s+src="app\.js"\s*>\s*<\/script>/,
  () => `<script>\n(()=>{\n'use strict';\n${script}\n})();\n</script>`,
);
const mime = {
  ".webp": "image/webp",
  ".png": "image/png",
  ".woff2": "font/woff2",
};
for (const file of await readdir(path.join(root, "assets"))) {
  const ext = path.extname(file);
  if (!mime[ext]) continue;
  const bytes = await readFile(path.join(root, "assets", file));
  const data = `data:${mime[ext]};base64,${bytes.toString("base64")}`;
  html = html.replaceAll(`assets/${file}`, data);
}
if (/(?:src|href)=["'](?:assets\/|app\.js|styles\.css)/.test(html))
  throw new Error("Unresolved local resource in standalone build");
if (/<script type="module"/.test(html))
  throw new Error("Offline build must not use module fetch");
await mkdir(path.join(root, "dist"), { recursive: true });
await writeFile(path.join(root, "dist", "index.html"), html);
const download = process.env.ILLIT_DOWNLOAD_DIR
  ? path.resolve(process.env.ILLIT_DOWNLOAD_DIR)
  : path.join(root, "downloads");
await mkdir(download, { recursive: true });
await writeFile(path.join(download, "ILLIT-互动视觉原型.html"), html);
console.log(
  `Built standalone HTML: ${Buffer.byteLength(html)} bytes. All images and font embedded; no server required.`,
);

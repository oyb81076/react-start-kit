import fs from "fs";
import path from "path";
const contents: string[] = [];
fs.readdirSync(path.join(__dirname, "../__generated__"))
  .map((filename) => fs.readFileSync(path.join(__dirname, "../__generated__", filename), { encoding: "utf8" }))
  .map((content) => content.replace(/(\n|^)import.*(\n|$)/g, ""))
  .forEach((content) => contents.push(content));
// const indexTs = fs.readdirSync(path.join(__dirname, "../__generated__"))
//   .filter((file) => /\.ts$/.test(file) && file !== "index.ts")
//   .map((file) => file.replace(/\.ts$/, ""))
//   .map((x) => `export * from "./${x}";`)
//   .join("\n") + "\n";
fs.writeFileSync(path.join(__dirname, "../index.ts"), contents.join("\n"), { encoding: "utf8" });

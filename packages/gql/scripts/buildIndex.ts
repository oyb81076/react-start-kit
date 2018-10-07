// tslint:disable:no-implicit-dependencies
import fs from "fs";
import * as graphql from "graphql";
import gql from "graphql-tag";
import { join } from "path";
const contents: string[] = [];
const node: graphql.DocumentNode = gql(fs.readFileSync(join(__dirname, "../queries.gql"), { encoding: "utf8" }));
contents.push(`
// tslint:disable
const queries = require("./queries.gql");
${node.definitions.map((def) => {
    if (def.kind === "OperationDefinition") {
      return `export const ${def.name!.value}: any = queries.${def.name!.value};`;
    }
    return "";
  }).filter(Boolean).join("\n")}
`);
fs.readdirSync(join(__dirname, "../__generated__"))
  .map((filename) => fs.readFileSync(join(__dirname, "../__generated__", filename), { encoding: "utf8" }))
  .map((content) => content.replace(/(\n|^)import.*(\n|$)/g, ""))
  .forEach((content) => contents.push(content));
fs.writeFileSync(
  join(__dirname, "../index.ts"),
  contents.join("\n"),
  { encoding: "utf8" },
);

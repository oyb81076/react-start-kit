// tslint:disable-next-line:no-implicit-dependencies
import { createDevConfig } from "@pk/webpack-packager";
import * as path from "path";
process.env.NODE_ENV = "development";
export = createDevConfig({
  entries: [
    path.join(__dirname, "../example/index.ts"),
  ],
  port: 3000,
  title: require("../package.json").name,
});

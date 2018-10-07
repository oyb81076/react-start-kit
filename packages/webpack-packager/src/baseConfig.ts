import { join } from "path";
import { Configuration, RuleSetRule } from "webpack";
// 通用配置
export const resolve: Configuration["resolve"] = {
  alias: {
    // for graphql 14.0.2 has mjs
    "graphql$": join(__dirname, "../../../node_modules/graphql/index.js"),
    "@pk": join(__dirname, "../../../packages"),
    "@rt": join(__dirname, "../../../reacts"),
    "@sv": join(__dirname, "../../../serves"),
  },
  modules: [join(__dirname, "../../../node_modules")],
  extensions: [".ts", ".tsx", ".js", ".json"],
  plugins: [],
};
export const imageRule: RuleSetRule = {
  test: /\.(bmp|gif|jpg|jpeg|png)$/,
  loader: require.resolve("url-loader"),
  options: { limit: 10000, name: "static/images/[name].[hash:8].[ext]" },
};

export const fontRule: RuleSetRule = {
  include: /\.(svg|woff|woff2|otf|ttf|eot)$/,
  loader: require.resolve("file-loader"),
  options: { name: "static/fonts/[name].[hash:8].[ext]" },
};
export const jsRule: RuleSetRule = {
  test: /\.mjs$/,
  loader: require.resolve("babel-loader"),
};
export const tsxRule: RuleSetRule = {
  test: /\.tsx?$/,
  include: [
    join(__dirname, "../../../packages"),
    join(__dirname, "../../../reacts"),
    join(__dirname, "../../../serves"),
  ],
  exclude: /node_modules/,
  use: [
    { loader: require.resolve("babel-loader") },
    { loader: require.resolve("ts-loader"), options: { transpileOnly: true } },
  ],
};

export const gqlRule: RuleSetRule = {
  test: /\.(gql|graphql)/,
  exclude: /node_modules/,
  loader: require.resolve("graphql-tag/loader"),
};

export const node: Configuration["node"] = {
  dgram: "empty",
  fs: "empty",
  net: "empty",
  tls: "empty",
  child_process: "empty",
  bson: "empty",
};

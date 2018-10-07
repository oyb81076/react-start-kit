import ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
import HtmlWebpackPlugin = require("html-webpack-plugin");
import MiniCssExtractPlugin = require("mini-css-extract-plugin");
import path = require("path");
import SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
import webpack = require("webpack");
import ManifestPlugin = require("webpack-manifest-plugin");
import { fontRule, gqlRule, imageRule, jsRule, node, resolve, tsxRule } from "./baseConfig";
export interface IProConfig {
  entries: string[];
  publicUrl: string;
  title: string;
}
export const createProConfig = (
  { entries, publicUrl, title }: IProConfig,
): webpack.Configuration => ({
  devtool: "source-map",
  mode: "production",
  entry: [
    ...entries,
    path.join(__dirname, "./registerServiceWorker.ts"),
  ],
  output: {
    pathinfo: true,
    filename: "static/bundle.[hash:8].js",
    chunkFilename: "static/[name].chunk.[hash:8].js",
    path: path.join(__dirname, "dist"),
    publicPath: `${publicUrl}/`,
    devtoolModuleFilenameTemplate: ({ absoluteResourcePath }) => absoluteResourcePath,
  },
  resolve,
  module: {
    strictExportPresence: true,
    rules: [
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, { loader: require.resolve("css-loader") }] },
      imageRule,
      fontRule,
      tsxRule,
      jsRule,
      gqlRule,
    ],
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.IgnorePlugin(/\@material-ui\/(icons|core)$/),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      tsconfig: path.join(__dirname, "../tsconfig.react.json"),
      tslint: path.join(__dirname, "../tslint.react.json"),
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
        PUBLIC_URL: JSON.stringify(publicUrl),
      },
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, "../public/index.html"),
      PUBLIC_URL: publicUrl,
      TITLE: title,
    }),
    new ManifestPlugin({ fileName: "manifest-assets.json" }),
    new SWPrecacheWebpackPlugin({
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: "service-worker.js",
      minify: true,
      navigateFallback: path.join(publicUrl, "index.html"),
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    }),
    new MiniCssExtractPlugin({
      filename: `static/bundle.[contenthash:8].css`,
    }),
  ],
  node,
  performance: {
    hints: "warning",
  },
});

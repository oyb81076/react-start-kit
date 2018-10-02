import ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
import HtmlWebpackPlugin = require("html-webpack-plugin");
import MiniCssExtractPlugin = require("mini-css-extract-plugin");
import path = require("path");
import SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
import webpack = require("webpack");
import ManifestPlugin = require("webpack-manifest-plugin");
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
  resolve: {
    alias: {
      "@pk": path.join(__dirname, "../../../packages"),
      "@rt": path.join(__dirname, "../../../reacts"),
      "@sv": path.join(__dirname, "../../../serves"),
    },
    modules: [path.join(__dirname, "../../../node_modules")],
    extensions: [".ts", ".tsx", ".js", ".json"],
    plugins: [],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(bmp|gif|jpg|jpeg|png)$/,
        loader: require.resolve("url-loader"),
        options: { limit: 10000, name: "static/images/[name].[hash:8].[ext]" },
      },
      {
        include: /\.(svg|woff|woff2|otf|ttf|eot)$/,
        loader: require.resolve("file-loader"),
        options: { name: "static/fonts/[name].[hash:8].[ext]" },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: require.resolve("css-loader") },
        ],
      },
      {
        test: /\.tsx?$/,
        include: [
          path.join(__dirname, "../../../packages"),
          path.join(__dirname, "../../../reacts"),
          path.join(__dirname, "../../../serves"),
        ],
        exclude: /node_modules/,
        use: [
          { loader: require.resolve("babel-loader") },
          { loader: require.resolve("ts-loader"), options: { transpileOnly: true } },
        ],
      },
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
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
      "PUBLIC_URL": JSON.stringify(publicUrl),
      "__PRO__": true,
      "__DEV__": false,
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
  node: {
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty",
    bson: "empty",
  },
  performance: {
    hints: "warning",
  },
});

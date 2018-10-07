// tslint:disable:no-var-requires
import CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
import ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
import HtmlWebpackPlugin = require("html-webpack-plugin");
import path = require("path");
import webpack = require("webpack");
import { fontRule, gqlRule, imageRule, jsRule, node, resolve, tsxRule } from "./baseConfig";
const errorOverlayMiddleware = require("react-dev-utils/errorOverlayMiddleware");
const noopServiceWorkerMiddleware = require("react-dev-utils/noopServiceWorkerMiddleware");
const { prepareUrls } = require("react-dev-utils/WebpackDevServerUtils");
const openBrowser = require("react-dev-utils/openBrowser");
export interface IDevConfig {
  entries: string[];
  publicUrl?: string;
  title?: string;
  host?: string;
  port?: number;
  https?: boolean;
}
export const createDevConfig = (
  {
    entries,
    publicUrl = "",
    host = "0.0.0.0",
    port = 3000,
    https = false,
    title = "React App",
  }: IDevConfig,
): webpack.Configuration => {
  const { localUrlForBrowser, lanUrlForConfig, lanUrlForTerminal } = prepareUrls(https, host, port);
  return {
    devtool: "cheap-module-source-map",
    mode: "development",
    entry: [
      require.resolve("react-dev-utils/webpackHotDevClient"),
      ...entries,
    ],
    output: {
      pathinfo: true,
      filename: "static/bundle.js",
      chunkFilename: "static/[name].chunk.js",
      path: path.join(__dirname, "dist"),
      publicPath: `${publicUrl}/`,
      devtoolModuleFilenameTemplate: ({ absoluteResourcePath }) => absoluteResourcePath,
    },
    devServer: {
      disableHostCheck: true,
      compress: true,
      clientLogLevel: "none",
      contentBase: path.join(__dirname, "./public"),
      watchContentBase: true,
      hot: true,
      publicPath: `${publicUrl}/`,
      watchOptions: {
        ignored: [
          path.join(__dirname, "../../node_modules"),
        ],
      },
      https,
      host,
      port,
      overlay: false,
      historyApiFallback: {
        disableDotRule: true,
      },
      public: lanUrlForConfig,
      proxy: {
        "/api/*": "http://127.0.0.1:8080",
        "/graphql": "http://127.0.0.1:4000",
      },
      before(app) {
        app.use(errorOverlayMiddleware());
        app.use(noopServiceWorkerMiddleware());
      },
      after() {
        openBrowser(localUrlForBrowser);
        // tslint:disable-next-line:no-console
        console.log("project run at %s", lanUrlForTerminal);
      },
    },
    resolve,
    module: {
      strictExportPresence: true,
      rules: [
        { test: /\.css$/, use: ["style-loader", "css-loader"] },
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
        watch: [
          path.join(__dirname, "../../../packages"),
          path.join(__dirname, "../../../reacts"),
          path.join(__dirname, "../../../serves"),
        ],
        tsconfig: path.join(__dirname, "../tsconfig.react.json"),
        tslint: path.join(__dirname, "../tslint.react.json"),
      }),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("development"),
          PUBLIC_URL: JSON.stringify(publicUrl),
        },
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: path.join(__dirname, "../public/index.html"),
        PUBLIC_URL: publicUrl,
        TITLE: title,
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new CaseSensitivePathsPlugin(),
    ],
    node,
    performance: {
      hints: false,
    },
  };
};

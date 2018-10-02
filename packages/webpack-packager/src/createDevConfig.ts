// tslint:disable:no-var-requires
import CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
import ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
import HtmlWebpackPlugin = require("html-webpack-plugin");
import path = require("path");
import webpack = require("webpack");
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
  const { localUrlForBrowser, lanUrlForConfig } = prepareUrls(https, host, port);
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
      before(app) {
        app.use(errorOverlayMiddleware());
        app.use(noopServiceWorkerMiddleware());
      },
      after() { openBrowser(localUrlForBrowser); },
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
          options: { limit: 10000, name: "static/images/[name].[ext]" },
        },
        {
          include: /\.(svg|woff|woff2|otf|ttf|eot)$/,
          loader: require.resolve("file-loader"),
          options: { name: "static/fonts/[name].[ext]" },
        },
        {
          test: /\.css$/,
          use: [
            { loader: require.resolve("style-loader") },
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
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
        "PUBLIC_URL": JSON.stringify(publicUrl),
        "__PRO__": false,
        "__DEV__": true,
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
    node: {
      dgram: "empty",
      fs: "empty",
      net: "empty",
      tls: "empty",
      child_process: "empty",
      bson: "empty",
    },
    performance: {
      hints: false,
    },
  };
};

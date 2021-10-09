const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const { ModuleFederationPlugin } = webpack.container;

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // jsx/js文件的正则
        exclude: /node_modules/, // 排除 node_modules 文件夹
        use: {
          // loader 是 babel
          loader: "babel-loader",
          options: {
            // babel 转义的配置选项
            babelrc: false,
            presets: [
              // 添加 preset-react
              require.resolve("@babel/preset-react"),
              [require.resolve("@babel/preset-env"), { modules: false }],
            ],
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          { loader: "style-loader" },
          {
            loader: "@teamsupercell/typings-for-css-modules-loader",
          },
          {
            loader: "css-loader",
            options: { modules: true },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.md?$/,
        loader: "raw-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
    fallback: {
      assert: require.resolve("assert/"),
    },
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new htmlWebpackPlugin({
      template: "public/index.html",
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
    new ModuleFederationPlugin({
      remotes: {
        "MF_module": "MF_module@./remoteEntry.js"
      }
    })
  ],

  devServer: {
    historyApiFallback: true,
  },
};

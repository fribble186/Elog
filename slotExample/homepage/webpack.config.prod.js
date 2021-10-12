const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const {ModuleFederationPlugin} = require('webpack').container;

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    publicPath: "http://localhost:3010/",
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
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  // externals: {
  //     react: 'React',
  //     'react-dom': 'ReactDOM'
  // },
  plugins: [
    new MiniCssExtractPlugin(),
    new htmlWebpackPlugin({
      template: "public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "MF_module",
      filename: "remoteEntry.js",
      exposes: {
        './Homepage': './src/components/Homepage/index.tsx'
      },
      shared: {
        react: { eager: true},
        "react-dom": { eager: true},
      }
    })
  ],
};

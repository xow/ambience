const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = false; // TODO what's wrong with HTML WebpackPlugin usage? process.env.VERCEL_ENV !== "production";

module.exports = {
  entry: "./src/index.ts",
  mode: devMode ? "development" : "production",
  plugins: [
    ...(devMode ? [] : [new MiniCssExtractPlugin()]),
    new HtmlWebpackPlugin({ template: "src/index.html" }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
    open: true,
  },
};

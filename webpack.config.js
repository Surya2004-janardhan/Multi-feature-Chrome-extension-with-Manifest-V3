const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: "cheap-module-source-map",

  entry: {
    popup: "./src/popup/index.tsx",
    options: "./src/options/index.tsx",
    newtab: "./src/newtab/index.tsx",
    blocked: "./src/blocked/index.tsx",
    background: "./src/background/service-worker.ts",
    content: "./src/content/blocker.ts",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@shared": path.resolve(__dirname, "src/shared"),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./popup.html",
      filename: "popup.html",
      chunks: ["popup"],
    }),
    new HtmlWebpackPlugin({
      template: "./options.html",
      filename: "options.html",
      chunks: ["options"],
    }),
    new HtmlWebpackPlugin({
      template: "./newtab.html",
      filename: "newtab.html",
      chunks: ["newtab"],
    }),
    new HtmlWebpackPlugin({
      template: "./blocked.html",
      filename: "blocked.html",
      chunks: ["blocked"],
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "manifest.json", to: "manifest.json" }],
    }),
  ],

  optimization: {
    splitChunks: false,
  },
};

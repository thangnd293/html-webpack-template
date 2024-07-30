const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devServer = () => ({
  devServer: {
    port: 9000,
    watchFiles: ["app/**/*.hbs"],
  },
});

const loadCSS = () => ({
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
});

const loadPage = ({ title, template }) => ({
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: "handlebars-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title,
      template,
    }),
  ],
});

const copyPublic = () => ({
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "./app/public" }],
    }),
  ],
});

const extractCSS = ({ options = {}, loaders = [] } = {}) => {
  console.log("loaders", loaders);
  return {
    module: {
      rules: [
        {
          test: /\.s?css$/,
          use: [{ loader: MiniCssExtractPlugin.loader, options }, "css-loader"]
            .concat(loaders)
            .concat(["sass-loader"]),
          sideEffects: true,
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
    ],
  };
};

const loadJavaScript = () => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
      },
    ],
  },
});

const autoprefix = () => ({
  loader: "postcss-loader",
  options: {
    postcssOptions: { plugins: [require("autoprefixer")()] },
  },
});

module.exports = {
  devServer,
  loadCSS,
  loadPage,
  copyPublic,
  extractCSS,
  loadJavaScript,
  autoprefix,
};

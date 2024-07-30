const { merge } = require("webpack-merge");

const { devServer, extractCSS } = require("./webpack.parts");
const commonConfig = require("./webpack.common");

const developmentConfig = merge([extractCSS(), devServer()]);

module.exports = merge(commonConfig, developmentConfig, {
  mode: "development",
});

const { merge } = require("webpack-merge");

const { extractCSS, loadJavaScript, autoprefix } = require("./webpack.parts");
const commonConfig = require("./webpack.common");

const cssLoaders = [autoprefix()];
const productionConfig = merge([
  extractCSS({
    loaders: cssLoaders,
  }),
  loadJavaScript(),
  { optimization: { splitChunks: { chunks: "all" } } },
]);

module.exports = merge(commonConfig, productionConfig, { mode: "production" });

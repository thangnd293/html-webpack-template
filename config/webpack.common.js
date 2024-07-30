const { merge } = require("webpack-merge");

const { loadPage, copyPublic } = require("./webpack.parts");

const commonConfig = merge([
  {
    entry: ["./app/index.js"],
    output: {
      clean: true,
    },
  },
  copyPublic(),
  loadPage({ title: "Handlebar", template: "./app/index.hbs" }),
]);

module.exports = commonConfig;

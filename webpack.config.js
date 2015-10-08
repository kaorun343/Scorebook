var webpack = require('webpack')

module.exports = {
  entry: "./src/app.ts",
  output: {
    filename: "./build/app.js"
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: "ts-loader" },
      { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ }
    ]
  },
  target: "atom"
}

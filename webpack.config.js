var webpack = require('webpack')
require('dotenv').load()

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "./public/app.js"
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: "ts-loader" },
      { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ },
      { test: /\.html$/, loader: "html-loader?minimize=false" }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      APPLICATION_ID: `"${process.env.APPLICATION_ID}"`,
      JAVASCRIPT_KEY: `"${process.env.JAVASCRIPT_KEY}"`,
      'process.env': {
        NODE_ENV: `"${process.env.NODE_ENV === 'production' ? 'production': 'development'}"`
      }
    })
  ]
}

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
      { test: /\.html$/, loader: "html-loader?minimize=false" },
      {
        test: /\.css$/,
        loader: 'style!css?sourceMap'
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css?sourceMap", "sass?sourceMap"]
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      }
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
  ],
  sassLoader: {
    includePaths: ["./node_modules/foundation-sites/scss"]
  }
}

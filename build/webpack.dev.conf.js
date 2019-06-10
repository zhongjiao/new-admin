'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const portfinder = require('portfinder')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true
    })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    open: config.dev.autoOpenBrowser,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    historyApiFallback: true, // true index.html upon 404, object for multiple paths
    // contentBase: resolve('public'), // static file location
    compress: true, // enable gzip compression
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    quiet: true,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new HtmlWebpackPlugin({
    //   template: 'public/index.html',
    //   filename: 'index.html',
    //   inject: true
    // // })
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'public/index.html',
    //   inject: true,
    //   favicon: resolve('public/favicon.1.ico'),
    //   title: 'vue-admin-template'
    // })
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      process.env.PORT = port
      devWebpackConfig.devServer.port = port
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${
                devWebpackConfig.devServer.host
              }:${port}`
            ]
          },
          onErrors: config.dev.notifyOnErrors
            ? utils.createNotifierCallback
            : undefined
        })
      )
      resolve(devWebpackConfig)
    }
  })
})
'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const glob = require('glob')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const purifyCssWebpack = require("purifycss-webpack")
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const env = require('../config/prod.env')

// For NamedChunksPlugin
const seen = new Set()
const nameLength = 4

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: utils.styleLoaders({
      sourceMap: process.env.NODE_ENV === 'test',
      extract: true,
      usePostCSS: true
    })
  },
  devtool: process.env.NODE_ENV === 'test' ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash:8].css'),
      chunkFilename: utils.assetsPath('css/[name].[contenthash:8].css')
    }),
    // new CleanWebpackPlugin(),
    new ScriptExtHtmlWebpackPlugin({
    }),
    new webpack.HashedModuleIdsPlugin(),
    new CopyWebpackPlugin([
      {
        from: resolve('static'),
        to: config.build.assetsSubDirectory
      }
    ]),
    // new purifyCssWebpack({
    //   // glob为扫描模块，使用其同步方法
    //   paths: glob.sync(resolve('public/*.html'))
    // })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          enforce: true,
          chunks: 'initial' // 只打包初始时依赖的第三方
        },
        elementUI: {
          name: 'chunk-elementUI',
          priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
          test: /[\\/]node_modules[\\/]element-ui[\\/]/
        }
      }
    },
    runtimeChunk: 'single',
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          mangle: true
        },
        sourceMap: process.env.NODE_ENV === 'test',
        cache: true,
        parallel: true
      }),
      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different components can be deduped.
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
            discardComments: {
              removeAll: true
            }
        }
      })
    ]
  }
})
if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' + config.build.productionGzipExtensions.join('|') + ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}


if (config.build.generateAnalyzerReport || config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin

  if (config.build.bundleAnalyzerReport) {
    webpackConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerPort: 8080,
        generateStatsFile: false
      })
    )
  }

  if (config.build.generateAnalyzerReport) {
    webpackConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'bundle-report.html',
        openAnalyzer: false
      })
    )
  }
}


module.exports = webpackConfig

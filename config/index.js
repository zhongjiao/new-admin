'use strict'

const path = require('path')

module.exports = {
  common: {
    needDll: true,
    publicPath: '/'
  },
  dev: {
    assetsSubDirectory: 'public',
    assetsPublicPath: '/',
    proxyTable: {},
    host: 'localhost',
    port: 8080,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: false, //编译错误的时候通知提示，需要friendly-errors-webpack-plugin 配合
    poll: false,
    useEslint: true,
    showEslintErrorsInOverlay: false,

    devtool: 'cheap-source-map',

    cssSourceMap: false
  },
  build: {

    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'assets',

    /**
     * You can set by youself according to actual condition
     * You will need to set this if you plan to deploy your site under a sub path,
     * for example GitHub pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then assetsPublicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     */
    assetsPublicPath: '/',

    productionSourceMap: false,

    devtool: 'source-map',
    
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report || false,
    generateAnalyzerReport: process.env.npm_config_generate_report || false
  }
}

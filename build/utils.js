'use strict'
const path = require('path')
const config = require('../config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const packageConfig = require('../package.json')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob')

function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

// 多页面
exports.multiPages = (function() {
  // 获取html-webpack-plugin参数的方法
  let getHtmlConfig = function(name, chunks) {
    let isDev = process.env.NODE_ENV === 'development'
    return {
      template: resolve(`public/${name}.html`),
      filename: isDev ? `${name}.html` : resolve(`dist/${name}.html`),
      favicon: resolve('public/favicon.ico'),
      inject: true,
      hash: !isDev, //开启hash  ?[hash]
      chunks: isDev ? [chunks] : [`runtime`, 'chunk-libs', 'chunk-elementUI', chunks],
      minify:
        isDev
          ? false
          : {
              removeComments: true, //移除HTML中的注释
              collapseWhitespace: true, //折叠空白区域 也就是压缩代码
              removeAttributeQuotes: true //去除属性引用
            }
    }
  }

  function getEntry() {
    let entry = {}
    //读取src目录所有page入口
    glob.sync(resolve('src/pages/**/index.js')).forEach(function(name) {
      let start = name.indexOf('src/') + 4,
        end = name.length - 3
      let n = name.slice(start, end)
      n = n.slice(0, n.lastIndexOf('/')) //保存各个组件的入口
      n = n.split('/')[1]
      entry[n] = ['@babel/polyfill', name]
    })
    return entry
  }

  //配置页面
  const entryObj = getEntry()
  const htmlArray = []
  Object.keys(entryObj).forEach(element => {
    htmlArray.push(
      new HtmlWebpackPlugin(getHtmlConfig(element, element))
    )
  })
  return {
    entryObj,
    htmlArray
  }
})()

exports.assetsPath = function(_path) {
  const assetsSubDirectory =
    process.env.NODE_ENV === 'production'
      ? config.build.assetsSubDirectory
      : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function(options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = []

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      loaders.push(MiniCssExtractPlugin.loader)
    } else {
      loaders.push('vue-style-loader')
    }

    loaders.push(cssLoader)

    if (options.usePostCSS) {
      loaders.push(postcssLoader)
    }

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    return loaders
  }
  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {
      indentedSyntax: true
    }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

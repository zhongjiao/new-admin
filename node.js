const semver = require('semver')
const shell = require('shelljs')
const portfinder = require('portfinder')
const pathToRegexp = require('path-to-regexp')
const hash = require('hash-sum')
const glob = require('glob')
const path = require('path')

function exec(cmd) {
  return require('child_process')
    .execSync(cmd)
    // .toString()
    // .trim()
}


function Uint8ArrayToString(fileData){
  var dataString = "";
  for (var i = 0; i < fileData.length; i++) {
    dataString += String.fromCharCode(fileData[i]);
  }
 
  return dataString
}

// console.log(shell.which('g'))

portfinder.getPort({
  port: 8080
}, (err, port) => {
  // if (err) {
  //   reject(err)
  // }
})
// portfinder.getPortPromise({
//   port: 8081
// })
//   .then(port => {
//     console.log('port: ', port)
//   })
//   .catch(err => {
//     console.log('err: ', err)
//   })

const regexp = pathToRegexp('/:foo/:bar')
regexp.exec('/test')

const joinedHash = hash()
function getEntry() {
  let entry = {}
  //读取src目录所有page入口
  glob.sync(path.resolve(__dirname, 'src/pages/**/index.js')).forEach(function(name) {
    let start = name.indexOf('src/') + 4,
      end = name.length - 3
    let n = name.slice(start, end)
    n = n.slice(0, n.lastIndexOf('/')) //保存各个组件的入口
    n = n.split('/')[1]
    entry[n] = name
  })
  console.log('entry: ', entry)
  return entry
}
getEntry()
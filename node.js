const semver = require('semver')
const shell = require('shelljs')
const portfinder = require('portfinder')
const pathToRegexp = require('path-to-regexp')
const hash = require('hash-sum')

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
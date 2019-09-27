const crypto = require('crypto')

function sha1(str) {
  return crypto.createHash('sha1').update(str).digest('hex')
}

function flatObj(obj) {
  return Object.keys(obj).reduce((newObj, key) => {
    newObj[key] = obj[key]['value']
    return newObj
  }, {})
}

function genTimeStamp() {
  return new Date().getTime()
}

exports.sha1 = sha1
exports.flatObj = flatObj
exports.genTimeStamp = genTimeStamp
const crypto = require('crypto')
const axios = require('axios')
const randomstring = require("randomstring")

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
  return Math.ceil((new Date().getTime())/1000)
}

function http({url}) {
  return axios({
    url
  }).then((result) => {
    return result.data
  })
}

function genNonceStr () {
  return randomstring.generate(32)
}

exports.sha1 = sha1
exports.flatObj = flatObj
exports.genTimeStamp = genTimeStamp
exports.http = http
exports.genNonceStr = genNonceStr
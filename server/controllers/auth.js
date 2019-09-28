var contentType = require('content-type')
var getRawBody = require('raw-body')
var convert = require('xml-js')

const config = require('../config/')
const tools = require('../utils/tools')

const auth = (ctx, next) => {
  let { signature, timestamp, nonce, echostr } = ctx.query
  let orderedQueryString = [ timestamp, nonce, config.token ].sort().join('')
  let mySignature = tools.sha1(orderedQueryString)

  ctx.body = mySignature === signature ? echostr : ''
}

const reply = async (ctx, next) => {
  let receivedMsgXML = (await getRawBody(ctx.req, {
    length: ctx.req.headers['content-length'],
    limit: '1mb',
    encoding: contentType.parse(ctx.req).parameters.charset
  })).toString()
  
  let receivedMsgJS = convert.xml2js(receivedMsgXML, {
    compact: true,
    cdataKey: 'value',
    textKey: 'value'
  }).xml

  let { ToUserName, FromUserName } = tools.flatObj(receivedMsgJS)

  await ctx.render('reply', {
    ToUserName,
    FromUserName,
    timestamp: tools.genTimeStamp(),
    replyText: '<a href="https://walter666.cn/">JSSDK</a>'
  })
}

module.exports = {
  auth,
  reply
}
const config = require('../config/')
const tools = require('../utils/tools')
const querystring = require('querystring')

module.exports = async (ctx, next) => {
  // 1、获取access_token
  let { appId, appsecret } = config
  let result_at = await tools.http({
    url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appsecret}`
  })
  let { access_token, expires_in } = result_at

  // 2、获取jsapi_ticket
  let result_jt = await tools.http({
    url: `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`
  })
  let { ticket } = result_jt

  // 3、生成签名 signature
  // 3.1 准备签名字段信息
  let noncestr = tools.genNonceStr()
  let timestamp = tools.genTimeStamp()

  // 3.2 对所有待签名参数按照字段名的ASCII 码从小到大排序
  let query = {
    noncestr,
    jsapi_ticket: ticket,
    timestamp,
    url: config.url
  }
  let orderedQuery = Object.keys(query).sort().reduce((newObj, key) => {
    newObj[key] = query[key]
    return newObj
  }, {})
  let string1 = querystring.stringify(orderedQuery, null, null, {
    encodeURIComponent: str => str
  })

  // 3.3 生成signature
  let signature = tools.sha1(string1)

  // 4 返回options
  ctx.body = {
    appId,
    timestamp,
    nonceStr: noncestr,
    signature
  }
}
const Koa = require('koa')

const path = require('path')

const bodyParser = require('koa-bodyparser')

const views = require('koa-views')

const static = require('koa-static')

const app = new Koa()

app.use(bodyParser())

// 加载模板引擎
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './public'

app.use(static(
  path.join( __dirname,  staticPath)
))

const Router = require('koa-router')
const router = new Router()
const auth = require('./router/auth')
router.use('/', auth.routes())
app.use(router.routes())

app.listen(3333, () => {
  console.log('localhost:3333')
})
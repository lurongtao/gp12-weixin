const Koa = require('koa')

const path = require('path')

const bodyParser = require('koa-bodyparser')

const views = require('koa-views')

const app = new Koa()

app.use(bodyParser())

// 加载模板引擎
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))

const Router = require('koa-router')
const router = new Router()
const auth = require('./router/auth')
router.use('/', auth.routes())
app.use(router.routes())

app.listen(3333, () => {
  console.log('localhost:3333')
})
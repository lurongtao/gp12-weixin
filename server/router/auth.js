const Router = require('koa-router')

const router = new Router()

const authController = require('../controllers/auth')
const jssdkController = require('../controllers/jssdk')

router.get('auth', authController.auth)
router.post('auth', authController.reply)
router.get('jssdk', jssdkController)

module.exports = router
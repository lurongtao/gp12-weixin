const Router = require('koa-router')

const router = new Router()

const authController = require('../controllers/auth')

router.get('auth', authController.auth)
router.post('auth', authController.reply)

module.exports = router
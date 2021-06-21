const express           = require('express')
const passportUse       = require('../app/middleware/passport')
const router            = express.Router()

const loginFailController = require('../app/controllers/loginFailController')

router.get('/', loginFailController.loginFail)

module.exports = router 
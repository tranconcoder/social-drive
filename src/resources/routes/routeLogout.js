const express               = require('express')
const router                = express.Router()
const notLogged             = require('../app/middleware/notLogged')

const logoutController = require('../app/controllers/logoutController')

router.get('/', notLogged,logoutController.logout)

module.exports = router 
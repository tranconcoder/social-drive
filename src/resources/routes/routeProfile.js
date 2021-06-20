const express               = require('express')
const router                = express.Router()
const notLogged             = require('../app/middleware/notLogged')

const profileController = require('../app/controllers/profileController')

router.get('/', notLogged, profileController.profilePage)

module.exports = router 
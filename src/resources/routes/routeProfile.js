const express               = require('express')
const router                = express.Router()
const notLogged             = require('../app/middleware/notLogged')
const checkPasswordUpdate   = require('../app/middleware/checkPasswordUpdate')

const profileController = require('../app/controllers/profileController')

router.get('/', notLogged, profileController.profilePage)
router.get('/change-password', notLogged, profileController.changePasswordPage)
router.post('/change-password', checkPasswordUpdate, profileController.changePassword)
router.post('/', profileController.profileUpdate)


module.exports = router 
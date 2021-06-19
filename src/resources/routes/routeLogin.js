const express           = require('express')
const passportUse       = require('../app/middleware/passport')
const router            = express.Router()

const loginController = require('../app/controllers/loginController')

router.get('/', loginController.loginPage)
router.post('/', passportUse)

module.exports = router 
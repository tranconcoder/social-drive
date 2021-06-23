const express           = require('express')
const passportUse       = require('../app/middleware/passport')
const router            = express.Router()
const cantLogAgain      = require('../app/middleware/cantLogAgain')

const loginController = require('../app/controllers/loginController')

router.get('/', cantLogAgain, loginController.loginPage)
router.post('/', passportUse)

module.exports = router;
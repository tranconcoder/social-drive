const express           = require('express')
const router            = express.Router()
const checkRegisterForm = require('../app/middleware/checkRegisterForm');

const registerController = require('../app/controllers/registerController')
 
router.get('/', registerController.registerPage)
router.post('/', checkRegisterForm, registerController.register)

module.exports = router 
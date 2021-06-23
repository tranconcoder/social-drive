const express           = require('express')
const router            = express.Router()
const APIController     = require('../app/controllers/APIController')

router.post('/register/checkUsername',  APIController.register.checkUsername)

module.exports = router;
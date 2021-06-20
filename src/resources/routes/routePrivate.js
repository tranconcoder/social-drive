const express               = require('express')
const router                = express.Router()
const notLogged             = require('../app/middleware/notLogged')

const privateController = require('../app/controllers/privateController')

router.get('/', notLogged, privateController.private)

module.exports = router 
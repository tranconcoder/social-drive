const express = require('express')
const router = express.Router()

const privateController = require('../app/controllers/privateController')

router.get('/', privateController.check, privateController.private)

module.exports = router 
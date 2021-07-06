const express               = require('express')
const router                = express.Router()

const myDocumentsController = require('../app/controllers/myDocumentsController.js')
const notLogged = require("../app/middleware/notLogged")

router.get('/', notLogged, myDocumentsController.index)

module.exports = router 
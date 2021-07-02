const express               = require('express')
const router                = express.Router()

const myDocumentsController = require('../app/controllers/myDocumentsController.js')

router.get('/', myDocumentsController.index)

module.exports = router 
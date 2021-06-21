const express               = require('express')
const router                = express.Router()

const siteController = require('../app/controllers/siteController')

router.get('/', siteController.home)
router.get('/:slug', (req, res, next) => {
    res.render('notFound')
})

module.exports = router 
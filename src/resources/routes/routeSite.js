const express = require('express')
const router = express.Router()

const siteController = require('../app/controllers/siteController')

router.get('/', (req, res, next) => {
    if (req.isAuthenticated()) {next()}
    else {res.send('Bạn chưa đăng nhập'); next()}
},siteController.home)

module.exports = router 
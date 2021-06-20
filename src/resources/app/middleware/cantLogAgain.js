const express           = require('express')
const app               = express()

function cantLogAgain (req, res, next) {
    if (!req.user) {
        next()
    } else{
        res.redirect('/profile')
    }
}

module.exports = cantLogAgain
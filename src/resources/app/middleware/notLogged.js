const express           = require('express')
const app               = express()

function notLogged (req, res, next) {
    if (req.user) {
        next()
    } else{
        res.redirect('/login')
    }
}

module.exports = notLogged
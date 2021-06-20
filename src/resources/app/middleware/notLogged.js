const express           = require('express')
const app               = express()

function notLogged (req, res, next) {
    if (req.user) {
        next()
    } else{
        res.render('notLogged')
    }
}

module.exports = notLogged
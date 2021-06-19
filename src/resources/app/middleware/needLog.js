const express           = require('express')
const app               = express()
const LocalStrategy     = require('passport-local').Strategy
const session           = require("express-session")
const passport          = require('passport')
const router            = express.Router()

router.get('/', function (req, res, next) {
    if (req.isAuthenticated) {
        
    }
})
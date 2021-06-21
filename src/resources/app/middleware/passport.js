const express           = require('express')
const app               = express()
const LocalStrategy     = require('passport-local').Strategy
const session           = require("express-session")
const passport          = require('passport')
const router            = express.Router()

// models
const auther = require('../../models/auther')

router.use(session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: true,
}))
router.use(passport.initialize())
router.use(passport.session())
passport.use(new LocalStrategy(
    function(username, password, done) {
      auther.findOne({ username: username }, function(err, user) {
        if (err) { return done(err) }
        if (!user) {
          return done(null, false)
        }
        if (!(user.password === password)) {
          return done(null, false)
        }
        return done(null, user)
      })
    }
))

router.post('/',
    passport.authenticate('local',
        { successRedirect: '/',
        failureRedirect: '/login-fail',}
))

passport.serializeUser(function(user, done) {
    done(null, user)
})

passport.deserializeUser(function(user, done) {
  auther.findOne({_id: user._id})
    .then(user => {
      done(null, user)
    })
})

module.exports = router
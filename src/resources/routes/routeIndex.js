const api                  = require('./routeAPI')
const site                 = require('./routeSite')
const login                = require('./routeLogin')
const register             = require('./routeRegister')
const private              = require('./routePrivate')
const logout               = require('./routeLogout')
const profile              = require('./routeProfile')
const loginFail            = require('./routeLoginFail')

function route(app) {

   app.use('/login',login)
   app.use('/login-fail',loginFail)
   app.use('/register',register)
   app.use('/logout',logout)
   app.use('/private', private)
   app.use('/profile', profile)
   app.use('/api', api)
   app.use('/', site)

}

module.exports = route
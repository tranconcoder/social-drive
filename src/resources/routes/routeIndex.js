const api                  = require('./routeAPI')
const site                 = require('./routeSite')
const login                = require('./routeLogin')
const register             = require('./routeRegister')
const logout               = require('./routeLogout')
const profile              = require('./routeProfile')
const loginFail            = require('./routeLoginFail')
const myDocuments          = require('./routeMyDocuments')

function route(app) {

   app.use('/login',login)
   app.use('/login-fail',loginFail)
   app.use('/register',register)
   app.use('/logout',logout)
   app.use('/profile', profile)
   app.use('/my-documents', myDocuments)
   app.use('/api', api)
   app.use('/', site)

}

module.exports = route
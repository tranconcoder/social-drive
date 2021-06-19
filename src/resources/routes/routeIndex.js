const site                 = require('./routeSite')
const login                = require('./routeLogin')
const register             = require('./routeRegister')
const private              = require('./routePrivate')
const logout               = require('./routeLogout')

function route(app) {

   app.use('/login',login)
   app.use('/register',register)
   app.use('/logout',logout)
   app.use('/private', private)
   app.use('/', site)
}

module.exports = route
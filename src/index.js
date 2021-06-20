const passportUse       = require('./resources/app/middleware/passport')
const LocalStrategy     = require('passport-local').Strategy
const handlebars        = require('express-handlebars')
const session           = require("express-session")
const passport          = require('passport')
const express           = require('express')
const path              = require('path')
const app               = express()
const port              = 3000
const morgan            = require('morgan')



//Static file in path: src/resources/public
app.use(express.static(path.join(__dirname, 'resources/public')))

//POST Method [body]
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Morgan
app.use(
  morgan(' :remote-user [:date[clf]] :response-time ms       ":method"')
)
//HandleBars
app.engine('hbs', handlebars({
  extname: ".hbs",
  helpers: {
    stem: (filepath) => {
      if (typeof filepath !== 'string') {
        throw new TypeError(utils.expectedType('filepath', 'string', filepath))
      }
      return path.basename(filepath, path.extname(filepath))
    }
  }
}))
app.set('view engine', 'hbs')  
app.set('views', path.join(__dirname, 'resources/views'))

//Database
const db = require('./resources/config/db/index')
db.connect()
const auther = require('./resources/models/auther')

//PassPort
app.use(session({
  secret: "mySecret",
  resave: false,
  saveUninitialized: true,
}))
app.use(passport.initialize());
app.use(passport.session());

//Route
const route = require('./resources/routes/routeIndex')
route(app)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
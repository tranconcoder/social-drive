const LocalStrategy     = require('passport-local').Strategy
const handlebars        = require('express-handlebars')
const session           = require("express-session")
const passport          = require('passport')
const express           = require('express')
const morgan            = require('morgan')
const path              = require('path')
const app               = express()
const port              = 3000
const hostname          = '0.0.0.0'
const db                = require('./resources/config/db/index')


//MongoDB Connect
db.connect()

//Models
const auther = require('./resources/models/auther')

//Static file in path: src/resources/public
app.use(express.static(path.join(__dirname, 'resources/public')))

//POST Method [body]
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Morgan
app.use(morgan('combined'))

//HandleBars
app.engine('hbs', handlebars({
  extname: ".hbs",
}))  
app.set('view engine', 'hbs')  
app.set('views', path.join(__dirname, 'resources/views'))

//Route
const route = require('./resources/routes/routeIndex')
route(app)

app.listen(port, hostname, () => {
  console.log(`Example app listening at http://${hostname}:${port}`)
})
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Authers = new Schema({
   name:  {type: String, required: true},
   username:  {type: String, required: true},
   password: {type: String, required: true}, 
   gmail: {type: String, required: true},
   registerAt: {type: Date, default: Date.now}
})
module.exports = mongoose.model('Auther', Authers)
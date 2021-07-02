const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Auther = new Schema({
   name:  {type: String, required: true},
   username:  {type: String, required: true},
   password: {type: String, required: true}, 
   gmail: {type: String, required: true},
   avatar: {type: Boolean, default: false},
   registerAt: {type: Date, default: Date.now},
   lastLoginAt: {type: Date, default: Date.now},
})
module.exports = mongoose.model('Auther', Auther)
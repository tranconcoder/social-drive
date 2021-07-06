const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Auther = new Schema({
  name: { type: String, minLength: 6, maxLength: 40, required: true },
  username: { type: String, minLength: 6, maxLength: 16, required: true },
  password: { type: String, minLength: 8, maxLength: 30, required: true },
  gmail: { type: String, maxLength: 50, required: true },
  avatar: { type: Boolean, default: false, required: true },
  registerAt: { type: Date, default: Date.now },
  lastLoginAt: { type: Date },
});

module.exports = mongoose.model("Auther", Auther);

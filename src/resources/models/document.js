const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Document = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  locate: { type: String, required: true },
  uploadAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Document", Document);

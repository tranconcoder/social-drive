const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Document = new Schema({
  userId: { type: String, maxLength: 24, required: true },
  name: { type: String, maxLength: 200, required: true },
  application: {
    type: String,
    enum: ["word", "excel", "powerPoint"],
    required: true,
  },
  size: { type: Number, maxLength: 20, required: true },
  locate: { type: String, maxLength: 512, required: true },
  mode: { type: String, enum: ["public", "private"], required: true },
  uploadAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Document", Document);

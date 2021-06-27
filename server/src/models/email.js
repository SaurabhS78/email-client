const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  to: {
    type: String,
    required: true,
  },
  cc: String,
  subject: String,
  html: {
    type: String,
    required: true,
  },
  option: {
    type: Number,
    required: true,
  },
  day: {
    type: Number,
    default: 1,
  },
  date: {
    type: String,
    default: "2020-08-08",
  },
  time: {
    type: String,
    default: "00:00",
  },
});

const Email = mongoose.model("Email", emailSchema);

module.exports = Email;

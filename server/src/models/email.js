const mongoose = require("mongoose");
const cron = require("node-cron");

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

  cronExpression: {
    type: String,
    default: "",
  },

  isScheduled: {
    type: Boolean,
    default: true,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  history: [
    {
      type: String,
    },
  ],
});

const Email = mongoose.model("Email", emailSchema);

module.exports = Email;

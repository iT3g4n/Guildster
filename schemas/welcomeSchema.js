const mongoose = require("mongoose");

const welcomeSchema = new mongoose.Schema({
  _id: String,
  channelId: String,
  message: String,
});

module.exports = mongoose.model('welcomes', welcomeSchema);
const mongoose = require("mongoose");

const reqANDunString = {
  type: String,
  required: true,
  unique: false,
};

const giveawaySchema = new mongoose.Schema({
  guildId: reqANDunString,
  channelId: reqANDunString,
  messageId: reqANDunString,
  tag: reqANDunString,
  time: {
    type: Number,
    required: true,
    unique: false,
  },
});

module.exports = mongoose.model("giveaways", giveawaySchema);

const mongoose = require("mongoose");

const automodSchema = mongoose.Schema({
  _id: String,
  enabled: String,
});

module.exports = mongoose.model("automod", automodSchema);

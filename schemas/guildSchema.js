const mongo = require(`../mongo`);
const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    _id: String,
    Logs: String,
    Prefix: String
});

module.exports = mongoose.model('guilds', guildSchema);
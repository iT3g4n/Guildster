const mongo = require(`../mongo`);
const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    Guild: String,
    Logs: String,
    Prefix: String
});

module.exports = mongoose.model('guilds', guildSchema);
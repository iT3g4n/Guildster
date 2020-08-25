const mongo = require(`../mongo`);
const mongoose = require('mongoose');
mongo();

const guildSchema = mongoose.Schema({
    Guild: String,
    Logs: String
});

module.exports = mongoose.model('guilds', guildSchema);
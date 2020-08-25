const mongoose = require('mongoose')

let guildSchema = new mongoose.Schema({
    _id: String,
    logChannel: String,
})

module.exports = mongoose.model('guilds', guildSchema)
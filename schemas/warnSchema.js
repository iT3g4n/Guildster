const mongoose = require('mongoose')
const reqString = { type: String, required: true }


const warnSchema = new mongoose.Schema({
    userId: String,
    guildId: String,
    warnings: Array,
    moderatorId: String
})

module.exports = mongoose.model('warnings', warnSchema);
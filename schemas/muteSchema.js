const { Schema, model, SchemaTypes } = require('mongoose');

const reqString = {
    type: String,
    required: true
}

const muteSchema = new Schema({
    guildId: reqString,
    userId: reqString,
    modId: reqString,
    roleId: reqString,
    expires: Number
})

module.exports = model('mutes', muteSchema);
const mongo = require(`../mongo`);
const mongoose = require(`mongoose`);

const warnSchema = mongoose.Schema({
    Warns: [Object],
    User: String,
    Guild: String
});

module.exports = mongoose.model('warns', warnSchema);
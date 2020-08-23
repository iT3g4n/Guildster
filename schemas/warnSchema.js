const mongoose = require('mongoose')
const reqString = {
    type: String,
    required: true
}

const warnSchema = new mongoose.Schema({
    userId: reqString,
    reasons: {
        Array, required: true
    },
    moderatorId: reqString
})

module.exports = mongoose.model('Warnings', warnSchema);
const mongoose = require('mongoose');

const reqstring = {
    type: String,
    required: true,
};

const thanksSchema = new mongoose.Schema({
    _id: reqstring,
    userId: reqstring,
    recieved: {
        type: Number,
        default: 0,
    },
    lastGave: Date
});

module.exports = mongoose.model('thanks', thanksSchema);
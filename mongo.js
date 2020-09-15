const mongoose = require(`mongoose`)
require(`dotenv`).config()

module.exports = async() => {
    await mongoose.connect(`${process.env.MONGOPATH}`, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, keepAlive: true })
    return mongoose;
};
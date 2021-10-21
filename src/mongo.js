const mongoose = require(`mongoose`);
require(`dotenv`).config();

module.exports = async () => {
  await mongoose.connect(`${process.env.MONGOPATH}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    keepAlive: true,
  });
  return mongoose;
};

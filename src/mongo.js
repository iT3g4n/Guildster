const mongoose = require(`mongoose`);
require(`dotenv`).config();

// ${process.env.MONGOPATH}

module.exports = async () => {
  await mongoose.connect(`mongodb+srv://Tegan:8Oo0pGuj41bW@cluster0.xsvkz.gcp.mongodb.net/stuff`, {
    // useUnifiedTopology: true,
    // useNewUrlParser: true,
    keepAlive: true,
  });
  return mongoose;
};

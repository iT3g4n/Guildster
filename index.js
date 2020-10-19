require('dotenv').config()
module.exports.bot = require(`./Bot`);
module.exports.bot.start(process.env.TOKEN);
require("./mongo")().then(() => console.log('MongoDB Ready!'));
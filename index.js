module.exports.bot = require(`./Bot`);
module.exports.bot.start();
require("./mongo")().then(() => console.log('MongoDB Ready!'));
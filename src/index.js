const { BotClient } = require("./Bot");

const bot = new BotClient();
module.exports.bot = bot;
bot.start();

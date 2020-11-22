const { BotClient } = require("./Bot");

require("dotenv").config();
const bot = new BotClient();
module.exports.bot = bot;
bot.start();

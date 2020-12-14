const { Message, Client } = require("discord.js");
require("dotenv").config();
const twitch = require("twitch");
const { bot: params } = require("../../index");

module.exports = {
  name: "Test",
  aliases: ["t"],
  catagory: "owner",
  usage: "[command] [whatever]",
  description: "This is just for testing commands and such.",
  /**
   * @param {params} bot
   * @param {Message} message
   * @param {String[0]} args
   */
  run: async (bot, message, args) => {
    if (!bot.owners.includes(message.author.id)) return;
  },
};

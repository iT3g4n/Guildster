const { bot: params } = require("../../index");
const { Message } = require("discord.js");
/**
 * @param {params} bot
 * @param {Message} message
 * @param {String[]} args
 */
const run = function (bot, message, args) {
  const queue = bot.queue;
  if (!queue[message.guild.id])
    return bot.e("This server has nothing in the queue!", true);

  message.channel.send(
    `Queue for ${message.guild.name}:\n${queue[message.guild.id]}`
  );
};

module.exports = {
  run,
  name: "Queue",
  description: "Gets the queue for your guild!",
  catagory: "music",
  usage: "[command]",
  aliases: [],
};

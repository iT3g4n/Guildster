const { MessageEmbed, Message } = require("discord.js");
const { bot } = require("../../index");

this.name = "Accept";
this.description = "Accept a suggestion!";
this.aliases = [];
this.catagory = "suggestions";
this.usage = "[command] [message id]";

/**
 * @param {Message} message
 * @param {Array} args
 */
this.run = async function (a, message, args) {

  message.delete()
  
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.reply(bot.error("You do not have enough permissions!"));
  const msg = await message.channel.messages.fetch(args[0]);
  if (!msg) return message.reply(bot.error());

  if (!msg.editable)
    return message.reply(bot.error("I cannot edit that message!"));
  msg.edit(
    new MessageEmbed()
      .setAuthor(
        msg.embeds[0].author.name,
        msg.embeds[0].author.iconURL
      )
      .setColor("GREEN")
      .setTimestamp(msg.embeds[0].timestamp)
      .setDescription(msg.embeds[0].description)
      .setFooter(`Accepted Idea`)
  );

  message.author.send(msg.embeds[0].description).catch()
};

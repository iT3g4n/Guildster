const { Message } = require("discord.js");
const { bot } = require("../../index");
const guilds = require("../../schemas/guildSchema");

this.name = "Setsuggestions";
this.catagory = "suggestions";
this.aliases = ["ss", "suggestions", "suggestchannel", "setsuggestionchannel"];
this.description = "Sets the suggestions channel for this server!";
this.usage = "[command] [channel mention or id]";

/**
 * @param {Message} message
 * @param {Array} args
 */
this.run = async function (a, message, args) {
  const { guild, channel, member } = message;

  if (!member.hasPermission("ADMINISTRATOR"))
    return channel.send(bot.error("You do not have enough permissions!"));

  const ch =
    message.mentions.channels.first() ||
    message.guild.channels.cache.get(args[0]) ||
    message.channel;

  await guilds.findOneAndUpdate(
    {
      _id: guild.id,
    },
    {
      _id: guild.id,
      Suggestions: ch.id,
    },
    {
      upsert: true,
    }
  );

  channel.send(
    bot.e("Success! I have set the suggestion channel to <#" + ch.id + ">")
  );
};

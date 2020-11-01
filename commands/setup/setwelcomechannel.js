const { Message } = require("discord.js");
const { bot } = require("../../index");
const welcomeSchema = require("../../schemas/welcomeSchema");

/**
 * @param {Message} message
 * @param {Array} args
 */
const run = async (a, message, args) => {
  message.channel.send(
    "Just a reminder, if you want the bot to mention the new user, put `<@>` where you want to mention them!"
  ).then(m => m.delete({ timeout: 10000 }).catch(e => console.error(e)));

  const channel =
    message.mentions.channels.first() ||
    message.guild.channels.cache.get(args[0]);
  if (!channel)
    return message.reply(
      bot.error("You did not mention a channel! " + module.exports.usage)
    );

  const msg =
    args.slice(1)
      ? args.slice(1).join(" ")
      : `Welcome to ${message.guild.name}, <@>|`;

  await welcomeSchema.findOneAndUpdate({ _id: message.guild.id }, {
    _id: message.guild.id,
    channelId: channel.id,
    message: msg,
  }, {
    upsert: true,
  });

  message.channel.send(bot.e(`I have set the welcome channel to ${channel} with the message of \`${message}\``));
};

module.exports = {
  run,

  name: "Setwelcomechannel",
  description: "Set's the welcome channel!",
  usage:
    '[command] [channel mention or id] [message or "Welcome to (server name), (user mention)!"',
  aliases: ["swc"],
  catagory: "setup",
};

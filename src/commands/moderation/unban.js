const { MessageEmbed, Client, Message } = require("discord.js");
const { bot: params } = require("../../index");

module.exports = {
  name: "Unban",
  aliases: [],
  catagory: "moderation",
  description: "This unbans a user!",
  usage: "[command] [user id]",
  /**
   * @param {params} bot
   * @param {Message} message
   * @param {String[]} args
   */
  run: async function (bot, message, args) {
    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.reply(bot.error("You do not have enough permissions!"));
    if (!message.guild.me.hasPermission("BAN_MEMBERS"))
      return message.reply(
        bot.error("I do not have enough permissions to do that!")
      );

    const mention = await message.guild.fetchBan(args[0]);
    if (!mention)
      return message.reply(
        bot.error("That person does not seem to be banned in this server!")
      );

    message.guild.members.unban(mention.user);
    bot.e("I have successfully unbanned " + mention.user.tag + "!", true);
  },
};

const { bot } = require("../../index");
const { Message } = require("discord.js");
const schema = require("../../schemas/automodschema");

module.exports = {
  name: "Enable",
  description: "Enable automod!",
  aliases: [],
  usage: "[command]",
  catagory: "automod",
  /**
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (a, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.reply(bot.error("You can't run this command!"));

    try {
      await schema.findOneAndUpdate(
        {
          _id: message.guild.id,
        },
        {
          _id: message.guild.id,
          enabled: true,
        },
        {
          upsert: true,
        }
      );
      message.channel.send(bot.embed.setDescription("Automod has now been turned on!"));
    } catch (e) {
      console.error(e);
      message.channel.send(
        bot.error("I'm sorry! An unknows error has occured!")
      );
    }
  },
};

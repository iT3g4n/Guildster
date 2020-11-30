const { Message } = require("discord.js");
const { bot: params } = require("../../index");

const all = function (bot, message, args) {
  try {
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
      message.channel.send(
        bot.error("I do not have enough permissions to do that!")
      );
      return;
    }

    message.channel.clone();

    if (!message.channel.deletable) {
      message.channel.send(
        bot.error("I do not have enough permissions to do that!")
      );
      return;
    }
    message.channel.delete();
  } catch (e) {
    console.error;
    message.channel.send("");
    return;
  }
  return module.exports;
};

module.exports = {
  name: "purge",
  aliases: ["delete", "del"],
  catagory: "moderation",
  usage: "[command] amount",
  description:
    "Deletes the specified amount of messages from the channel of the message!",
  /**
   * @param {params} bot
   * @param {Message} message
   * @param {String[]} args
   */
  async run(bot, message, args) {
    if (!message.member.hasPermission(`MANAGE_MESSAGES`)) return;

    if (!args[0])
      return message.channel.send("Please mention an amount to purge.");

    if (args[0].toLowerCase() == "all") {
      all(bot, message, args);
      return;
    }

    if (isNaN(args[0][0])) return message.channel.send("That is not a number!");

    if (parseInt(args[0]) > 99)
      return bot.e("The best i can do is 99 messages, sorry.", true);

    try {
      message.channel.bulkDelete(parseInt(args[0]) + 1);
    } catch {
      console.error;
      message.channel.send(
        bot.error(
          "Sorry! Those messages seem to be older than i can delete, or I do not have enough permissions!"
        )
      );
    }
  },
};

const { Message } = require("discord.js");
const { bot: params } = require("../../index");

/**
 * @param {params} bot
 * @param {Message} message
 * @param {String[]} args
 */
const all = async function (bot, message, args) {
  const { channel } = message;

  if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
    message.channel.send(
      bot.error("I do not have enough permissions to do that!")
    );
    return;
  }

  if (!message.channel.deletable) {
    message.channel.send(
      bot.error("I do not have enough permissions to do that!")
    );
    return;
  }
  const ch = await channel.clone().catch((e) => {
    message.channel.send(
      bot.error(
        "I cannot seem to create this channel again! I don't have enough permissions!"
      )
    );

    return e;
  });
  channel.delete().catch((e) => {
    message.channel.send(
      bot.error(
        "I cannot seem to delete this channel! I don't have enough permissions!"
      )
    );

    return e;
  });
  ch.setPosition(channel.position).catch((e) => {
    message.channel.send(
      bot.error(
        "I cannot seem to set the position of this channel! I don't have enough permissions!"
      )
    );

    return e;
  });
};

module.exports = {
  name: "purge",
  aliases: ["delete", "del"],
  catagory: "moderation",
  usage: '[command] [number or "all"]',
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

const { Message } = require("discord.js");
const { bot: params } = require("../../index");

module.exports = {
  name: "Report",
  aliases: ["reporterror"],
  catagory: "info",
  usage: "[command] [report]",
  description: "Report an error to me (T3g4n)!",
  /**
   * @param {params} bot
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (bot, message, args) => {
    if (!args[2])
      return bot.e(
        `Please make your report longer, and remember, this command is only to be used with reporting errors and concerns for me (${bot.user.username})`,
        true
      );

    bot.owners.forEach((owner) => {
      bot.users.cache
        .get(owner)
        .send(bot.e("A new report has been submitted:\n" + args.join(" ")))
        .catch(console.error);
    });

    bot.e(
      `Your report has been sent to <@${bot.owners.join("> and <@")}>!`,
      true
    );
  },
};

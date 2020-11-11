const { Message } = require("discord.js");
const Trello = require("trello");
const trello = new Trello(process.env.TRELLOKEY, process.env.TRELLOTOKEN);

const params = require("../../index").bot;

module.exports = {
  name: "Botsuggest",
  aliases: ["error", "suggesterror", "reporterror", "botreport"],
  usage: "[command] [suggestion]",
  description:
    "Suggest a new command or an error for this bot! It also posts it to Trello!",
  catagory: "info",
  /**
   * @param {params} bot
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (bot, message, args) => {
    if (!args[3])
      return message.reply(
        bot.error("I'm sorry! That suggestion is too short!")
      );

    await trello.addCard(
      message.author.tag,
      args.join(" "),
      "5faaaaea390e6834178cc71b",
      function (error, trelloCard) {
        if (error) {
          console.error(error);
          message.channel.send(
            bot.error(
              "I'm sorry. An unknown error occured. Please report it with `" +
                bot.prefixes.get(message.guild.id) +
                "report`. Thank You! "
            )
          );
        } else {
          bot.e(
            `The suggestion has been added to Trello. You can check it out on Trello [here.](${trelloCard.url})`,
            true
          );
        }
      }
    );
  },
};

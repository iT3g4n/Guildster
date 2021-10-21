const { bot: params } = require("../../index");
const { blacklistedWords: words } = params;
const { Message } = require("discord.js");

/**
 * @param {params} bot
 * @param {Message} message
 * @param {String[]} args
 */
function run(bot, message, args) {
  function error(desc) {
    return message.reply(bot.error(desc));
  }

  if (!args[0]) return error("You didn't give me anything to say!");

  const check = () => {
    let statment = false;

    const arg = args.join(" ");
    words.forEach((word) => {
      if (
        arg.toLowerCase().toString().includes(word.toString().toLowerCase())
      ) {
        statment = true;
      }
    });

    return statment;
  };

  if (check() == true) return error("Hey I'm not allowed to swear!");

  bot.e(args.join(" "), true);
}

module.exports = {
  name: "Say",
  description: "Says whatever you put after the command!",
  usage: "[command] [literally anything]",
  aliases: [],
  catagory: "fun",
  run,
};

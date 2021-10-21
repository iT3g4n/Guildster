const { Message } = require("discord.js");
const { bot: params } = require("../../index");
const Client = require("fortnite");
const fortnite = new Client(process.env.FORTNITETOKEN);

/**
 * @param {params} bot
 * @param {Message} message
 * @param {String[]} args
 */
const run = async (bot, message, args) => {
  const msg = await message.channel.send(bot.e("Fetching Stats..."));

  if (!args[0])
    return msg.edit(
      bot.error(
        `You did not provide any arguments!\nUsage: ${module.exports.usage}`
      )
    );

  const options = ["pc", "xbox", "ps4", "psn", "nintendo", "mobile", "phone"];

  function getPlatform() {
    let platfrom = "pc";
    options.forEach((platform) => {
      let last = args.slice(-1).join(" ");
      if (platform.toLowerCase() === last.toLowerCase()) {
        return (platfrom = platform);
      } else {
      }
    });
    return platfrom;
  }

  const platform = getPlatform();

  const username = args.join(" ").split(` ${platform}`)[0].toString();
  if (username.length >= 17)
    return msg.edit(
      bot.error("That username is too long! Please try another.")
    );

  const user = await fortnite.user(username, platform);
  if (user == undefined)
    return msg.edit(bot.error("I couldn't find that person!"));

  const stats = user.stats;
  if (stats == undefined)
    return msg.edit(bot.error("That person does not have enough data!"));

  msg.edit(
    bot.embed
      .setAuthor(`Stats for ${user.username} on platform ${user.platform}`)
      .addField(
        "Solo",
        `KD: ${stats.solo.kd}\nWins: ${stats.solo.wins}\nMatches: ${stats.solo.matches}`,
        true
      )
      .addField(
        "Duos",
        `KD: ${stats.duo.kd}\nWins: ${stats.duo.wins}\nMatches: ${stats.duo.matches}`,
        true
      )
      .addField(
        "Squads",
        `KD: ${stats.squad.kd}\nWins: ${stats.squad.wins}\nMatches: ${stats.squad.matches}`,
        true
      )
  );
};

module.exports = {
  name: "Fortnite",
  description: "Get stats for a fortnite player!",
  usage: "[command] [username] [pc, xbox, or ps4]",
  aliases: [],
  catagory: "misc",
  run,
};

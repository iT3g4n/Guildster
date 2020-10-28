const { MessageEmbed, Client, Message } = require("discord.js");
const ms = require("ms");
module.exports = {
  name: "GA",
  aliases: ["giveaway", "start", "g", "give"],
  description: "Creates a giveaway in the channel of the message!",
  catagory: "giveaways",
  usage: "[command] [time] [prize]",
  /**
   * @param {Client} bot
   * @param {Message} message
   * @param {String[]} args
   */
  async run(bot, message, args) {
    if (!message.member.permissionsIn(message.channel).has('MANAGE_MESSAGES')) return message.reply(bot.e('You do not have enough permissions to run this command!'));

    if (!args[0])
      return message.channel.send(this.usage).then((msg) => {
        msg.delete({ timeout: 10000 });
      });
    if (
      !args[0].endsWith("d") &&
      !args[0].endsWith("h") &&
      !args[0].endsWith("m") &&
      !args[0].endsWith("s")
    )
      return message.channel
        .send(
          "Please specify the amount of time before the giveaway ends. " +
            require("./ga").usage
        )
        .then((msg) => {
          msg.delete({ timeout: 6000 });
        });
    if (isNaN(args[0][0]))
      return message.channel.send("That is not a number!").then((msg) => {
        msg.delete({ timeout: 5000 });
      });

    const prize = args.slice(1).join(" ");
    if (!prize)
      return message.channel
        .send("No prize was given. Aborting Command")
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });

    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("🎁  GIVEAWAY TIME  🎁")
      .setDescription(`Prize: **${prize}**`)
      .setFooter(`Giveaway Started By ${message.author.tag}. ends`)
      .setTimestamp(Date.now() + ms(args[0]));

    const msg = await message.channel.send(embed);
    await msg.react("🎁");
    setTimeout(() => {
      const thing = msg.reactions.cache.get("🎁");
      const winner = thing.users.cache.filter((u) => !u.bot).random();
      if (!winner)
        return message.channel.send("Nobody won the giveaway. How sad.");
      message.channel.send(
        `**CONGRATULATIONS** ${winner}**!** You have won \`${prize}\`!`
      );
    }, ms(args[0]));
  },
};

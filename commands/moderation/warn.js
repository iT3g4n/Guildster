const { Client, Message, MessageEmbed } = require("discord.js");
const { bot } = require("../../index");
const warns = require(`../../schemas/warnSchema`);
const guilds = require(`../../schemas/guildSchema`);

module.exports = {
  name: "Warn",
  aliases: ["w"],
  catagory: "moderation",
  description: "Warns the mentioned user!",
  usage: "[command] [mention or id] [reason]",

  /**
   * @param {Client} _a
   * @param {Message} message
   * @param {String[]} args
   */

  async run(_a, message, args) {
    if (!message.member.hasPermission(`MANAGE_MESSAGES`))
      return message
        .reply(bot.error("You do not have enough permissions!"))
        .then((message) => message.delete({ timeout: 5000 }));
    const mention =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!mention && !mrid)
      return message.channel.send(bot.error(`You did not mention anyone.`));

    const reason = args.slice(1).join(" ");
    if (!reason)
      return message.channel.send(bot.error(`You did not specify a reason.`));

    const msg = await message.channel.send(
      bot.embed.setDescription(`Warning ${mention.user.tag}...`)
    );

    await warns.findOneAndUpdate(
      {
        User: mention.id,
        Guild: message.guild.id,
      },
      {
        User: mention.id,
        Guild: message.guild.id,
        $push: {
          Warns: [
            {
              Moderator: message.author.id,
              Reason: reason,
            },
          ],
        },
      },
      { upsert: true }
    );

    await msg.edit(
      bot.embed.setDescription(
        `${mention.user.tag} has been succesfully warned with the reason of \`${reason}\``
      )
    );

    mention.send(
      new MessageEmbed()
        .setColor("TEAL")
        .setAuthor(
          `You have been warned in ${message.guild.name}`,
          message.guild.iconURL({ dynamic: true, size: 2048 })
        )
        .setDescription(
          `**Hello, ${
            (await mention.user.fetch()).username
          }!**\nYou have been warned in ${
            message.guild.name
          } for \`${reason}\`\nPlease follow the rules in the future!`
        )
        .setFooter(
          `Moderator ID: ${message.author.id}`,
          message.author.avatarURL({ dynamic: true })
        )
    );

    const embed = new MessageEmbed()
      .setAuthor(
        `New Warning`,
        mention.user.displayAvatarURL({ dynamic: true })
      )
      .addField(`User`, `<@${mention.id}>`, true)
      .addField(`Moderator`, `<@${message.author.id}>`, true)
      .addField(`Reason`, `${reason}`)
      .setColor(`YELLOW`);
    const result = await guilds.findOne({ _id: message.guild.id });
    if (!result) return;
    bot.channels.cache.get(result.Logs).send(embed);
  },
};

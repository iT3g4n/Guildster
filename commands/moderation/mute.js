const { Message, MessageEmbed } = require("discord.js");
const { bot } = require("./../../index");
const guildSchema = require("./../../schemas/guildSchema");
const muteSchema = require("./../../schemas/muteSchema");
const ms = bot.ms;

this.name = "Mute";
this.aliases = ["silence", "shut", "sh", "stop"];
this.catagory = "moderation";
this.usage = "[command] [mention or id] [time (s, m, h, d, y, m)] [reason]";
this.description = "Mutes the mentioned person!";
/**
 * @param {Message} message
 * @param {String[]} args
 */
this.run = async (asdfasdfasdfadsf, message, args) => {
  if (!message.member.hasPermission("MANAGE_ROLES"))
    return message
      .reply(
        bot.embed.setDescription(
          "You do not have enough permissions, " + message.author
        )
      )
      .then((m) => m.delete({ timeout: 5000 }));

  const mention =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);
  if (!mention)
    return message.channel.send(
      bot.error(
        `You didn\'t mention anyone! Usage: ${this.usage}`
      )
    );

  const muterole = message.guild.roles.cache.find(
    (r) => r.name.toLowerCase() === "muted"
  );
  if (!muterole)
    return message.channel
      .send(
        bot.e(
          `This server does not have a \'Muted\' role! Please create a role with the exact name \`Muted\`.`
        )
      )
      .then((m) => m.delete({ timeout: 20000 }));

      if(isNaN(args[1][0])) return message.channel.send(bot.error())

  const time = ms(args[1]);
  const date = Date.now() + time;
  if (!time)
    return message.reply(
      bot.embed.setDescription(
        `You did not specify a time! Usage: ${this.usage}`
      )
    );

  if (isNaN(args[1][0]))
    return message.reply(
      bot.embed.setDescription(`That is not a time. Usage: ${this.usage}`)
    );

  let reason = args.slice(2).join(" ");
  if (!reason) reason = "No Reason Specified";

  mention.roles.add(muterole, reason);

  message.reply(
    bot.embed.setDescription(`Successfully Muted <@${mention.id}>`)
  );

  await muteSchema.findOneAndUpdate(
    {
      _id: message.guild.id,
      userId: mention.id,
    },
    {
      _id: message.guild.id,
      userId: mention.id,
      modId: message.author.id,
      roleId: muterole.id,
      expires: date,
    },
    {
      upsert: true,
    }
  );

  const channel = await guildSchema.findOne({ _id: message.guild.id });
  if (!channel.Logs) return;
  const sendchannel = channel.Logs;

  const embed = new MessageEmbed()
    .setTitle(`User Muted`)
    .addField(`User`, mention, true)
    .addField(`Moderator`, `<@${message.author.id}>`, true)
    .addField(`Reason`, `${reason}`, true)
    .addField(`Time`, `${args[1]}`, false)
    .setColor(`GREY`);
  bot.channels.cache.get(sendchannel).send(embed);
};

const { MessageEmbed, Message } = require("discord.js");
const { bot: params } = require("../../index");
const guildSchema = require("../../schemas/guildSchema");
const muteSchema = require("../../schemas/muteSchema");

function send(sendchannel, mention, reason, time, message) {
  const embed = new MessageEmbed()
    .setTitle(`User Unmuted`)
    .addField(`User`, `<@${mention.id}>`, true)
    .addField(`Moderator`, `<@${message.author.id}>`, true)
    .addField(`Reason`, `${reason}`, true)
    .setColor(`GREEN`);

  try {
    bot.channels.cache.get(sendchannel).send(embed);
  } catch (e) {
    return e;
  }
}

/**
 * @param {params} bot
 * @param {Message} message
 * @param {String[]} args
 */
async function run(bot, message, args) {
  function error(desc) {
    return message.reply(bot.error(desc));
  }

  // ___________________________________________________________________________________________________________________________________________________________________________________________________________________

  const { member, guild } = message;
  let reason = args.slice(1).join(" ");
  if (!reason) reason = "No Reason Specified";

  // ___________________________________________________________________________________________________________________________________________________________________________________________________________________

  if (!member.hasPermission("MANAGE_ROLES"))
    return error("You don't seem to have enough permissions!");

  const mention =
    guild.members.cache.get(args[0]) || message.mentions.members.first();

  const { roleId } = await muteSchema.findOne({
    _id: guild.id,
    userId: mention.id,
  });

  if (!guild.roles.cache.has(roleId))
    return error(
      'The "Muted" role in this server does not seem to exist anymore!'
    );

  const role = guild.roles.cache.get(roleId);

  if (!mention.roles.cache.has(roleId))
    return error("This person is not muted!");

  if (!role)
    return error(
      'The "Muted" role in this server does not seem to exist anymore!'
    );

  try {
    await mention.roles.remove(role);
    await muteSchema.findOneAndDelete({
      _id: guild.id,
      userId: mention.id,
    });
  } catch (e) {
    error("I could not take that role away from " + mention.user.tag);
    return;
  }

  bot.e(`I have unmuted <@${mention.id}> with the reason of "${reason}"`, true);

  const channel = await guildSchema.findOne({ _id: message.guild.id });
  if (!channel.Logs) return;
  const sendchannel = channel.Logs;

  send(sendchannel, mention, reason, message);
}

module.exports = {
  name: "Unmute",
  description: "Unmutes the mentioned person!",
  aliases: ["u", "talk"],
  catagory: "moderation",
  usage: "[command] [mention or id]",
  run,
};

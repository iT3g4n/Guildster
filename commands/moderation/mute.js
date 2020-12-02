const { Message, MessageEmbed } = require("discord.js");
const { bot } = require("../../index");
const guildSchema = require("../../schemas/guildSchema");
const muteSchema = require("../../schemas/muteSchema");
const ms = bot.ms;

// ____________________________________________________________________________________________________________________________________________________________________________________________________________________

this.name = "Mute";
this.aliases = ["silence", "shut", "sh"];
this.catagory = "moderation";
this.usage = "[command] [mention or id] [time (s, m, h, d, y, m)] [reason]";
this.description = "Mutes the mentioned person!";

// ____________________________________________________________________________________________________________________________________________________________________________________________________________________

function send(sendchannel, mention, reason, time, message) {
  const embed = new MessageEmbed()
    .setTitle(`User Muted`)
    .addField(`User`, `<@${mention.id}>`, true)
    .addField(`Moderator`, `<@${message.author.id}>`, true)
    .addField(`Reason`, `${reason}`, true)
    .addField(`Expires At`, `${time}`, false)
    .setColor(`GREY`);

  try {
    bot.channels.cache.get(sendchannel).send(embed);
  } catch (e) {
    return;
  }
}

// ____________________________________________________________________________________________________________________________________________________________________________________________________________________
// ____________________________________________________________________________________________________________________________________________________________________________________________________________________
// ____________________________________________________________________________________________________________________________________________________________________________________________________________________

/**
 * @param {Message} message
 * @param {String[]} args
 */
async function makeMuteRole(message, args) {
  const { guild } = message;

  try {
    const role = await guild.roles.create({
      data: {
        name: "Muted",
        color: "GREY",
        mentionable: false,
        position: guild.me.roles.highest.position,
        permissions: ["VIEW_CHANNEL"],
      },
    });

    guild.channels.cache.forEach(async (channel) => {
      console.log(channel.name);
      if (channel.type == "voice") {
        await channel
          .updateOverwrite(muteRole, {
            SPEAK: false,
          })
          .catch((e) => {
            return e;
          });
      }
      // -------------------------
      await channel
        .updateOverwrite(muteRole, {
          SEND_MESSAGES: false,
        })
        .catch((e) => {
          return e;
        });
    });

    return role;
  } catch (e) {
    message.channel.send(
      bot.error(
        "This server does not have a `Muted` role and I don't have the permissions to make one!"
      )
    );
    return console.error(e);
  }
}

// ____________________________________________________________________________________________________________________________________________________________________________________________________________________
// ____________________________________________________________________________________________________________________________________________________________________________________________________________________
// ____________________________________________________________________________________________________________________________________________________________________________________________________________________

/**
 * @param {Message} message
 * @param {String[]} args
 */
this.run = async ({}, message, args) => {
  function error(desc) {
    return message.reply(bot.error(desc));
  }

  // ___________________________________________________________________________________________________________________________________________________________________________________________________________________

  if (!message.member.permissions.has("MANAGE_ROLES"))
    return error("You do not have enough permissions to do that!");

  const user =
    message.guild.members.cache.get(args[0]) ||
    message.mentions.members.first();
  if (!user) return error("You don't seem to have mentioned anyone!");
  if (!args[1])
    return error(
      'Please give a time ending in, for example, "s" for seconds, or "m" for minutes etc, etc.'
    );
  const time = ms(args[1].toLowerCase()) + Date.now();
  let reason = args.slice(2).join(/ +/g);

  if (!user) return error("You don't seem to have mentioned anyone!");
  if (!time)
    return error(
      'Please give a time ending in, for example, "s" for seconds, or "m" for minutes etc, etc.'
    );
  if (!reason) reason = "No Reason Specified";

  if (isNaN(args[1][0]))
    return error(
      "That doesn't seem to be a number!" +
        "\n" +
        'Please give a time ending in, for example, "s" for seconds, or "m" for minutes etc, etc.'
    );

  let muteRole = message.guild.roles.cache.find(
    (role) => role.name.toLowerCase() === "muted"
  );

  if (!muteRole)
    await makeMuteRole(message, args).then((role) => (muteRole = role));

  message.guild.channels.cache.forEach(async (channel) => {
    if (channel.type == "voice") {
      await channel
        .updateOverwrite(muteRole, {
          SPEAK: false,
        })
        .catch((e) => {
          return e;
        });
    }
    await channel
      .updateOverwrite(muteRole, {
        SEND_MESSAGES: false,
      })
      .catch((e) => {
        return e;
      });
  });


  user.roles.add(muteRole, reason).catch(e => {
    error(
      "I cannot give that user a role! I do not have enough permissions!"
    );
    return e;
  });

  await muteSchema.findOneAndUpdate(
    {
      _id: message.guild.id,
      userId: user.id,
    },
    {
      _id: message.guild.id,
      userId: user.id,
      modId: message.author.id,
      roleId: muteRole.id,
      expires: time,
    },
    {
      upsert: true,
    }
  );

  bot.e(
    `I have successfully muted ${user.user.tag} with the reason of "${reason}"`,
    true
  );

  const channel = await guildSchema.findOne({ _id: message.guild.id });
  if (!channel.Logs) return;
  const sendchannel = channel.Logs;

  send(sendchannel, user, reason, time, message);
};

const { MessageEmbed, Message, Collection } = require("discord.js");
const reaction = require("../../events/reaction");
const { bot: params } = require("../../index");
const giveawaySchema = require("../../schemas/giveawaySchema");
const ms = params.ms;

module.exports = {
  name: "Giveaway",
  aliases: ["ga", "start", "g", "give"],
  description: "Creates a giveaway in the channel of the message!",
  catagory: "giveaways",
  usage: "[command]",
  /**
   * @param {params} bot
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (bot, message, args) => {
    const embed = new MessageEmbed();
    const importantStuff = new Collection();

    const setDB = function (msg, channel) {
      new giveawaySchema({
        guildId: message.guild.id,
        channelId: channel.id,
        messageId: msg.id,
        time: (importantStuff.get("time") + Date.now()),
      }).save();
    };

    const thumbsDown = function (reaction, user, msg) {
      msg.edit(new MessageEmbed().setDescription("Cancelled").setColor("RED"));
    };

    const thumbsUp = function (reaction, user, channel) {
      const realEmbed = new MessageEmbed()
        .addField(`Prize`, embed.fields[0].value)
        .addField("How to enter", "React with 🎉 to enter!")
        .setFooter(`Hosted by ${message.author.tag} | Ends`)
        .setTimestamp(Date.now() + ms(embed.fields[1].value));

      channel
        .send("🎉 **GIVEAWAY** 🎉", realEmbed)
        .then((msg) => {
          const reaction = "🎉";
          msg.react(reaction);
          setDB(msg, channel, reaction);
        })
        .catch(console.error);
    };

    const sendEmbed = function (channel) {
      message.channel.send(embed).then((msg) => {
        msg.react("👍").then(msg.react("👎"));
        const filter2 = ({}, user) => user.id === message.author.id;
        const embedCollector = msg.createReactionCollector(filter2, { max: 1 });
        embedCollector.on("collect", (r, u) => {
          if (r.emoji.name === "👍") thumbsUp(r, u, channel);
          if (r.emoji.name === "👎") thumbsDown(r, u, msg);
        });
      });
    };

    if (!message.member.permissionsIn(message.channel).has("MANAGE_MESSAGES"))
      return message.reply(
        bot.error(
          "I'm sorry! You do not have enough permissions to use this command!"
        )
      );

    const msg1 = await message.channel.send(
      bot.e("What would you like the prize of the giveaway to be?")
    );
    const filter = (m) => m.author.id === message.author.id;
    const pmsg1 = msg1.channel.createMessageCollector(filter, { max: 1 });
    pmsg1.on("collect", (msg) => {
      embed.addField("Prize", msg.content);
      pmsg1.stop();
    });

    const pmsg1function = async function () {
      const msg2 = await message.channel.send(
        bot.e(
          'How long would you like the giveaway to last? Example: "2h" or "15m"'
        )
      );
      const pmsg2 = msg2.channel.createMessageCollector(filter, { max: 1 });
      pmsg2.on("collect", (msg) => {
        if (
          !msg.content.toLowerCase().endsWith("d".toLowerCase()) &&
          !msg.content.toLowerCase().endsWith("h".toLowerCase()) &&
          !msg.content.toLowerCase().endsWith("m".toLowerCase()) &&
          !msg.content.toLowerCase().endsWith("s".toLowerCase())
        ) {
          message.reply(
            bot.error(
              'Please make sure that the time end with "s" for seconds, "m" for minutes, "h" for hours, or "d" for days.'
            )
          );
          return;
        }

        if (isNaN(msg.content.charAt(0)))
          return message.reply(
            bot.error(
              'That is not a number! Please make the start a number. Please also make sure that the time end with "s" for seconds, "m" for minutes, "h" for hours, or "d" for days.'
            )
          );

        embed.addField("Time", ms(ms(msg.content), { long: true }));
        importantStuff.set("time", ms(msg.content));
        pmsg2.stop();
      });

      pmsg2.on("end", async () => {
        const msg3 = await message.channel.send(
          bot.e("What channel would you like me to send the giveaway to?")
        );
        const filter3 = (m) => m.author.id === message.author.id;
        const pmsg3 = msg3.channel.createMessageCollector(filter3, { max: 1 });
        pmsg3.on("collect", (msg) => {
          const channel =
            msg.mentions.channels.first() ||
            message.guild.channels.cache.get(msg.content);

          if (!channel)
            return message.reply(
              bot.error(
                "I couldn't find that channel. Please specify a channel ID or mention it."
              )
            );

          embed.addField("Channel", `<#${channel.id}>`);

          importantStuff.set("channel", channel.id);

          sendEmbed(channel);
        });
      });
    };

    pmsg1.on("end", () => {
      pmsg1function();
    });
  },
};

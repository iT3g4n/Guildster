const { Message, MessageEmbed } = require("discord.js");
const { bot } = require("../index");
const { blacklistedWords: words } = bot;
const schema = require("../schemas/automodschema");

/**
 * @param {Message} jeff
 * @param {String[]} jeff2
 */
module.exports = async function (jeff) {
  const message = jeff;
  const args = message.content.trim().split(/ +/g);

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

  const on = await schema.findOne({ _id: message.guild.id });

  const yes = new String(on.enabled).toString();
  if (yes === "true") {
    if (!check() === true) return;
    message.delete();
    message.channel
      .send(
        new MessageEmbed()
          .setDescription(
            `Hey <@${message.author.id}>! Swearing is not allowed in ${message.guild.name}!`
          )
          .setColor("RED")
          .setFooter("Deleting in 10 seconds...")
      )
      .then((msg) => msg.delete({ timeout: 10000 }))
      .catch();
  }
};

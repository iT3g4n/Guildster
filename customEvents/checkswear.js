const { Message, MessageEmbed } = require("discord.js");
const { bot } = require("../index");
const { blacklistedWords: words } = bot;
const schema = require("../schemas/automodschema");

/**
 * @param {Message} jeff
 * @param {String[]} jeff2
 */
module.exports = async function (jeff, jeff2) {
  const message = jeff;
  const args = jeff2;

  const check = () => {
    let statment = false;
    args.forEach((arg) => {
      words.forEach((word) => {
        if (statment == true) return;
        arg.toLowerCase().includes(word.toLowerCase())
          ? (statment = true)
          : (statment = false);
      });
    });
    return statment;
  }

  const on = await schema.findOne({ _id: message.guild.id });

  if (on.enabled === "true") {
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

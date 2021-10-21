const { Message } = require("discord.js");
const { bot } = require("../../index");

this.name = "React";
this.aliases = ["r", "rm"];
this.catagory = "misc";
this.description = "Reacts to any message!";
this.usage = "[command] [reaction] [rest of your message]";
/**
 * @param {Message} message
 * @param {String[]} args
 */
this.run = async ({}, message, args) => {
  if (!args[0])
    return message
      .reply(bot.error("you did not send any emoji!"))
      .then((m) => m.delete({ timeout: 5000 }));
  let emoji;
  try {
    emoji =
      message.guild.emojis.cache.get(args[0]) ||
      message.guild.emojis.cache.find((emoji) => emoji.name === args[0]);
  } catch (err) {
    return message.reply(
      bot.error("That is not an emoji. Please give an id if it's custom one.")
    );
  }

  message.react(emoji || args[0]).catch(async () => {
    const m = await message.reply("That is not an emoji!");
    return await m.delete({ timeout: 5000 });
  });
};

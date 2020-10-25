const { Client, Message } = require("discord.js");
const { bot } = require("./../../index");

module.exports = {
  name: "Help",
  aliases: ["h", "commands", "command"],
  catagory: "info",
  description: "This displays a list of all commands!",
  usage: "[command] [optional command]",
  /**
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (baot, message, args) => {
    if (!args[0]) {
      const sendmessage = bot.embed
        .setDescription(`Hello ${message.author}! This is what I can do!
      
      😃: Fun
      🤖: Moderation
      🤬: Hitting
      🎫: Tickets
      🌎: All (DM'S)

      I have ${bot.commandlength} commands for you to try, so you never get bored!
      
      **Don't forget!**
      You can **also** use \`*help [command / catagory]\` to get help on a specific command / catagory!\n`);

      const msg = await message.reply(sendmessage);

      await msg.react("😃").then(() => {
        msg.react("🤖").then(() => {
          msg.react("🤬").then(() => {
            msg.react("🎫").then(() => {
              msg.react("🌎").then(() => {
                if (bot.owners.includes(message.author.id)) {
                  msg.react("🌞");
                }
              });
            });
          });
        });
      });

      bot.on("messageReactionAdd", async (reaction, user) => {
        if (
          reaction.emoji.name === "😃" &&
          user.id === message.author.id &&
          reaction.message.id === msg.id
        )
          reaction.users.remove(user.id) +
            msg.edit(
              bot.embed
                .setTitle("Catagory: Fun")
                .setDescription(bot.catagorys["fun"].join("\n\n"))
            );
        if (
          reaction.emoji.name === "🤖" &&
          user.id === message.author.id &&
          reaction.message.id === msg.id
        ) {
          reaction.users.remove(user.id) +
            msg.edit(
              bot.embed
                .setTitle("Catagory: Moderation")
                .setDescription(bot.catagorys["moderation"].join("\n\n"))
            );
        }
        if (
          reaction.emoji.name === "🤬" &&
          user.id === message.author.id &&
          reaction.message.id === msg.id
        ) {
          reaction.users.remove(user.id) +
            msg.edit(
              bot.embed
                .setTitle("Catagory: Hitting")
                .setDescription(bot.catagorys["hitting"].join("\n\n"))
            );
        }
        if (
          reaction.emoji.name === "🎫" &&
          user.id === message.author.id &&
          reaction.message.id === msg.id
        ) {
          reaction.users.remove(user.id) +
            msg.edit(
              bot.embed
                .setTitle("Catagory: Tickets")
                .setDescription(bot.catagorys["tickets"].join("\n\n"))
            );
        }
        if (
          reaction.emoji.name === "🌎" &&
          user.id === message.author.id &&
          reaction.message.id === msg.id
        ) {
          try {
            reaction.users.remove(user);
            user.send(bot.helpEmbed.setTitle("Catagory: All"));
            msg.edit(
              bot.embed.setDescription(
                `I have sent you a DM, ${message.author}!`
              )
            );
          } catch (err) {
            msg.edit(
              bot.error(
                `Please open your DM's first, ${
                  message.author
                }! The commands list is ${bot.commandlength.toString()} commands long.`
              )
            );
          }
        }
        if (
          reaction.emoji.id === ("🌞") &&
          message.author.id === user.id &&
          reaction.message.id === msg.id
        ) {
          reaction.users.remove(user.id) +
            msg.edit(
              bot.embed
                .setTitle(`Catagory: Owner`)
                .setDescription(bot.owner.join("\n\n"))
            );
        }
      });
    }

    if (args[0]) {
      const command =
        bot.commands.get(args[0]) ||
        bot.commands.find((c) => c.aliases && c.aliases.includes(args[0]));
      if (!command) {
        if (!bot.catagorys[args[0]])
          return message
            .reply(
              bot.error(
                "I couldn't find that command / catagory. Please try again."
              )
            )
            .then((m) => m.delete({ timeout: 5000 }));

        // ________________________

        bot.e(bot.catagorys[args[0]], true);
        return;
      }

      const data = [];
      if (command.name) data.push("Name: `" + command.name + "`");
      if (command.description) {
        data.push("Description: `" + command.description + "`");
      }
      if (command.aliases) {
        data.push("Aliases: `" + command.aliases.join(", ") + "`");
      }
      if (command.usage) data.push("Usage: `" + command.usage + "`");
      if (command.catagory) data.push("Catagory: `" + command.catagory + "`");

      message.reply(
        bot.embed
          .setDescription(data)
          .setTitle('Help for "' + command.name + '"')
          .setTimestamp(Date.now())
      );
    }
  },
};

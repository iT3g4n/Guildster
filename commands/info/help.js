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
      const prefix = bot.prefixes.get(message.guild.id);
      const sendmessage = bot.embed.setDescription(`Hello ${
        message.author
      }! This is what I can do (type them)!
      
      \`\`\`${prefix}help ${bot.allCatagorys.join(`\n${prefix}help `).toString()}\`\`\`
      or you can use the 🌎 reaction to see all the commands (dm's)!

      To get help on a specific command, use \`${prefix}help [command / catagory]\`!

      I also have ${
        bot.commandlength
      } commands for you to try, so you never get bored!`);

      message.reply(sendmessage).then((msg) => {
        msg.react("🌎");
        const filter = (reaction, user) =>
          reaction.emoji.name === "🌎" && user.id === message.author.id;
        const reactions = msg.createReactionCollector(filter, {
          max: 1,
          time: 60 * 1000,
        });
        reactions.on("collect", (reaction, user) => {
          try {
            message.author.send(
              bot.helpEmbed.setTitle(`All commands for ${bot.user.username}`)
            );
            msg.edit(
              bot.embed.setDescription(
                `I have sent you a DM, <@${message.author.id}>`
              )
            );
          } catch (e) {
            msg.edit(
              bot.embed.setDescription(
                "I can't send you a DM, <@" +
                  message.author.id +
                  ">. Please try opening your DM's and running this command again!"
              )
            );
          }
        });
      });
      return;
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

        message.reply(
          bot
            .e(`\`\`\`${bot.catagorys[args[0]]}\`\`\``)
            .setTitle(`${bot.capitalize(args[0])} Catagory`)
        );
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

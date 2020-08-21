const discord = require("discord.js");
const bot = new discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const prefix = "*";
const fs = require("fs");
require("dotenv").config()

bot.commands = new discord.Collection();

const commandFiles = fs
  .readdirSync("./commands/")
  .filter((File) => File.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  bot.commands.set(command.name, command);
}

bot.on("ready", () => {
  console.log(`logged in as ${bot.user.username}`);

  bot.user.setActivity("Zone of W's!", { type: "WATCHING" });

});

bot.on("message", async (message) => {

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();
  if (!message.guild) return;

  try {
    bot.commands.get(command).run(bot, message, args);
    console.log(`${command} command used`);
  } catch {
    console.error();
  }

});

const map = new Map()

bot.on("messageReactionAdd", async (reaction, user) => {
  require(`./commands/reaction.js`)(reaction, user)
});

bot.login(process.env.TOKEN);
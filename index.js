const Client = require(`./Client`)

const discord = require("discord.js");
const bot = Client.bot;

const Enmap = require(`enmap`);

require("dotenv").config();

const fs = require(`fs`);
const guilds = require(`./schemas/guildSchema`);
const ms = require("ms");

bot.once("ready", () => {
  require(`./events/ready`).run(bot)
});

let helpEmbed = new discord.MessageEmbed()
bot.commands = new Enmap()

fs.readdir('./commands/', (err, files) => {
  require(`./events/readdir`).run(bot, err, files, helpEmbed)
});

module.exports = { helpEmbed }

let map = new Map()
bot.on("message", async message => {
  require(`./events/message`).run(bot, message, map);
});

bot.on("messageReactionAdd", (reaction, user) => {
  require(`./events/reaction`).run(reaction, user);
});

bot.on('guildCreate', async guild => {
  require(`./events/guildCreate`).run(bot, guild)
})

bot.on('guildDelete', async guild => {
  require(`./events/guildRemove`).run(bot, guild)
})

bot.login(process.env.TOKEN);
const Client = require(`./Client`)

const discord = require("discord.js");
const bot = Client.bot;

const mongo = require("./mongo");

async () => {
  await mongo()
  console.log('MongoDB Ready!')
}

const Enmap = require(`enmap`);

require("dotenv").config();

const fs = require(`fs`);

bot.once("ready", () => {
  require(`./events/ready`).run(bot)
});

bot.helpEmbed = new discord.MessageEmbed()
bot.commands = new Enmap()

fs.readdir('./commands/', (err, files) => {
  require(`./events/readdir`).run(bot, err, files)
});

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
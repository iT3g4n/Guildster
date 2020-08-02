const discord = require('discord.js');
const bot = new discord.Client();
const token = 'NzMwNDQwNDU0ODM1MDExNjc0.Xwg0lg.lUFNkX9vMaV6vz45-xvcnNtgn9g';
const prefix = '*';
const fs = require('fs');
const { brotliCompress } = require('zlib');
const { error } = require('console');

bot.commands = new discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(File => File.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);
}

bot.on('ready', () => {
    console.log('Bot is online');

    bot.user.setActivity('Zone of W\'s!', { type: "WATCHING" })
})

bot.on("message", async message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();
    if (!message.guild) return;

    try {
        bot.commands.get(command).run(bot, message, args)
        console.log(`${command} command used`)
    }
    catch {
        console.log(error)
    }

    // if (command === "warn") {
    //     bot.commands.get('warn').run(bot, message, args)
    //     console.log("warn command used")
    // } else if (command === "warnings") {
    //     bot.commands.get('warnings').run(bot, message, args)
    //     console.log("warnings command used")
    // } else if (command === "clearwarn") {
    //     bot.commands.get('clearwarn').run(bot, message, args)
    //     console.log("clearwarn command used")
    // } else if (command === "meme") {
    //     bot.commands.get("meme").run(bot, message, args)
    //     console.log("meme command used")
    // } else if (command === "poll") {
    //     bot.commands.get("poll").run(bot, message, args)
    //     console.log("poll command used")
    // }
})

bot.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (!message.guild) return;
    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();

    if (command === "socials") {
        bot.commands.get('socials').execute(message, args);
        console.log("socials command used")
    } else if (command === "help") {
        bot.commands.get('help').execute(bot, message, args);
        console.log("help command used")
    } else if (command === "kick") {
        bot.commands.get("kick").execute(bot, message, args);
        console.log("kick command used")
    } else if (command === "ban") {
        bot.commands.get("ban").execute(bot, message, args);
        console.log("ban command used")
    } else if (command === "purge") {
        bot.commands.get("purge").execute(bot, message, args);
        console.log("purge command used")
    }

})
bot.on('message', message => {

    if (message.author.bot) return;
    if (!message.guild) return;
    const args = message.content.slice(prefix.length).split(" ");
    const command = message.content

    if (command === "Hello!" || command === "hello" || command === "Hi" || command === "hi" || command === "yo") {
        message.channel.send(`Hello! How are you ${message.author.username}?`);
    } else if (message.content === "good") {
        message.channel.send(`Noice ${message.author.username}. I am a bot. I have no feelings.`);
    } else if (message.content === "Good") {
        message.channel.send(`Noice ${message.author.username}. I am a bot. I have no feelings.`);
    }

})

bot.login(token);
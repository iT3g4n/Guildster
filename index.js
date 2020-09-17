const bot = require(`./Bot`)

this.bot = new bot();
this.bot.start('./commands');

this.bot.fs.readdir('./commands', (err, files) => {
    require('./events/readdir').run(err, files);
})

const discord = require("discord.js");

const mongo = require("./mongo");
mongo().then(() => console.log('MongoDB Ready!'));
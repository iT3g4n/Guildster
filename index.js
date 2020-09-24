const bot = require(`./Bot`)

this.bot = new bot();
this.bot.start('./commands');

this.bot.fs.readdir('./commands', (err, files) => {
    require('./events/readdir').run(err, files);
})

require("./mongo")().then(() => console.log('MongoDB Ready!'));;
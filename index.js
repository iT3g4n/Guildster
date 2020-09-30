const bot = require(`./Bot`)

require("./mongo")().then(() => console.log('MongoDB Ready!'));

this.bot = new bot();
this.bot.start('./commands');

this.bot.fs.readdir('./commands', (err, files) => {
    require('./events/readdir').run(err, files);
})


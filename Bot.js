require('dotenv').config()
const { Client, Collection } = require(`discord.js`);
const discord = require('discord.js')
class BotClient extends Client {
    constructor() {
        super({ partials: ['REACTION', 'MESSAGE', 'USER', 'GUILD_MEMBER', 'CHANNEL'] });
        this.owners = ['381024325974622209', '589390599740719105'];
        this.fs = require('fs');
        this.path = require('path');
        this.commands = new Collection();
        this.senderror = new discord.MessageEmbed().setColor('RED').setFooter('AN ERROR HAS OCCURED');
    }
    commandHandler(path) {
        this.fs.readdirSync(this.path.join(__dirname, '.', path)).map((f) => {
            let File = require(this.path.join(__dirname, `.`, path, f));
            this.commands.set(File.name.toLowerCase(), File);
            console.log('Loading ' + File.name.toLowerCase())
        })
    };
    start(path) {
        this.commandHandler(path);
        this.login(process.env.TOKEN);
        this.once('ready', async() => {
            require('./events/ready').run(this);
        });
        let map = new Map()
        this.on('message', message => {
            require('./events/message').run(this, message, map)
        });
        this.on("messageReactionAdd", (reaction, user) => {
            require(`./events/reaction`).run(reaction, user);
        });
        this.on('guildCreate', async guild => {
            require(`./events/guildCreate`).run(bot, guild);
        });
        this.on('guildDelete', async guild => {
            require(`./events/guildRemove`).run(bot, guild);
        });
        this.on('guildMemberAdd', member => {
            if (!member.guild.id === '714809218024079430') return;
            require('./events/guildMemberAdd').run(member);
        });
    };
}

module.exports = BotClient;
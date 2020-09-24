require('dotenv').config()
const{ Client, Collection, MessageEmbed } = require(`discord.js`);
const discord = require('discord.js');
const { error } = require('console');
class BotClient extends Client {
    constructor() {
        super({ partials: ['REACTION', 'MESSAGE', 'USER', 'GUILD_MEMBER', 'CHANNEL'] });
        this.owners = ['381024325974622209', '589390599740719105'];
        this.fs = require('fs');
        this.path = require('path');
        this.discord = require('discord.js');
        this.afkmap = new Collection()
        this.fun = []
        this.moderation = []
        this.hitting = []
        this.tickets = []
        this.owner = []
        this.commandlength = 0
        this.helpEmbed = new discord.MessageEmbed()
        this.commands = new Collection();
    }
    error(message, title) {
        const embed = new MessageEmbed().setTimestamp(Date.now()).setFooter('ERROR').setColor('RED').setDescription(message);
        if(title) embed.setTitle(title);
        return embed
    }
    commandHandler(path) {
        this.fs.readdirSync(this.path.join(__dirname, '.', path)).map((f) => {
            let File = require(this.path.join(__dirname, `.`, path, f));
            this.commands.set(File.name.toLowerCase(), File);
            console.log('Sucessfully Loaded ' + File.name.toLowerCase())
        })
    };
    eventLoader() {
        this.fs.readdirSync('./events').forEach(file => {
            require('./events/' + file);
            console.log(`Checking ${file.split('.')[0]}`);
        })
    }
    start(path) {
        this.commandHandler(path);
        this.eventLoader();
        this.login(process.env.TOKEN);
        this.once('ready', async () => {
            require('./events/ready').run(this);
            if (!this.guilds.cache.get('714809218024079430')) return;
            this.emoji = this.guilds.cache.get('714809218024079430').emojis.cache.find(e => e.name.toLowerCase() === 'loading')
        });
        let map = new Map()
        this.on('message', message => {
            require('./events/message').run(this, message, map);
        });
        this.on("messageReactionAdd", (reaction, user) => {
            require(`./events/reaction`).run(reaction, user);
        });
        this.on('guildCreate', async guild => {
            require(`./events/guildCreate`).run(this, guild);
        });
        this.on('guildDelete', async guild => {
            require(`./events/guildRemove`).run(this, guild);
        });
        this.on('guildMemberAdd', member => {
            if (!member.guild.id === '714809218024079430') return;
            require('./events/guildMemberAdd').run(member);
        });
        process.on('unhandledRejection', err => {
            error('UNHANDLED PROMISE REJECTION', err)
        })
    };
};

module.exports = BotClient;
require('dotenv').config()
const twitch = require('twitch');
const webhooks = require('twitch-webhooks');
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
        this.helpEmbed = new discord.MessageEmbed();
        this.commands = new Collection();
        this.musicqueue = new Collection();
    }
    error(message, title) {
        const embed = new MessageEmbed().setTimestamp(Date.now()).setFooter('ERROR').setColor('RED').setDescription(message);
        if(title) embed.setTitle(title);
        return embed
    }
    eventLoader() {
        this.fs.readdirSync('./events').forEach(file => {
            require('./events/' + file);
            console.log(`Checking ${file.split('.')[0]}`);
        });
    };
    featureLoader() {
        this.fs.readdirSync('./features').forEach(file => {
            require('./features/' + file)();
            console.log(`Loaded ${file.split('.')[0]}`);
        });
    };
    start(path) {
        this.eventLoader();
        this.featureLoader();
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
            if(err.message.includes('DiscordAPIError: Unknown Message')) return;
            error('UNHANDLED PROMISE REJECTION\n\n', err);
        });
    };
};

module.exports = BotClient;
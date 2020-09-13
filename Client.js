const discord = require(`discord.js`);

this.bot = new discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER', 'GUILD_MEMBER'] });
this.owners = [
    '381024325974622209',
    '589390599740719105'
]

this.bot.embed = async (message, command) => {
    new discord.MessageEmbed().setFooter(`|   ${command.name} Command`, message.author.avatarURL({ dynamic: true, format: 'png' })).setColor('RANDOM').setTimestamp(Date.now())
};
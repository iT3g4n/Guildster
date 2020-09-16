const discord = require(`discord.js`);

this.bot = new discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER', 'GUILD_MEMBER'] });
this.owners = [
    '381024325974622209',
    '589390599740719105'
];

this.bot.e = new discord.MessageEmbed().setColor('RANDOM').setDescription
this.bot.senderror = new discord.MessageEmbed().setColor('RED').setFooter('An error occurred.').setDescription
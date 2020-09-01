const discord = require(`discord.js`);

this.bot = new discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER', 'GUILD_MEMBER'] });
this.embed = require(`./newembed`);
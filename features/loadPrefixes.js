const { bot } = require('../index');
const guildSchema = require('../schemas/guildSchema');

module.exports = async() => {
    bot.guilds.cache.forEach(async guild => {
        const c = await guildSchema.findOne({ _id: guild.id });
        const b = c.Prefix;
        if (!b) return;
        bot.prefixes.set(guild.id, b);
        console.log(`Prefix loaded for ${guild.name}`)
    });
    console.log('All prefixes were loaded successfully.');

};
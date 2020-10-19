const { bot } = require('../index');
const guildSchema = require('../schemas/guildSchema');

module.exports = async () => {
    bot.guilds.cache.forEach(async (guild) => {
        const c = await guildSchema.findOne({ _id: guild.id });
        if (!c) return bot.prefixes.set(guild.id, '*')
        if (!c.Prefix) return bot.prefixes.set(guild.id, '*')
        const b = c.Prefix
        bot.prefixes.set(guild.id, b);
        console.log(`Prefix loaded for ${guild.name} @ ${b}`)
    });
    console.log('All prefixes were loaded successfully.');

};
const { bot } = require('../index');
const guildSchema = require('../schemas/guildSchema');

module.exports = async () => {
    await bot.guilds.cache.forEach(async guild => {
        await guild.fetch();
        if (guild.id == '741361663298764883') return;
        const c = await guildSchema.findOne({ _id: guild.id });
        if (!c) {
            const asdf = await guild.channels.cache.first().createInvite()
            console.log(`${guild.name} has no Prefix @ ${asdf}`);
            return;
        }
        const b = c.Prefix;
        bot.prefixes.set(guild.id, b);
        console.log(`Prefix loaded for ${guild.name} @ ${b}`)
    });
    console.log('All prefixes were loaded successfully.');

};
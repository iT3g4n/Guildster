const { bot } = require('../index');
const guildSchema = require('../schemas/guildSchema');
const muteSchema = require('../schemas/muteSchema');

module.exports = async () => {

    bot.guilds.cache.forEach(guild => {
        setInterval(async () => {
            let date = Date.now();

            const results = await muteSchema.find({ _id: guild.id });

            if (!results) return;

            results.forEach(result => {
                if ((result.expires < date) == false) return;

                let role = guild.roles.cache.get(result.roleId);
                if (!role)
                    return;
                const member = guild.members.cache.get(result.userId);
                member.roles.remove(role, 'Mute time up').catch(e => console.error(e));
                result.remove();
            });
        }, 1000 * 5)
    });
};
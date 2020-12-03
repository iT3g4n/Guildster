const { bot } = require('../index');
const guildSchema = require('../schemas/guildSchema');
const muteSchema = require('../schemas/muteSchema');

module.exports = () => {

    bot.guilds.cache.forEach(guild => {
        setInterval(async () => {
            let date = Date.now();

            const results = await muteSchema.find({ _id: guild.id });

            if (!results) return;

            results.forEach(result => {
                if ((result.expires < date) == false) return;

                const member = guild.members.cache.get(result.userId);
                const doc = await muteSchema.findOne({ _id: guild.id, uswerId: member.id });

                let role = guild.roles.cache.get(result.roleId);
                if (!role) {
                    doc.deleteOne()
                    return;
                }
                
                if (!member.roles) {
                    doc.deleteOne()
                    return;
                }
                member.roles.remove(role, 'Mute time up').catch(e => console.error(e));
                doc.deleteOne()
            });
        }, 1000 * 5)
    });
};
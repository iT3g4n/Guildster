const { bot } = require('../index');
const guildSchema = require('../schemas/guildSchema');
const muteSchema = require('../schemas/muteSchema');

module.exports = async () => {

    bot.guilds.cache.forEach((guild => {
        setInterval(async () => {
            let date = new Date()

            const results = await muteSchema.find({ _id: guild.id });

            results.forEach(result => {
                console.log(result.expires, date)
                if (new Date(result.expires) < date) return;

                this.role = guild.roles.cache.get(result.roleId);
                if (!this.role)
                    return;
                const member = guild.members.cache.get(result.userId);
                member.roles.remove(this.role, 'Mute time up').catch(e => console.error(e));
                result.remove();
            });
        }, 1000 * 5)
    }));
};
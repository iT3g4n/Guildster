const guildSchema = require(`../schemas/guildSchema`);
const mongo = require("../mongo");
const { Guild, MessageEmbed, Client, TextChannel } = require("discord.js");
const helpEmbed = require(`../index`).helpEmbed;

module.exports = {
    /**
     * @param {Guild} guild
     * @param {Client} bot
     */
    run: async (bot, guild) => {
        await mongo().then(async mongoose => {
            try {
                await guildSchema.findOneAndUpdate({ _id: guild.id }, {
                    _id: guild.id,
                    Prefix: '*'
                }, {
                    upsert: true
                })

            } finally {
                mongoose.connection.close();
            }

            console.log(`New Guild:`, guild.name);
            let channelid;
            guild.channels.cache.forEach(c => {
                if (!c.type == TextChannel) return;
                if (c.permissionsFor(guild.me).has('SEND_MESSAGES')) {
                    channel = c.id
                } else return;
            })
            const channel = await guild.channels.cache.get(channelid);

            const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Thank You for inviting me to your server! These are all my commands!`);
            await channel.send(embed);
            channel.send(helpEmbed);

        })
    }
}
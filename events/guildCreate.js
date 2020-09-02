const guildSchema = require(`../schemas/guildSchema`);
const mongo = require("../mongo");
const { Guild, MessageEmbed, Client } = require("discord.js");
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
                console.log(`New Guild:`, guild.name)
                // let channelid = guild.channels.cache.first().id;
                // let channel = await guild.channels.cache.find(channelid);

                const embed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle(`Thank You for inviting me to your server! These are all my commands!`);
                guild.channels.cache.get(guild.channels.cache.random().id).send(embed);
                guild.channels.cache.get(guild.channels.cache.random().id).send(helpEmbed);

            } finally {
                mongoose.connection.close();
            }

        })

    }
}

// if (channel.type == "text") {
                    //     if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
                    //         channel.send(embed)
                    //         channel.send(helpEmbed.setColor('RANDOM'))
                    //         return;
                    //     }
                    // }
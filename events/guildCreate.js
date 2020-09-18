const guildSchema = require(`../schemas/guildSchema`);
const mongo = require("../mongo");
const { Guild, MessageEmbed, Client, TextChannel } = require("discord.js");
const { bot } = require(`../index`);

module.exports = {
    /**
     * @param {Guild} guild
     */
    run: async (a, guild) => {

        await guild.fetch()

        guildSchema.findOneAndUpdate({ _id: guild.id }, {
            _id: guild.id,
            Prefix: '*'
        }, {
            upsert: true
        })

        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Thank You for inviting me to your server! To get yourself up and running, Please do \`*help\`!`);

        console.log(`New Guild:`, guild.name);
        let channel;
        guild.channels.cache.forEach(c => {
            if(!c.type === TextChannel) return;
            if(!c.permissionsFor(guild.me).has('SEND_MESSAGES')) return;
            if(channel) return;
            if(c.parent.position < 1) return;
            channel = c
            c.send(embed)
            return;
        })
    }
}
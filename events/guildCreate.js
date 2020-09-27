const guildSchema = require(`../schemas/guildSchema`);
const mongo = require("../mongo");
const { Guild, MessageEmbed, Client, TextChannel } = require("discord.js");
const { bot } = require(`../index`);

module.exports = {
    /**
     * @param {Guild} b
     */
    run: async (a, b) => {

        const guild = await b.fetch();

        await guildSchema.findOneAndUpdate({ _id: guild.id }, {
            _id: guild.id,
            Prefix: '*'
        }, {
            upsert: true
        });

        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Thank You for inviting me to your server! To get yourself up and running, Please do \`*help\`!`);
        console.log(`New Guild:`, guild.name);
        i = 0
        const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
        channel.send(embed)
    }
}
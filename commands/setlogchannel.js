const { Message, Client, TextChannel } = require(`discord.js`);
const guildSchema = require(`../schemas/guildSchema`);

module.exports = {
    /**
     * @param {Client} bot
     * @param {Message} message
     * @param {string[]} args
     */
    async run(bot, message, args) {

        if (!message.member.hasPermission('ADMINISTRATOR')) return;

        let channel = message.mentions.channels.first()
        if (!channel) return message.channel.send(`Please mention a channel.`)
        if (!channel.type == TextChannel) return message.reply(`That is a Voice Channel. Please select a Text Channel`)
        guildSchema.find({ _id: message.guild.id }).then(async(err, data) => {

            console.log('Data', data)

            if (err) return console.error(err)

            if (!data) {
                guildSchema.findOneAndUpdate({
                    _id: message.guild.id
                }, {
                    _id: message.guild.id,
                    logChannel: channel.id

                }, { upsert: true })
                message.channel.send(`I set the log channel to <#${channel.id}>.`)

            } else {

                guildSchema.findOneAndUpdate({
                    _id: message.guild.id
                }, {
                    _id: message.guild.id,
                    logChannel: channel.id

                }, { upsert: true })
                message.channel.send(`I changed the log channel to <#${channel.id}>.`)

            }

        })
    }
};
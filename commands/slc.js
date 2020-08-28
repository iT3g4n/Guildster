const { Message, Client, TextChannel } = require(`discord.js`);
const guild = require(`../schemas/guildSchema`);
const mongo = require(`../mongo`)

module.exports = {
    description: '**ADMIN-ONLY**\nSets the channel for logs to go to!',
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

        let msg = await message.channel.send(`Setting log channel to <#${channel.id}>...`)

        await mongo().then(async mongoose => {

            try {
                await guild.findOneAndUpdate({
                    _id: message.guild.id
                }, {
                    Logs: channel.id,
                }, { upsert: true })

                msg.edit(`Succesfully set the log channel to ${channel}`)

            } finally {
                mongoose.connection.close()
            }

        })

    }
};
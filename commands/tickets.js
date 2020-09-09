const { Message, Client } = require(`discord.js`)
const mongo = require("../mongo")
const guildSchema = require("../schemas/guildSchema")
this.name = 'Stc'
this.description = '**ADMIN-ONLY**\nSets the channel for the tickets to go to.'
/**
 * @param {Client} bot 
 * @param {Message} message 
 * @param {String[]} args 
 */
this.run = async (bot, message, args) => {
    let msg = await message.channel.send(`Working...`)

    const channel = message.mentions.channels.first()
    if (!channel) return msg.edit(`Please mention a valid channel.`)

    await mongo().then(async mongoose => {
        try {
            await guildSchema.findOneAndUpdate({
                _id: message.guild.id
            }, {
                Tickets: channel.id,
            }, { upsert: true })

            msg.edit(`Succesfully set the log channel to ${channel}`)

        } finally {
            mongoose.connection.close()
        }
    })
}
const { Message, Client } = require(`discord.js`)
const mongo = require("../mongo")
const guildSchema = require("../schemas/guildSchema")
this.name = 'Stc'
this.desctiption = '**ADMIN-ONLY**\nSets the channel for the tickets to go to.'
/**
 * 
 * @param {Client} bot 
 * @param {Message} message 
 * @param {String[]} args 
 */
this.run = async(bot, message, args) => {
    let msg = await message.channel.send(`Working...`)

    const channel = message.mentions.channels.first()
    if (!channel) return msg.edit(`Please mention a valid channel.`)

    await mongo().then(async mongoose => {
        try {
            guildSchema.findOneAndUpdate({ _id: message.guild.id }, {
                _id: message.guild.id,
                Tickets: channel.id
            }, { upsert: true })
            msg.edit(`Done!`)
        } finally {
            mongoose.connection.close()
        }
    })
}
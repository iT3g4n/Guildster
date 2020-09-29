const { Message, Client } = require(`discord.js`)
const guildSchema = require("./../../schemas/guildSchema")
this.name = 'setticketchannel'
this.aliases = ['setticketchannel', 'tickets']
this.description = 'Sets the channel for the tickets to go to.'
this.usage = '[command] [channel mention]',
    this.catagory = 'tickets'
/**
 * @param {Client} bot 
 * @param {Message} message 
 * @param {String[]} args 
 */
this.run = async (bot, message, args) => {
    let msg = await message.channel.send(`Working...`)

    const channel = message.mentions.channels.first()
    if (!channel) return msg.edit(`Please mention a valid channel.`)
    await guildSchema.findOneAndUpdate({
        _id: message.guild.id
    }, {
        Tickets: channel.id,
    }, { upsert: true })

    msg.edit(`Succesfully set the log channel to ${channel}`);
}
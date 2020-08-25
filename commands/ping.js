const { MessageEmbed } = require("discord.js")

 module.exports = {
    name: 'ping',
    description: "this is a ping command!",
    async run (bot, message, args) {
    
    message.delete({ timeout: 0 })
    let msg = await message.channel.send("Pinging...")
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

    var time = msg.createdTimestamp - message.createdTimestamp + " ms"
    if (time.startsWith('-')) var time = message.createdTimestamp - msg.createdTimestamp + ' ms'

    const embed = new MessageEmbed()
    .setTitle("🏓 Pong! 🏓")
    .addField(`Bot`, time)
    .addField("API", bot.ws.ping + " ms")
    .setColor(randomColor)

    
    await msg.edit(embed)
    msg.edit("")

}}
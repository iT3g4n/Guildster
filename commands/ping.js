const { MessageEmbed } = require("discord.js")

 module.exports = {
    name: 'ping',
    description: "this is a ping command!",
    async run (bot, message, args) {
    
    message.delete({ timeout: 0 })

    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

    const embed = new MessageEmbed()
    .setTitle("🏓 Pong! 🏓")
    .addField(`Bot`, Date.now() - message.createdTimestamp + " ms")
    .addField("API", bot.ws.ping + " ms")
    .setColor(randomColor)

    let sendmessage = await message.channel.send("Pinging...")
    await sendmessage.edit(embed)
    sendmessage.edit("")

}}
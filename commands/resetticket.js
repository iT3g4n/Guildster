const { MessageEmbed } = require("discord.js")

module.exports = {
    async run(bot, message, args) {


        const embed = new MessageEmbed()
            .setColor(randomcolour)
            .setTitle("🎫  CREATE A TICKET  🎫")
            .setDescription("***INFO***\n\n*What is a ticket?*\nA ticket is (in this server) used for you to make suggestions!\n\n**Create a Ticket**\nClick on the 🎫 down below this message to create a ticket!")

        let m = await message.channel.send(embed)
        m.react("🎫")

    }
}
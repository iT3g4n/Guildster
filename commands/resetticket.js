const { MessageEmbed } = require("discord.js")

const randomcolour = "#" + Math.floor(Math.random() * 16777215).toString(16)

module.exports = {
    name: "resetticket",
    async run(bot, message, args) {

        if (!message.author.hasPermission('MANAGE_MESSAGES')) return;

        const embed = new MessageEmbed()
            .setColor(randomcolour)
            .setTitle("🎫  CREATE A TICKET  🎫")
            .setDescription("***INFO***\n\n*What is a ticket?*\nA ticket is (in this server) used for you to make suggestions!\n\n**Create a Ticket**\nClick on the 🎫 down below this message to create a ticket!")
            .setFooter(`Please start your message with\` *ticket\` and make sure that is over 10 words long.`)

        let m = await message.channel.send(embed)
        m.react("🎫")

    }
}
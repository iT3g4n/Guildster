const { MessageEmbed } = require("discord.js")

const randomcolour =  require(`../essentials/randomcolor`)

module.exports = {
    name: "ticket",
    description: "A ticket command",
    usage: "*ticket",
    async run (bot, message, args) {

        if (!message.channel.id === "739480654109999185") return;

        const msgArgs = 

    const ticketembed = new MessageEmbed()
    .setTitle(`Suggestion by ${message.author.tag}`)
    .setDescription(`\n**Suggestion**\n${msgArgs}`)
    .setColor(randomcolour)

    message.guild.channels.create(`${message.author.username}-create-a-ticket`)

    }
}
//      const embed = new MessageEmbed()
        // .setColor(randomcolour)
        // .setTitle("🎫  CREATE A TICKET  🎫")
        // .setDescription("***INFO***\n\n*What is a ticket?*\nA ticket is (in this server) used for you to make suggestions!\n\n**Create a Ticket**\nClick on the 🎫 down below this message to create a ticket!")

        // let m = await message.channel.send(embed)
        // m.react("🎫")
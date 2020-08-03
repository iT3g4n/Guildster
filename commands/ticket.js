const { MessageEmbed } = require("discord.js")

const randomcolour = "#" + Math.floor(Math.random() * 16777215).toString(16);

module.exports = {
    name: "ticket",
    description: "A ticket command",
    usage: "*ticket",
    async run(bot, message, args) {

        if (!args[ 1 && 2 && 3 && 4 && 5 && 6 && 7 && 8 && 9 ]) return message.channel.send("Please make the suggestion longer.")

        const msgArgs = args.slice().join(" ")

        const mrname = message.author.username.slice(1).join(" ")

        const ticketembed = new MessageEmbed()
            .setTitle(`Suggestion by @${message.author.tag}`)
            .setDescription(`\n**Suggestion**\n${msgArgs}`)
            .setColor(randomcolour);
        
        const ticketid = "739480654109999185"

        bot.channels.cache.get(ticketid).send(ticketembed).then(
            yourchannel = bot.guilds.channels.find(channel => channel.name.startsWith(mrname) === "General")
        )

    }
}
//      const embed = new MessageEmbed()
        // .setColor(randomcolour)
        // .setTitle("🎫  CREATE A TICKET  🎫")
        // .setDescription("***INFO***\n\n*What is a ticket?*\nA ticket is (in this server) used for you to make suggestions!\n\n**Create a Ticket**\nClick on the 🎫 down below this message to create a ticket!")

        // let m = await message.channel.send(embed)
        // m.react("🎫")
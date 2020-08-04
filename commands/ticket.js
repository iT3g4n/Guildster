const { MessageEmbed } = require("discord.js")

const randomcolour = "#" + Math.floor(Math.random() * 16777215).toString(16);

module.exports = {
    name: "ticket",
    description: "A ticket command",
    usage: "*ticket",
    async run(bot, message, args) {

        message.delete({ timeout: 0 })

        if (message.channel.name != `${message.author.id}-ticket`) return;

        if (!args[1 && 2 && 3 && 4 && 5 && 6 && 7 && 8 && 9]) return message.channel.send("Please make the suggestion longer.")

        const msgArgs = args.slice().join(" ")

        const ticketembed = new MessageEmbed()
            .setTitle(`Suggestion by @${message.author.tag}`)
            .setDescription(`\n**Suggestion**\n${msgArgs}`)
            .setColor(randomcolour);

        const ticketid = "739480654109999185"

        let fetchedChannel = message.guild.channels.cache.some(r => r.name === `${message.author.id}-ticket`);

        bot.channels.cache.get(ticketid).send(ticketembed)//.then(
        //bot.channels.cache.some(ch => ch.name(`${message.author.id}-ticket`)))
        //fetchedChannel.delete())

    }
}
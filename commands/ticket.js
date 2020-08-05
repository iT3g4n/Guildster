const { MessageEmbed } = require("discord.js")

const randomcolour = "#" + Math.floor(Math.random() * 16777215).toString(16);

module.exports = {
    name: "ticket",
    description: "A ticket command",
    usage: "*ticket",
    async run(bot, message, args) {

        message.delete()

        if (message.channel.name != `${message.author.id}-ticket`) return;

        if (!args[1 && 2 && 3 && 4 && 5 && 6 && 7 && 8 && 9]) return message.channel.send("Please make the suggestion longer.").then(m => m.delete({ timout: 5000 }))

        const msgArgs = args.slice().join(" ")

        const ticketembed = new MessageEmbed()
            .setTitle(`Suggestion by @${message.author.tag}`)
            .setDescription(`\n**Suggestion**\n${msgArgs}`)
            .setColor(randomcolour);

        const ticketid = "739480654109999185"

        // let fetchedChannel = message.guild.channels.cache.some(c => c.name === `${message.author.id}-ticket`);

        let m = await bot.channels.cache.get(ticketid).send(ticketembed)
        await m.react("⬆️")
        await m.react("⬇️")
        await message.channel.delete();

    }
}
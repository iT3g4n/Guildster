const { MessageEmbed } = require("discord.js");
const db = require(`./reaction`).db;

const randomcolour = "#" + Math.floor(Math.random() * 16777215).toString(16);

module.exports = {
    name: "ticket",
    description: "A ticket command",
    usage: "*ticket",
    async run(bot, message, args) {

        if (message.channel.name != `${message.author.id}-ticket`) return;

        if (!args[2]) return message.channel.send("Please make the suggestion longer.")

        const msgArgs = args.slice().join(" ")

        const ticketembed = new MessageEmbed()
            .setDescription(`**Suggestion by <@${message.author.id}>**\n\n**Suggestion**\n${msgArgs}`)
            .setColor(randomcolour);

        const ticketid = "739480654109999185"

        // let fetchedChannel = message.guild.channels.cache.some(c => c.name === `${message.author.id}-ticket`);

        let m = await bot.channels.cache.get(ticketid).send(ticketembed)
        message.channel.delete().catch(console.error())
        await m.react("⬆️")
        m.react("⬇️")
        db.delete(`TICKET: ${message.author.id}`)
        
    }
};
const { MessageEmbed, Client, Message } = require("discord.js");
const { db } = require(`../events/reaction`);
const mongo = require("../mongo");
const guildSchema = require("../schemas/guildSchema");

module.exports = {
    name: "ticket",
    aliases: ['tick', 'tt'],
    catagory: 'tickets',
    description: "If you are creating a ticket you use this to send it to the tickets channel! (Removing Soon)",
    usage: '[command] [your ticket]',
    /**
     * @param {Client} bot
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (bot, message, args) => {

        if (message.channel.name != `${message.author.id}-ticket`) return message.delete();

        if (!args[2]) return message.channel.send("Please make the suggestion longer.")

        const msgArgs = args.slice().join(" ")

        const ticketembed = new MessageEmbed()
            .setDescription(`**Suggestion by <@${message.author.id}>**\n\n**Suggestion**\n${msgArgs}`)
            .setColor('RANDOM');
        const ticketid = "739480654109999185"

        await mongo().then(async mongoose => {
            try {
                const channel = await guildSchema.findOne({ _id: message.guild.id })
                let m = await bot.channels.cache.get(channel.Tickets).send(ticketembed);
                await m.react("⬆️")
                m.react("⬇️")
            } finally {
                mongoose.connection.close()
            }
        })

        message.channel.delete().catch(err => console.error(err));
        db.delete(`TICKET: ${message.author.id}`)

    }
};
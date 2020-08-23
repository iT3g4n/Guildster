const discord = require("discord.js")
const { Client, Message } = require('discord.js')
const mongoose = require('mongoose');

new mongoose.Schema({
    id: String,
    reason: Array,
    moderator: String
})

module.exports = {
    name: 'warn',
    description: "this is a warn command!",

    /**
     * @param {Client} bot 
     * @param {Message} message
     * @param {String[]} args 
     */

    async run (bot, message, args) {

        if (message.member.permissions.has("MANAGE_MEMBERS")) {

            const mention = message.mentions.users.first() || message.guild.members.cache.get(args[0])
            mention.fetch()

            if(!mention) return message.reply("Please mention a valid user!")
            if(mention.bot) return message.reply("You can't warn a bot!")
            if(message.author.id === mention.id) return message.reply("You cant warn yourself!")
            if(message.guild.owner.id === mention.id) return message.reply("NO WARNING THE SERVER OWNER.")

            let reason = args.slice(1).join(" ");
            if(!reason) return message.reply("Please give a reason.");
            
            let warnEmbed = new discord.MessageEmbed()
            .setDescription(`**<@${mention.id}> has been warned**\n\nReason: ${reason}`)
            .setFooter(`Moderator ID: ${message.author.id}`)
            .setColor('ORANGE')

            db.set({
                id: mention.id,
                reason: reason,
                moderator: message.author.id
            })

                db.add(`warnings_${message.guild.id}_${mention.id}`, 1);
                mention.send(warnEmbed).catch(e => console.log(e))
                message.channel.send(`${mention} has been warned for: ${reason}`).then(r => r.delete({ timeout: 3000 }))
                bot.channels.cache.get("728653429785755730").send(warnEmbed);

            if (warnings = 3) return ("This person now has 3 warnings. Action: 2 hour mute")
            
        } else {

            return message.reply("YOU DO NOT HAVE ENOUGH PERMISIONS");

        }
    }}
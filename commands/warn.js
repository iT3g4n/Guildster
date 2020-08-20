const discord = require("discord.js")
const db = require("quick.db")
const { Client, Message } = require('discord.js')

module.exports = {
    name: 'warn',
    description: "this is a warn command!",

    /**
     * 
     * @param {Client} bot 
     * @param {Message} message
     * @param {String[]} args 
     */

    async run (bot, message, args) {

        if (message.member.permissions.has("MANAGE_MEMBERS")) {

            const user = message.mentions.users.first() || message.guild.members.cache.get(args[0])

            if(!user) return message.reply("Please mention a valid user!")
            if(user.bot) return message.reply("You can't warn a bot!")
            if(message.author.id === user.id) return message.reply("You cant warn yourself!")
            if(message.guild.owner.id === user.id) return message.reply("NO WARNING THE SERVER OWNER.")

            let reason = args.slice(1).join(" ")
            if(!reason) return message.reply("Please give a reason.")

            let warnings = db.get(`warnings_${message.guild.id}_${user.id}_`);
            
            let warnEmbed = new discord.MessageEmbed()
            .setDescription(`**<@${user.id}> has been warned**\n\nReason: ${reason}`)
            .setFooter(`Moderator ID: ${message.author.id}`)
            .setColor('ORANGE')

            if (warnings = null || (warnings = 1) || (warnings = 2) || (warnings = 3)) {
                db.add(`warnings_${message.guild.id}_${user.id}_${reason}`, 1);
                user.send(warnEmbed).catch(console.log(`could not send ${user.tag} a dm. They must open them first.`))
                await message.channel.send(`**${user.tag}** has been warned for: ${reason}`).then(r => r.delete({ timeout: 3000 }))
                bot.channels.cache.get("728653429785755730").send(warnEmbed);
            }

            if (warnings = 3) return ("This person now has 3 warnings. Action: 2 hour mute")
            
        } else {

            return message.reply("YOU DO NOT HAVE ENOUGH PERMISIONS");

        }
    }}
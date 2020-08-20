const db = require("quick.db")
const { Client, Message } = require('discord.js')

module.exports = {
    name: 'warnings',
    description: "this is a warnings command!",

    /**
     * @param {Client} bot 
     * @param {Message} message 
     * @param {String[]} args 
     */

    async run(bot, message, args) {

        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("YOU DO NOT HAVE ENOUGH PERMISSIONS")

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        if (!user) return message.reply("Please give a Name / ID")

        let warnings = await db.get(`warnings_${message.guild.id}_${user.id}`, 1);

        if (warnings === null) {
            warnings = 0;
        }

        message.channel.send(`${user.tag} has **${warnings}** warnings.`);

    }
}
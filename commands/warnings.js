const db = require("quick.db")

module.exports = {
    name: 'warnings',
    description: "this is a warnings command!",
    async run (bot, message, args) {

        if (message.member.roles.cache.has("728443375778529400") || (message.member.roles.cache.has("71628940296349302")) || (message.member.roles.cache.has("728443657140830299")) || (message.member.roles.cache.has("716238674089476116"))) {

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.reply("Please give a Name / ID")

        let warnings = await db.get(`warnings_${message.guild.id}_${user.id}`, 1);

        if(warnings === null) {
        warnings = 0;
        }

        message.channel.send(`**${user.username || user.id}** has **${warnings}** warnings.`);

    } else {
        message.reply("YOU DO NOT HAVE ENOUGH PERMISSIONS")
    }
}}
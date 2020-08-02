const db = require("quick.db")

module.exports = {
    name: 'clearwarn',
    description: "this deletes warnings for a specific user!",
    async run (bot, message, args) {
        
        const user =  message.mentions.users.first() || message.guild.members.cache.get(args[0])

        const perms = (message.member.roles.cache.has("728443375778529400") || (message.member.roles.cache.has("71628940296349302")) || (message.member.roles.cache.has("728443657140830299")) || (message.member.roles.cache.has("716238674089476116")))

        if (perms) {
            
            let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

            if(!user) return message.reply("Please mention a valid user!")
            if(user.bot) return message.reply("You can't warn a bot!")
            if(user.id === message.author.id) return message.reply("You can't clear your own warnings!")

            if(warnings === null) return message.reply(`${user.username} is now clean!`)

            db.delete(`warnings_${message.guild.id}_${user.id}`);
            message.channel.send(`Warnings for ${user.username || user.id} have been cleared!`)

    } else return message.reply("YOU DO NOT HAVE ENOUGH PERMISSIONS")
}}
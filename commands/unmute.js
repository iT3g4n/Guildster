const { MessageEmbed } = require(`discord.js`)

module.exports = {
    async run (bot, message, args) {

        if (!message.member.has(`MANAGE_MESSAGES`)) return message.channel.send(`YOU DO NOT HAVE ENOUGH PERMISSIONS TO DO THIS COMMAND!`).then(m => m.delete({ timeout: 5000 }))

        let mention = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if (!mention) return message.channel.send(`Please include someone to unmute.`).then(m => m.delete({ timeout: 5000 }))
        console.log(mention)

        const embed = new MessageEmbed()
        .setDescription(`**MEMBER UNMUTED > ${mention}**`);

        bot.channels.cache.get("728653429785755730").send(embed);
    }
}
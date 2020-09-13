const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'socials',
    aliases: ['media'],
    catagory: 'fun',
    description: "This gives you my socials!",
    async run(bot, message, args) {

        message.channel.send(new MessageEmbed()
            .setColor('RANDOM')
            .setTitle("T3g4n's Socials")
            .setFooter('|  Socials Command', message.author.avatarURL({ dynamic: true }))
            .setTimestamp(Date.now())
            .addField(`Youtube`, "https://www.youtube.com/T3g4n")
            .addField(`Twitch`, `https://twitch.tv/T3g4n`)
            .addField(`Twitter`, `https://twitter.com/@TwitchT3g4n`)
            .addField(`Instagram`, 'https://instagram.com/TTV_T3g4n')
        )
    }
}
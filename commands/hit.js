const { MessageEmbed, Message } = require('discord.js')

this.name = 'Hit'
this.description = 'Hits the mentioned person!'
this.run = async(asdfasdf, message, args) => {
    const mention = message.mentions.members.first()
    if (!mention) return message.reply(new MessageEmbed().setDescription(`You did not mention anybody!`)).then(m => m.delete({ timeout: 5000 }))
    if (mention.id === message.author.id) return message.channel.send(new MessageEmbed().setDescription(`You have hit yourself! You are now angry with yourself. Good Job, You.`))

    message.channel.send(new MessageEmbed().setDescription(`You hit ${mention}! They are now angry with you.`))
}
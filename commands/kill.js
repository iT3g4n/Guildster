const { MessageEmbed, Message } = require('discord.js')

this.name = 'Kill'
this.aliases = ['destoy', '1v1', 'die']
this.catagory = 'hitting',
this.usage = '[command] [mention]'
this.description = 'Kills the mentioned person!'
this.run = async(asdfasdf, message, args) => {
    const mention = message.mentions.members.first()
    if (!mention) return message.reply(new MessageEmbed().setDescription(`You did not mention anybody!`)).then(m => m.delete({ timeout: 5000 }))
    if (mention.id === message.author.id) return message.channel.send(new MessageEmbed().setDescription(`You have killed yourself! You are now angry with yourself. Wait, you are dead.`))

    message.channel.send(new MessageEmbed().setDescription(`You have killed ${mention}! They are now angry with you.`))

}
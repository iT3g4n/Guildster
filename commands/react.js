const { Message, Client, Emoji } = require("discord.js")

this.name = 'React'
this.aliases = ['r', 'rm']
this.description = 'Reacts to any message!'
/**
 * 
 * @param {Client} bot 
 * @param {Message} message 
 * @param {String[]} args 
 */
this.run = async(bot, message, args) => {
    if (!args[0]) return message.reply(bot.embed.setDescription('Please give an emoji to react with.')).then(m => m.delete({ timeout: 5000 }));
    message.react(args[0]).catch(() => {
        return message.reply('That is not an emoji!').then(m => m.delete({ timeout: 5000 }))
    })
}
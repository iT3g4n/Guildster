const { Client, Message } = require("discord.js");
const newembed = require(`../newembed`)
this.name = 'Test'

module.exports = {
    name: 'Test',
    description: '**BOT-OWNER-ONLY**\nThis is just for testing commands and such.',
    /**
     * @param {Client} bot
     * @param {Message} message
     * @param {String[0]} args
     */
    run: async(bot, message, args) => {

        await newembed(message, this).then(async embed => {
            embed.setDescription(`Test`).setTitle(`Also a test`);
            message.channel.send(embed)
        })

        
    }
}
const newembed = require("../newembed");
const { Message, Client } = require(`discord.js`)
this.name = 'Eval'

module.exports = {
    description: '**BOT-OWNER-ONLY**\nTests some code out!',
    /**
     * @param {Client} bot
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (bot, message, args) => {

        if (message.author.id !== '381024325974622209') return message.reply(`You cannot do that!`).then(msg => msg.delete({ timeout: 5000 }));

        if (!args.join(' ')) return message.reply(`You did not give any arguments`).then(msg => msg.delete({ timeout: 5000 }))

        newembed(message, this).then(async embed => {

            let evaled;
            try {
                evaled = await eval(args.join(' '));
                embed.setTitle(`Success!`).addField('Result' ,`\`${evaled}\``);
            } catch (error) {
                embed.setTitle(`Failed`).addField(`Result`, `\`${error}\``);
            }

            let msg = await message.channel.send(embed)
            msg.react(`❌`)

            const filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id
            msg.awaitReactions(filter, {time: 10000})
                .then(collected => {
                    if (collected.size === 1) return msg.delete()
                })

                const filter2 = (reaction, user) => reaction.emoji.name === '✔' && user.id === message.author.id
                msg.awaitReactions(filter2, {time: 10000})
                    .then(collected => {
                        if (collected.size === 1) return;
                    })

        })
    }
}
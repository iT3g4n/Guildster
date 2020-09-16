const newembed = require("../newembed");
const { Message, Client } = require(`discord.js`)
const { inspect } = require(`util`);
const { owners } = require("../Bot");

module.exports = {
    name: 'Eval',
    aliases: ['e', 'ev'],
    catagory: 'owner',
    usage: '[command] [code]',
    description: 'Tests some code out!',
    /**
     * @param {Client} bot
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (bot, message, args) => {

        if (!owners.includes(message.author.id)) return message.reply(`You cannot do that!`).then(msg => msg.delete({ timeout: 5000 }));

        if (!args.join(' ')) return message.reply(`You did not give any arguments`).then(msg => msg.delete({ timeout: 5000 }))

        newembed(message, this).then(async embed => {

            let evaled;

            try {
                evaled = eval(args.join(' '))
                embed.setDescription(`**Result**\n\`\`\`${evaled}\`\`\``);
            } catch (error) {
                embed.setDescription(`**Result**\n\`\`\`${error}\`\`\``);
            }

            let msg = await message.channel.send(embed)

        })
    }
}
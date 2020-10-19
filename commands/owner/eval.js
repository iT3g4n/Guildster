const { Message, Client } = require(`discord.js`)
const { inspect } = require(`util`);
const { bot } = require('./../../index');
const { owners } = bot;
require('dotenv').config();

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
    run: async (a, message, args) => {
        if (message.author.partial) await message.author.fetch();

        if (!owners.includes(message.author.id)) return message.reply(bot.error(`You cannot do that!`)).then(msg => msg.delete({ timeout: 5000 }));

        const embed = bot.embed

        const query = args.join(' ')
        const code = (lang, code) => (`\`\`\`${lang}\n${String(code).slice(0, 1000) + (code.length >= 1000 ? '...' : '')}\n\`\`\``).replace(process.env.TOKEN, '*'.repeat(process.env.TOKEN.toString().length))

        if (!query) message.channel.send(bot.error('Please, write something so I can evaluate!'))
        else {
            bot.embed.addField('**Input 📥**', `\`\`\`css\n${query}\`\`\``)
            try {
                const evald = eval(query)
                const res = typeof evald === 'string' ? evald : inspect(evald, { depth: 0 });

                bot.embed.addField('**Result ✔️**', code('js', res)).setColor('GREEN');
            } catch (error) {
                bot.embed
                    .addField('Error ❌', code('js', error))
                    .setColor('RED')
            } finally {
                message.channel.send(bot.embed).catch(error => {
                    message.channel.send(bot.error(`There was an error while displaying the eval result! ${error.message}`))
                })
            }
        }

    }
}

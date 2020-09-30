const { Message } = require("discord.js");
const { bot } = require('./../../index');

this.name = 'React'
this.aliases = ['r', 'rm']
this.catagory = 'fun',
this.description = 'Reacts to any message!'
this.usage = '[command] [reaction] [rest of your message]'
/**
 * @param {Message} message 
 * @param {String[]} args 
 */
this.run = async(baot, message, args) => {
    if (!args[0]) return message.reply(senderror({ description: 'you did not send any emoji!'})).then(m => m.delete({ timeout: 5000 }));
    let emoji;
    try {
        emoji = message.guild.emojis.cache.get(args[0]);
    } catch (err) {
        return senderror('That is not an emoji. Please give an id if it is custom.');
    }
    
    
    message.react(emoji || args[0]).catch(async () => {
        const m = await message.reply('That is not an emoji!');
        return await m.delete({ timeout: 5000 });
    })
}
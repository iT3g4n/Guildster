const { Message } = require('discord.js');
const { bot } = require('../../index');
const play = require('ytdl-core')

this.name = 'Join'
this.aliases = ['j', 'voice', 'joinvoice']
this.usage = '[command]'
this.description = 'Joins the voice channel that you are in!'
this.catagory = 'music'
/**
 * @param {Message} message 
 * @param {String[]} args 
 */
this.run = async(a, message, args) => {
    if (!message.member.voice.channel.id) return message.reply(bot.embed.setDescription('You are not in a voice channel!')).then(m => m.delete({ timeout: 5000 }));
    const channel = await message.member.voice.channel.join()
    await message.guild.me.voice.setDeaf(true)
    const msg = await message.reply(bot.embed.setDescription(`I have joined the voice channel called \`${message.member.voice.channel.name}\`!`));
    msg.react('❌');

    channel.play(play('https://www.youtube.com/watch?v=oHg5SJYRHA0'), { bitrate: 70000})

    bot.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.emoji.name === '❌' && user.id === message.author.id) msg.delete(), message.delete(), message.guild.me.voice.channel.leave()
    })
}
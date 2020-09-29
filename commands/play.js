const { Message, MessageEmbed } = require('discord.js');
const { bot } = require('../index');
const play = require('ytdl-core')
const search = require('yt-search');

this.name = 'Play'
this.aliases = ['p']
this.usage = '[command] [song name or link]'
this.description = 'Plays a song in the voice channel that you are in!'
this.catagory = 'fun'
/**
 * @param {Message} message 
 * @param {String[]} args 
 */
this.run = async(a, message, args) => {
    if (!message.member.voice.id) return message.reply(bot.error('You are not in a VC, ' + message.author + '!'));

    const query = args.join(' ');
    if (!query) return message.reply(bot.error('You did not specify anything to play!'))

    const embed = new MessageEmbed().setColor('GREEN')

    await message.member.voice.channel.join().then(async vc => {
        await search(query).then((data, err) => {
            if (err) console.error(err);
    
            try {
                vc.play(play(data.all[0].url));
            } catch (e) {
                console.error(e)
            }
            embed.addField('Now Playing', data.all[0].title);
            embed.addField('Artist', data.all[0].author.name);
            embed.addField('Length', data.all[0].duration.timestamp);
            embed.setURL(data.all[0].url)
            bot.musicqueue.set(message.guild.id, `${data.all[0].title})(${data.all[0].duration.timestamp}`);
        }).catch(e => {
            message.reply(e);
        });
    })
    message.reply(embed);
}
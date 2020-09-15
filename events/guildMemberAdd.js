const { GuildMember } = require('discord.js');
const { bot } = require('../Client');
const fetch = require('node-fetch')
const discord = require('discord.js');
/**
 * @param {GuildMember} member 
 */
this.run = async (member) => {
    let d = await fetch('https://api.no-api-key.com/api/v2/captcha').then(res => res.json());
    try {
        const dm = await member.send(new discord.MessageEmbed().setColor('RANDOM').setDescription('Welcome to this server! Please type in the message on the picture to verify!'));
        await member.send(d.captcha)
        const collector = dm.channel.createMessageCollector((x) => x.author.id == message.author.id);
        i = 0
        collector.on('collect', message => {
            if (message.content.toLowerCase() !== d.captcha_text.toLowerCase()) {
                i++;
                message.reply(new discord.MessageEmbed().setColor('RANDOM').setDescription('That is not the correct text. Please try again.'));
                if (i >= 3) collector.stop('failed');
            } else if (message.content.toLowerCase() == d.captcha_text.toLowerCase()) return collector.stop('yes');
        })

        collector.on('end', (collected, reason) => {
            if (reason == 'failed') {
                dm.channel.send(new discord.MessageEmbed().setColor('RANDOM').setDescription('You have failed. Please type ' + `*verify again in the server.`));
            } else if (reason == 'yes') {
                member.roles.add(member.guild.roles.cache.find(r => r.name.toLowerCase() === 'member'));
                member.send(new discord.MessageEmbed().setColor('RANDOM').setDescription('Success! You now have full access to the server!'));
                return;
            }
        })
    } catch (err) {
        member.guild.channels.cache.get('716239917751206048').send(`Hey ${member}! Please open your DM's to verify!`).then(m => m.delete({ timeout: 20000 }));
    };
};
const { GuildMember } = require('discord.js');
const { bot } = require('../Bot');
const fetch = require('node-fetch')
const discord = require('discord.js');
/**
 * @param {GuildMember} member 
 */
this.run = async (member) => {

    await member.fetch();

if (Date.now() - member.joinedAt <= 1000) {
    member.guild.channels.cache.find(r => r.name.includes('welcome' || 'general')).send(new discord.MessageEmbed({
        color: 'BLUE',
        author: { name: 'Welcome to ' + member.guild.name + `, <@${member.id}>!`, icon_url: member.user.avatarURL({ dynamic: true, size: 2048 })},
        description: `We hope that you enjoy your time here,`
    }))
}

    const d = await fetch('https://api.no-api-key.com/api/v2/captcha').then(res => res.json());
    try {
        const dm = await member.send(new discord.MessageEmbed().setColor('RANDOM').setDescription('Welcome to this server! Please type in the message on the picture to verify!'));
        await member.send(d.captcha)
        const collector = dm.channel.createMessageCollector((x) => x.author.id == member.id);

        setTimeout(() => {
            if (!collector) return;
            collector.stop('too long');
        }, 1000 * 60 * 2);

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
            } else if (reason == 'too long') {
                member.send(`I'm sorry but you have taken too long! Please do the verify command again!`);
            }
        })
    } catch (err) {
        member.guild.channels.cache.first().send(`Hey ${member}! Please open your DM's to verify!`).then(m => m.delete({ timeout: 20000 }));
    };
};
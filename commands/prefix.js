const guild = require(`../schemas/guildSchema`)
const { Client, Message } = require("discord.js");
const mongo = require("../mongo");

module.exports = {
    name: 'Prefix',
    aliases: ['pre', 'startofmessage'],
    catagory: 'moderation',
    usage: '[command] [optional setprefix]',
    description: `Sets the prefix for this guild!`,
    /**
     * @param {Client} bot
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (bot, message, args) => {

        let msg = await message.channel.send(`Working...`)

        await mongo().then(async mongoose => {
            try {
                let prefixa = await guild.findOne({ _id: message.guild.id })
                let prefix = prefixa.Prefix

                if (!args[0]) return msg.edit(`The prefix for ${message.guild.name} is \`${prefix}\``);

            } finally {
                mongoose.connection.close()
            }
        })

        if (!args[0]) return;

        await mongo().then(async mongoose => {

            if (!message.member.hasPermission(`ADMINISTRATOR`)) return message.channel.send(`You don't have enough permissions to do that!`);

            try {

                await guild.findOneAndUpdate({ _id: message.guild.id }, {
                    Prefix: args[0]
                }, { upsert: true })

                let prefixa = await guild.findOne({ _id: message.guild.id })
                let prefix = prefixa.Prefix

                msg.edit(`:white_check_mark: Success! The prefix for ${message.guild.name} is now \`${prefix}\``);

            } finally {

                mongoose.connection.close();

            };
        });

    }
};
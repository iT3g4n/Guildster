const guild = require(`../schemas/guildSchema`)
const { Client, Message } = require("discord.js");
const mongo = require("../mongo");

module.exports = {
    description: `**ADMIN-ONLY**\nSets the prefix for this guild!`,
    /**
     * @param {Client} bot
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (bot, message, args) => {

        await mongo().then(async mongoose => {
            try {
                let prefixa = await guild.findOne({ Guild: message.guild.id })
                let prefix = prefixa.Prefix

                if (!args[0]) return message.channel.send(`The prefix for ${message.guild.name} is \`${prefix}\``);

            } finally {
                mongoose.connection.close()
            }
        })

        if (!args[0]) return;

        await mongo().then(async mongoose => {

            if (!message.member.hasPermission(`ADMINISTRATOR`)) return message.channel.send(`You don't have enough permissions to do that!`);

            try {

                await guild.findOneAndUpdate({ Guild: message.guild.id }, {
                    Prefix: args[0]
                }, { upsert: true })

                message.channel.send(`:white_check_mark: Success! The prefix for ${message.guild.name} is now \`${args[0]}\``);

            } finally {

                await mongoose.connection.close();

            };
        });

    }
};
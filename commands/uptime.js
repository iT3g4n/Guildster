const { MessageEmbed } = require("discord.js")
const ms = require("ms");
const newembed = require("../newembed");
const randomcolour = "#" + Math.floor(Math.random() * 16777215).toString(16);

module.exports = {
    name: "Uptime",
    aliases: ['time', 'long'],
    catagory: 'fun',
    description: "Tells you how long the bot has been online!",
    usage: '[command]',
    async run(bot, message, args) {

        message.delete({ timeout: 0 })

        let m = await message.channel.send("Checking Uptime...")

        const uptime = ms(bot.uptime, { long: true })

        await newembed(message, require(`./uptime`)).then(async embed => {
            embed
                .setTitle("Uptime")
                .setDescription(`I have been online for:\n\`${uptime}\``);
            await m.edit(embed);
        });
        
        m.edit("");
    }
}
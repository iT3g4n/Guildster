
//var user = Object.create(user)
//const guild = new discord.Guild(bot, user);
//const member = new discord.GuildMember(bot, user, guild);

const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'kick',
    description: "this is a kick command!",
    execute(bot, message, args) {

        if (message.member.roles.cache.has("728443375778529400") || (message.member.roles.cache.has("71628940296349302")) || (message.member.roles.cache.has("728443657140830299")) || (message.member.roles.cache.has("716238674089476116"))) {

        var kickedmember = message.mentions.members.first(); // sets the mentioned user to the var kickedmember
        if (!kickedmember) return message.reply("Please mention a valid member of this server!") // if there is no kickedmmeber var
        if (!kickedmember.kickable) return message.reply("I cannot kick this member!") // if the member is unkickable
        var kickreasondelete = 10 + kickedmember.user.id.length //sets the length of the kickreasondelete
        var kickreason = message.content.substring(kickreasondelete).split(" "); // deletes the first letters until it reaches the reason
        var kickreason = kickreason.join(" "); // joins the list kickreason into one line
        if (!kickreason) return message.reply("Please indicate a reason for the kick!") // if no reason
        kickedmember.kick(kickreason) //if reason, kick
            .catch(error => message.reply(`Sorry @${message.author} I couldn't kick because of : ${error}`)); //if error, display error
        message.reply(`${kickedmember.user.username} has been kicked by ${message.author.username} because: ${kickreason}`); // sends a message saying he was kicked

        const embed = new MessageEmbed()
        .setTitle(`<@${kickedmember.user.id}> has been kicked`)
        .addField(`Reason:`, `${kickreason}`)
        .setFooter(`Moderator ID: ${message.author.id}`)

        bot.channels.cache.get("728653429785755730").send(embed);

        } else {
            message.reply("YOU DO NOT HAVE ENOUGH PERMISIONS")
        }
}}
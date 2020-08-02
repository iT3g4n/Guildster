module.exports = {
    name: 'ban',
    description: "this is a ban command!",
    execute(bot, message, args) {

        if (message.member.roles.cache.has("728443375778529400") || (message.member.roles.cache.has("71628940296349302")) || (message.member.roles.cache.has("728443657140830299")) || (message.member.roles.cache.has("716238674089476116"))) {
        
        var bannedmember = message.mentions.members.first(); // sets the mentioned user to the var bannedmember
        if (!bannedmember) return message.reply("Please mention a valid member of this server!") // if there is no banedmmeber var
        if (!bannedmember.bannable) return message.reply("I cannot ban this member!") // if the member is unbanable
        var banreasondelete = 10 + bannedmember.user.id.length //sets the length of the banreasondelete
        var banreason = message.content.substring(banreasondelete).split(" "); // deletes the first letters until it reaches the reason
        var banreason = banreason.join(" "); // joins the list banreason into one line
        if (!banreason) return message.reply("Please indicate a reason for the ban!") // if no reason
        bannedmember.ban(banreason) //if reason, ban
            .catch(error => message.reply(`Sorry <@${message.author.id}> I couldn't ban because of : ${error}`)); //if error, display error

            cont 

            bot.channels.cache.get('728653429785755730').send(`${bannedmember.user.username} has been banned by ${message.author.username} reason: ${banreason}`)
           ; // sends a message saying he was baned

} else {
    message.reply("YOU DO NOT HAVE ENOUGH PERMISIONS")
}
}};
module.exports = {
    name: "Time",
    aliases: [],
    catagory: 'fun',
    usage: '[command]',
    description: "Sends my time in an embed!",
    run: (client, message, args) => {
        const date = new Date()
        message.reply(client.embed.setDescription(`My date:
        ${date}`))
    }
}
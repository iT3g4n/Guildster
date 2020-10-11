module.exports = {
    name: "time",
    aliases: ['d', 'doggy', 'doggo', 'puppy', 'pup', 'dogs'],
    catagory: 'fun',
    usage: '[command]',
    description: "Sends a random dog to the channel of the message!",
    run: (client, message, args) => {
        const date = Date.now();
        message.reply(client.embed.setDescription(`My date:
        ${date.toLocaleString()}`))
    }
}
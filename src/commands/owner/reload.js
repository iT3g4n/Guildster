const { bot } = require('../../index');
this.name = 'Reload'
this.description = 'Reloads a specific command!'
this.aliases = []
this.catagory = 'owner'
this.usage = '[command] [command to reload]'
this.run = async(a, message, args) => {
    if (!bot.owners.includes(message.author.id)) return;

    const cmd = args[0]
    if(!cmd) return message.channel.send(bot.error('You did not specify a command to reload!'));

    const command = bot.commands.get(cmd.toLowerCase()) || bot.commands.find(a => a.aliases && a.aliases.includes(cmd.toLowerCase()));
    if(!command) return message.reply(bot.error('There is no command called `' + `${cmd.toUpperCase()}\`. Please try again`));

    delete require.cache[require.resolve(`../${command.catagory}/${command.name.toLowerCase()}`)];
    try {
        const newCommand = require(`../${command.catagory}/${command.name.toLowerCase()}`)
        bot.commands.set(command.name.toLowerCase(), newCommand)
        message.reply(bot.embed.setDescription('Sucessfully reloaded the command `' + `${cmd.toLowerCase()}\``));
    } catch (err) {
        console.error(err);
        message.reply(bot.error('There was an error adding the command to the command set.\n' + err.message));
    }
}
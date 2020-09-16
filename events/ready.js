const ms = require(`ms`)

this.run = async(bot) => {
    console.log(`logged in as ${bot.user.tag}`);

  activities_list = [
    { name: `over ${bot.guilds.cache.size} guilds! | *help`, type: 'WATCHING', url: 'https://www.youtube.com/T3g4n' },
    { name: `with ${bot.users.cache.size} users! | *help`, type: 'PLAYING' },
    { name: `the *help command!`, type: 'WATCHING' },
    { name: `${bot.commandlength} Commands! | *help`, type: 'LISTENING' }
  ]

  bot.channels.cache.get('714809218024079435')

  setInterval(() => {

    const index = Math.floor(Math.random() * activities_list.length);

    bot.user.setActivity(activities_list[index]);

  }, 1000 * 5);
}
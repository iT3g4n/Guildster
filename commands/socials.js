module.exports = {
    name: 'socials',
    description: "This gives you my socials!",
    async run (bot, message, args){
        
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);

        message.channel.send({embed: {
            color: (randomColor),
            title: "T3g4n's Socials",
            fields: [
              { name: "Youtube", value: "https://www.youtube.com/WinnerKiller966"},
              { name: "Twitch", value:   "https://twitch.tv/T3g4n"},
              { name: "Twitter", value:  "https://twitter.com/@TwitchT3g4n"},
              { name: "Instagram", value:"https://instagram.com/TTV_T3g4n"} 
            ]
        }
        });
    }}
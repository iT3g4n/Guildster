const { bot } = require("../index");

module.exports = () => {

  bot.helpEmbed.setTitle("All Commands for " + bot.username)

  bot.allCatagorys.forEach((catagory) => {
    const results = bot.catagorys[catagory];
    bot.helpEmbed.addField(catagory, `\`${results.join(", ")}\` `);
  });
};

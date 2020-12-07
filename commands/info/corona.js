const { Message, MessageEmbed } = require("discord.js");
const { bot } = require("./../../index");
const corona = require("novelcovid");

this.name = "Corona";
this.aliases = ["covid", "covid-19", "coronavirus"];
this.usage = "[command] [optional country]";
this.description = "Gets info for COVID-19!";
this.catagory = "info";
/**
 * @param {Message} message
 * @param {String[]} args
 */
this.run = async function (a, message, args) {
  if (!args[0]) {
    const all = await corona.all();

    message.reply(
      bot.embed
        .setTitle("Global COVID-19 Statistics")
        .setDescription(
          `\n**THIS DATA IS OUT OF ${
            all.tests
          } TESTS**\n**UPDATED ON ${new Date(all.updated)
            .toDateString()
            .toUpperCase()}**\n`
        )
        .addField("Cases Today", all.todayCases)
        .addField("Deaths Today", all.todayDeaths)
        .addField("Recovered Today", all.todayRecovered)
        .addField("Critical Patients", all.critical)
        .addField("\u200b", "\u200b")
        .addField("Total Deaths", all.deaths)
        .addField("Total Cases", all.cases)
    );
    return;
  }

  const all = await corona.countries({
    country: args.join(" ").toLowerCase(),
  });

  if (!all.tests)
    return message.reply(
      bot.error(`I could not find \`${args.join(" ")}\` in my database.`)
    );

  message.reply(
    bot.embed
      .setTitle(args.join(" ").toUpperCase() + " COVID-19 Statistics")
      .setDescription(
        `\n**THIS DATA IS OUT OF ${all.tests} TESTS**\n**UPDATED ON ${new Date(
          all.updated
        )
          .toDateString()
          .toUpperCase()}**\n`
      )
      .addField("Cases Today", all.todayCases)
      .addField("Deaths Today", all.todayDeaths)
      .addField("Recovered Today", all.todayRecovered)
      .addField("Critical Patients", all.critical)
      .addField("\u200b", "\u200b")
      .addField("Total Deaths", all.deaths)
      .addField("Total Cases", all.cases)
  );
};

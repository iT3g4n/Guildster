const { GuildMember } = require("discord.js");
const { bot } = require("../index");
const fetch = require("node-fetch");
const discord = require("discord.js");
const welcomeSchema = require("../schemas/welcomeSchema");
/**
 * @param {GuildMember} member
 */
this.run = (member) => {
  /* Verifying */
  (async () => {
    await member.fetch();

    const d = await fetch(
      "https://api.no-api-key.com/api/v2/captcha"
    ).then((res) => res.json());
    try {
      const dm = await member.send(
        new discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(
            `Welcome to this server! Please type in the message on the picture to verify!`
          )
          .setImage(d.captcha)
      );
      const collector = dm.channel.createMessageCollector(
        (x) => x.author.id == member.id
      );

      setTimeout(() => {
        if (!collector) return;
        collector.stop("too long");
      }, 1000 * 60 * 2);

      i = 0;
      collector.on("collect", (message) => {
        if (message.content.toLowerCase() !== d.captcha_text.toLowerCase()) {
          i++;
          message.reply(
            new discord.MessageEmbed()
              .setColor("RANDOM")
              .setDescription("That is not the correct text. Please try again.")
          );
          if (i >= 3) collector.stop("failed");
        } else if (
          message.content.toLowerCase() == d.captcha_text.toLowerCase()
        )
          return collector.stop("yes");
      });

      collector.on("end", (collected, reason) => {
        if (reason == "failed") {
          dm.channel.send(
            new discord.MessageEmbed()
              .setColor("RANDOM")
              .setDescription(
                "You have failed. Please type " +
                  `*${bot.prefixes.get(
                    member.guild.id
                  )}verify again in the server.`
              )
          );
        } else if (reason == "yes") {
          const rolenames = [
            "member",
            "verified",
            "members",
            "melonas",
            "melons",
            "people",
            "peoples",
            "all",
          ];
          let roleId;
          rolenames.forEach((rolename) => {
            member.guild.roles.cache
              .filter((role) => {
                if (
                  role.name.toLowerCase().includes(rolename) &&
                  role.rawPosition > 5
                )
                  roleId = role.id;
              })
              .last();
          });
          if (!roleId)
            return member.send(
              new discord.MessageEmbed().setDescription(
                "There is no role to give you in the server. Please contact " +
                  `<@${member.guild.owner.id}>`
              )
            );
          member.roles
            .add(roleId)
            .catch((e) => console.error(`COULD NOT ADD ROLE:`, e));
          console.log(`GAVE ROLE TO USER`, member.user.tag, roleId);
          member.send(
            new discord.MessageEmbed()
              .setColor("RANDOM")
              .setDescription(
                "Success! You now have full access to the server!"
              )
          );
          return;
        } else if (reason == "too long") {
          member.send(
            `I'm sorry but you have taken too long! Please do the verify command again!`
          );
        }
      });
    } catch (err) {
      member.guild.channels.cache
        .find((c) => c.name.includes("verify"))
        .send(`Hey ${member}! Please open your DM's to verify!`)
        .then((m) => m.delete({ timeout: 20000 }));
    }
  })();

  /* Sending a message for the new member */
  (async () => {
    const results = await welcomeSchema.findOne({ _id: member.guild.id });
    if (!results) return;

    await member.fetch();
    const channel = member.guild.channels.cache.get(results.channelId);
    if (!channel) return;

    const sender = results.message.replace("<@>", `<@${member.id}>`);
    channel.send(sender);
  })();
};

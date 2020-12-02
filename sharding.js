const { ShardingManager } = require("discord.js");
const { bot } = require("./index");

const manager = new ShardingManager("./index.js", {
  totalShards: "auto",
  token: bot.token,
});

manager.spawn();
manager.on("shardCreate", (shard) => console.log(`Shard ${shard.id} launched`));

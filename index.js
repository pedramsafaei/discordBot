const discord = require("discord.js");
const client = new discord.Client();
const { prefix, token } = require("./config.json");

client.once("ready", () => {
  console.log("Ready!");
});
client.login(token);

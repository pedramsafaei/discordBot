const discord = require("discord.js");
const client = new discord.Client();
const { prefix, token, giphyToken } = require("./config.json");

var GphApiClient = require("giphy-js-sdk-core");
client = GphApiClient(giphyToken);

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", (message) => {
  if (message.member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"])) {
    if (message.content.startsWith(`${prefix}kick`)) {
      //console.log(message.content);
      //message.channel.send("Kick");
      let member = message.mentions.members.first();
      member.kick().then((member) => {
        message.channel.send(
          ":wave: " + member.displayName + " has been kicked!"
        );
      });
    }
  }
});

client.login(token);

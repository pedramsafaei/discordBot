const discord = require("discord.js");
const client = new discord.Client();
require("dotenv").config();

var GphApiClient = require("giphy-js-sdk-core");
giphy = GphApiClient(process.env.giphyToken);

client.once("ready", () => {
  console.log("Bot running successfully!");
});

client.on("message", (message) => {
  //KICK MEMBERS
  if (message.content.startsWith(`${process.env.prefix}kick`)) {
    if (message.member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"])) {
      let member = message.mentions.members.first();
      member.kick().then((member) => {
        giphy
          .search("gifs", { q: "fail" })
          .then((response) => {
            var totalResponses = response.data.length;
            var responseIndex =
              Math.floor(Math.random() * 10 + 1) % totalResponses;
            var responseFinal = response.data[responseIndex];
            message.channel.send(
              ":middle_finger: " +
                member.displayName +
                " has been kicked! " +
                ":middle_finger: ",
              {
                files: [responseFinal.images.fixed_height.url],
              }
            );
            console.log(files);
          })
          .catch(() => {
            message.channel.send("Can't kick out the fucking user!!!");
          });
      });
    }
  }
  //FIND GIFS
  if (message.content.startsWith(`${process.env.prefix}gif`)) {
    if (message.member.hasPermission(["SEND_MESSAGES"])) {
      var actualgif = message.content.split("gif").pop();
      actualgif = actualgif.trim();
      giphy
        .search("gifs", { q: actualgif })
        .then((response) => {
          var totalResponses = response.data.length;
          var responseIndex =
            Math.floor(Math.random() * 10 + 1) % totalResponses;
          var responseFinal = response.data[responseIndex];
          message.channel.send({
            files: [responseFinal.images.fixed_height.url],
          });
        })
        .catch(() => {
          message.channel.send("Can't find this gif you FUCKER!!!");
        });
    }
  }
  //SEND DM
  if (message.content.startsWith(`${process.env.prefix}dm`)) {
    if (message.member.hasPermission(["SEND_MESSAGES"])) {
      try {
        let guildMemeber = message.mentions.members.first();
        messageString = message.content.split(guildMemeber.id).pop();
        guildMemeber.send(`${message.member.user} says ` + messageString);
        message.delete();
      } catch (err) {}
    }
  }
  if (message.content.startsWith(`${process.env.prefix}game`)) {
    if (message.member.hasPermission(["SEND_MESSAGES"])) {
      try {
        let guildMemeber = message.mentions.members.first();
        var game = guildMemeber.presence.activities;
        if (game.toString() == "") {
          message.channel.send(`${guildMemeber} is not playing`);
        } else {
          message.channel.send(`${guildMemeber} is playing ${game.toString()}`);
        }
      } catch (err) {}
    }
  }
});
client.login(process.env.token);

const discord = require("discord.js");
const client = new discord.Client();
const { prefix, token, giphyToken } = require("./config.json");

var GphApiClient = require("giphy-js-sdk-core");
giphy = GphApiClient(giphyToken);

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
          })
          .catch(() => {
            message.channel.send("Error!!!");
          });
      });
    }
  }
});

client.login(token);

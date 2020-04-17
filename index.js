const discord = require("discord.js");
const client = new discord.Client();
const { prefix, token, giphyToken } = require("./config.json");

var GphApiClient = require("giphy-js-sdk-core");
giphy = GphApiClient(giphyToken);

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", (message) => {
  //KICK MEMBERS
  if (message.member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"])) {
    if (message.content.startsWith(`${prefix}kick`)) {
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
  if (message.member.hasPermission(["SEND_MESSAGES"])) {
    if (message.content.startsWith(`${prefix}gif`)) {
      //let member = message.mentions.members.first();
      var actualgif = message.content.split("gif").pop();
      actualgif = actualgif.replace(/\s/g, "");
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
});
client.login(token);

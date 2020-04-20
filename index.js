const discord = require("discord.js");
const client = new discord.Client();
const { prefix, token, giphyToken } = require("./config.json");

var GphApiClient = require("giphy-js-sdk-core");
giphy = GphApiClient(giphyToken);

client.once("ready", () => {
  console.log("Bot running successfully!");
});

client.on("message", (message) => {
  //KICK MEMBERS
  if (message.content.startsWith(`${prefix}kick`)) {
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
  if (message.content.startsWith(`${prefix}gif`)) {
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
  if (message.content.startsWith(`${prefix}dm`)) {
    if (message.member.hasPermission(["SEND_MESSAGES"])) {
      try {
        let guildMemeber = message.mentions.members.first();
        messageString = message.content.split(guildMemeber.id).pop();
        guildMemeber.send(`${message.member.user} says ` + messageString);
        message.delete();
      } catch (err) {}
    }
  }
  if (message.content.startsWith(`${prefix}spotify`)) {
    if (message.member.hasPermission(["SEND_MESSAGES"])) {
      let user = message.mentions.users.first() || message.author;
      if (
        user.presence.game !== null &&
        user.presence.game.type === 2 &&
        user.presence.game.name == "Spotify" &&
        user.presence.game.assets !== null
      ) {
        let trackIMG = `https://i.scdn.co/image/${user.presence.game.assets.largeImage.slice(
          8
        )}`;
        let trackURL = `https://open.spotify.com/track/${user.presence.game.syncID}`;
        let trackAuthor = user.presence.game.details;
        let trackAlbum = user.presence.game.assets.largeText;
        const embed = new discord.MessageEmbed()
          .setAuthor(
            "Spotify track info",
            "https://cdn.discordapp.com/emojis/408668371039682560.png"
          )
          .setColor(0x1ed760)
          .setThumbnail(trackIMG)
          .addField("Song Name", trackName, true)
          .addField("Album", trackAlbum, true)
          .addField("Author", trackAuthor, false)
          .addField(
            "listening to track:",
            `[\`${trackURL}\`](trackURL)`,
            false
          );

        message.channel.send(embed);
      } else {
        message.channel.send("This user is not listening to spotify!");
      }
    }
  }
});

client.login(token);

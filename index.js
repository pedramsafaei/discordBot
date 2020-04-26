const discord = require("discord.js");
const client = new discord.Client();
const fetch = require("node-fetch");
const querystring = require("querystring");

require("dotenv").config();

var GphApiClient = require("giphy-js-sdk-core");
giphy = GphApiClient(process.env.giphyToken);

client.once("ready", () => {
  console.log("Bot running successfully!");
});

client.on("guildMemberAdd", (member) => {
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === "member-log"
  );
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}`);
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
  //SHOW WHAT GAME THEY ARE PLAYING
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
  //Re-education camp (user request!)
  if (message.content.startsWith(`${process.env.prefix}re-education`)) {
    if (message.member.hasPermission(["SEND_MESSAGES"])) {
      try {
        message.channel.send("https://www.youtube.com/watch?v=U06jlgpMtQs");
      } catch (err) {}
    }
  }
  //SHOW USERS AVATAR
  if (message.content.startsWith(`${process.env.prefix}avatar`)) {
    if (message.member.hasPermission(["SEND_MESSAGES"])) {
      let user = message.mentions.users.first() || message.author;
      message.channel.send(
        `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp`
      );
    }
  }
  //SHOW The Finger!
  if (message.content.startsWith(`${process.env.prefix}avatar`)) {
    if (message.member.hasPermission(["SEND_MESSAGES"])) {
      const attachment = new MessageAttachment(
        "https://i.imgur.com/biT8Si9.jpg"
      );
      message.channel.send(attachment);
    }
  }
  async function search(query) {
    const { list } = await fetch(
      `https://api.urbandictionary.com/v0/define?term=${query}`
    ).then((response) => response.json());
    message.channel.send(list[0].definition);
  }
  //SEARCH ON URBAN DISCTIONARY
  if (message.content.startsWith(`${process.env.prefix}urban`)) {
    if (message.member.hasPermission(["SEND_MESSAGES"])) {
      const query = message.content.split("urban ").pop();
      search(query);
    }
  }
});

client.login(process.env.token);

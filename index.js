const { Client } = require("discord.js");
const USER = "<@903022775017562202>";
const CHANNEL_ID = "870686856998715432";

const PREFIX = "!!";

const phrases = [
  "tu viens {PSEUDO} ??",
  "j'attend là {PSEUDO}",
  "t'es là {PSEUDO} ??",
  "tu vocal quuuaaand ? {PSEUDO}",
  "tu sais je vais relancer la commande hein... {PSEUDO}",
  "Bon tu viens phasmo ? {PSEUDO}",
  "N'oubliez pas de vous abonner :french_bread:",
];

const client = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES"],
});

client.on("ready", () => {
  client.user.setPresence({
    activities: [
      {
        name: "attendre de pouvoir spam Aaron",
      },
    ],
    status: "dnd",
  });

  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  if (message.member.id !== client.user.id) {
    const args = message.content.slice(PREFIX.length).split(/ +/);
    if (args[0] === "spam" && Number(args[1])) {
      client.user.setPresence({
        activities: [
          {
            name: "spam Aaron ptdr",
          },
        ],
        status: "online",
      });
      message.reply("Ok, je commance à spammer Aaron :smirk: ");
      let count = 0;
      const channel = message.guild.channels.cache.get(CHANNEL_ID);

      let machine = setInterval(() => {
        if (count >= Number(args[1])) {
          channel.send("> T'as gagné... JE RIGOLE MDR 1/5 que ça recommence: ");

          if (Math.floor(Math.random() * 3) === 1) {
            channel.send(
              "https://tenor.com/view/push-to-start-gucci-mane-before-the-deal-song-start-it-up-turn-it-on-gif-23512192"
            );
            channel.send("on recommence !!!! :partying_face: ");
            count = 0;
          } else {
            channel.send(
              "https://tenor.com/view/que-triste-gato-triste-renatosx-so-sad-gif-16209105"
            );
            channel.send("> ok je me tire... :pensive:");
            client.user.setPresence({
              activities: [
                {
                  name: "attendre de pouvoir spam Aaron",
                },
              ],
              status: "dnd",
            });
            clearInterval(machine);
            return;
          }
        }
        // prendre un nombre au hasard dans le tableau phrases et remplacer {PSEUDO} par le pseudo du membre
        channel.send(
          phrases[Math.floor(Math.random() * phrases.length)].replace(
            "{PSEUDO}",
            USER
          )
        );
        count++;
      }, 1000);
    } else if (args[0] === "phasmo") {
      const maps = [
        "Bleasdale Farmhouse",
        "Grafton Farmhouse",
        "Ridgeview Road House",
        "Edgefield Street House",
        "Tanglewood Street House",
        "Willow Street House",
        "Maple Lodge Campsite",
        "Prison",
      ];

      // const channel = message.guild.channels.cache.get("894338870949347328");
      message.reply(
        `map: ${maps[Math.floor(Math.random() * maps.length)]} :ghost:`
      );
    }
  }
});

client.login("OTI3NjU4MzUyMDIzMDYwNTYx.YdNbKg.mWJvjnmAu4Kwxxr2JVI6FY8q-mU");

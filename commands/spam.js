const { SlashCommandBuilder } = require("@discordjs/builders");
const { spam } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("spam")
    .setDescription("Spam facilement Aaron :^)")
    .addNumberOption((option) =>
      option
        .setName("nombre")
        .setDescription("le nombre de msg")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    client.user.setPresence({
      activities: [
        {
          name: "spam Aaron ptdr",
        },
      ],
      status: "online",
    });
    await interaction.reply("Ok, je commance à spammer Aaron :smirk: ");

    let count = 0;
    const channel = await interaction.guild.channels.cache.get(spam.channel);

    let machine = setInterval(() => {
      if (count >= interaction.options._hoistedOptions[0].value) {
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

      channel.send(
        spam.phrases[Math.floor(Math.random() * spam.phrases.length)].replace(
          "{PSEUDO}",
          spam.user
        )
      );
      count++;
    }, 1000);
    // await interaction.reply("Pong!");
  },
};

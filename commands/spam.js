const { SlashCommandBuilder } = require("@discordjs/builders");
const { spam } = require("../config.json");
const { User } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("spam")
    .setDescription("Spam facilement Aaron :^)")
    .addUserOption((option) =>
      option
        .setName("joueur")
        .setDescription("le joueur à ping")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("nombre")
        .setDescription("le nombre de msg")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const userId = interaction.user.id;
    const serverId = interaction.guildId;

    const [user, created] = await User.findOrCreate({
      where: { [Op.or]: [{ userId }] },
      defaults: {
        userId,
        serverId,
        count: 1,
      },
    });
    if (!created) {
      const userUpdate = await User.update(
        {
          count: Number(user.count) + 1,
        },
        {
          where: {
            id: user.id,
          },
        }
      );
      console.log("user updated -> ", userUpdate.count);
    } else {
      console.log("user created -> ", user.count);
    }

    client.user.setPresence({
      activities: [
        {
          name: "spam ptdr",
        },
      ],
      status: "online",
    });

    let valueCount = interaction.options._hoistedOptions[1].value;
    const channel = await interaction.guild.channels.cache.get(
      interaction.channelId
    );

    if (valueCount > 50) {
      valueCount = 50;
      channel.send(
        "> Mdrrr t'es dans l'abus. Je vais spam 50 fois, pas plus bg :kissing_closed_eyes: "
      );
    }
    await interaction.reply(
      `Ok, je commence à spammer <@${interaction.options._hoistedOptions[0].value}> :smirk:`
    );

    let count = 0;

    let machine = setInterval(() => {
      if (count >= interaction.options._hoistedOptions[1].value) {
        channel.send("> T'as gag... JE RIGOLE MDR 1/5 que ça recommence: ");

        if (Math.floor(Math.random() * 5) === 1) {
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
                name: "attendre d'être cancer",
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
          `<@${interaction.options._hoistedOptions[0].value}>`
        )
      );
      count++;
    }, 1000);
    // await interaction.reply("Pong!");
  },
};

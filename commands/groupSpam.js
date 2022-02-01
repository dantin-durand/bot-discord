const { SlashCommandBuilder } = require("@discordjs/builders");
const { Group } = require("../models");
const { spam } = require("../config.json");
const { Op } = require("sequelize");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("group-spam")
    .setDescription("Le groupe à spam")
    .addStringOption((option) =>
      option.setName("groupe").setDescription("nom du groupe").setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("nombre")
        .setDescription("le nombre de msg")
        .setRequired(true)
    ),
  async execute(interaction) {
    const groupName = interaction.options._hoistedOptions[0].value;
    const spamNumber = interaction.options._hoistedOptions[1].value;
    const userId = interaction.user.id;

    // récupérer tout les groupes de l'utilisateur
    const groups = await Group.findAll({
      where: {
        name: groupName,
      },
    });
    if (groups.length === 0) {
      await interaction.reply(`Le groupe **${groupName}** existe pas connard.`);
      return;
    }
    const group = groups[0];
    console.log(group.userId, userId);
    if (group.userId != userId) {
      await interaction.reply(
        `Ok c'est fa... MDR mais MDRRRR non en fait non c'est pas ton groupe dylan c:`
      );
      return;
    }

    let groupList = JSON.parse(group.list);
    if (groupList.length) {
      const channel = await interaction.guild.channels.cache.get(spam.channel);

      await interaction.reply(
        `Ok, je commence à spammer le groupe **${groupName}** :smirk:`
      );

      let count = 0;

      let machine = setInterval(() => {
        if (count >= spamNumber) {
          channel.send("> ok je me tire... :pensive:");
          clearInterval(machine);
          return;
        }
        groupList.map((user) => {
          channel.send(
            spam.phrases[
              Math.floor(Math.random() * spam.phrases.length)
            ].replace("{PSEUDO}", `<@${user}>`)
          );
        });

        count++;
      }, 1000);
    }
    return;
  },
};

const { SlashCommandBuilder } = require("@discordjs/builders");
const { Group } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("group-add")
    .setDescription("Ajouter des membres d'un groupe")
    .addStringOption((option) =>
      option.setName("groupe").setDescription("nom du groupe").setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("joueur")
        .setDescription("le membre à ajouter")
        .setRequired(true)
    ),
  async execute(interaction) {
    const groupName = interaction.options._hoistedOptions[0].value;
    const userAdded = interaction.options._hoistedOptions[1].value;
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
    if (groupList.includes(userAdded)) {
      await interaction.reply(
        `<@${userAdded}> est déjà dans le groupe **${groupName}**`
      );
      return;
    } else {
      const groupUpdated = await Group.update(
        {
          list: JSON.stringify([...groupList, userAdded]),
        },
        {
          where: {
            name: groupName,
          },
        }
      );
      await interaction.reply(
        `<@${userAdded}> a été kidnappé. Direction le groupe **${groupName}** :detective:`
      );
    }
    return;
  },
};

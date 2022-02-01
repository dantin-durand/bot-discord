const { SlashCommandBuilder } = require("@discordjs/builders");
const { Group } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("group-kick")
    .setDescription("Virer des membres d'un groupe")
    .addStringOption((option) =>
      option.setName("groupe").setDescription("nom du groupe").setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("joueur")
        .setDescription("le membre à virer")
        .setRequired(true)
    ),
  async execute(interaction) {
    const groupName = interaction.options._hoistedOptions[0].value;
    const userKicked = interaction.options._hoistedOptions[1].value;
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

    if (groupList.includes(userKicked)) {
      const index = groupList.indexOf(userKicked);
      groupList.splice(index, 1);
      const groupUpdated = await Group.update(
        {
          list: JSON.stringify(groupList),
        },
        {
          where: {
            name: groupName,
          },
        }
      );
      await interaction.reply(
        `<@${userKicked}> a bien été viré comme une merde du groupe **${groupName}**`
      );
      return;
    } else {
      await interaction.reply(
        `<@${userKicked}> est pas dans le groupe **${groupName}** frere`
      );
    }
    return;
  },
};

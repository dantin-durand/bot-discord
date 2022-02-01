const { SlashCommandBuilder } = require("@discordjs/builders");
const { Group } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("group-create")
    .setDescription("Créer un groupe")
    .addStringOption((option) =>
      option.setName("nom").setDescription("nom du groupe").setRequired(true)
    ),
  async execute(interaction) {
    const groupName = interaction.options._hoistedOptions[0].value;
    const userId = interaction.user.id;

    const [group, created] = await Group.findOrCreate({
      where: { [Op.or]: [{ name: groupName }] },
      defaults: {
        userId,
        name: groupName,
        list: JSON.stringify([]),
      },
    });

    if (!created) {
      await interaction.reply(`Le groupe ${groupName} existe déjà :c`);
    } else {
      await interaction.reply(`Le groupe ${groupName} a été créé :D`);
    }
    return;
  },
};

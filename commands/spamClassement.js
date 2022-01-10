const { SlashCommandBuilder } = require("@discordjs/builders");
const { User } = require("../models");
const { Op } = require("sequelize");
const { getLevel } = require("../helpers/getLevel");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("spam-classement")
    .setDescription("Obtiens la crème de la crème des  cancers"),

  async execute(interaction) {
    // récuprer les 3 plus gros count de User``
    const serverId = interaction.guildId;

    const users = await User.findAll({
      order: [["count", "DESC"]],
      limit: 3,
    });

    await interaction.reply(
      `**Classement:** \n\n:trophy: ${
        users[0]
          ? `<@${users[0].userId}> - **${users[0].count} fois**`
          : "Personne"
      } \n\n:second_place: ${
        users[1]
          ? `<@${users[1].userId}> - **${users[1].count} fois**`
          : "Personne"
      } \n\n:third_place: ${
        users[2]
          ? `<@${users[2].userId}> - **${users[2].count} fois**`
          : "Personne"
      }`
    );
  },
};

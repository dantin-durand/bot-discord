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

    const usersList = await User.findAll();

    const users = usersList.sort(function (a, b) {
      return -(a.count - b.count);
    });
    console.log("users", users);
    await interaction.reply(
      `**Classement:** \n\n:trophy: ${
        users[0]
          ? `<@${users[0].userId}> : **${users[0].count} fois** - ${getLevel(
              users[0].count
            )}`
          : "Personne"
      } \n\n:second_place: ${
        users[1]
          ? `<@${users[1].userId}> : **${users[1].count} fois** - ${getLevel(
              users[1].count
            )}`
          : "Personne"
      } \n\n:third_place: ${
        users[2]
          ? `<@${users[2].userId}> : **${users[2].count} fois** - ${getLevel(
              users[2].count
            )}`
          : "Personne"
      }`
    );
  },
};

const { SlashCommandBuilder } = require("@discordjs/builders");
const { User } = require("../models");
const { Op } = require("sequelize");
const { getLevel } = require("../helpers/getLevel");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("spam-info")
    .setDescription("Obtiens ton nombre de spam")
    .addUserOption((option) =>
      option
        .setName("joueur")
        .setDescription("le joueur que tu cherches")
        .setRequired(false)
    ),
  async execute(interaction) {
    console.log("options -> ", interaction.options);
    let userId = "";
    if (interaction.options._hoistedOptions.length) {
      userId = interaction.options._hoistedOptions[0].value;
    } else {
      userId = interaction.user.id;
    }

    const usersList = await User.findAll();

    const users = usersList.sort(function (a, b) {
      return -(a.count - b.count);
    });

    let userIndex = users.findIndex((user) => user.userId === userId);
    const serverId = interaction.guildId;

    const [user, created] = await User.findOrCreate({
      where: { [Op.or]: [{ userId }] },
      defaults: {
        userId,
        serverId,
        count: 0,
      },
    });
    if (!user) {
      await interaction.reply("Aucun utilisateur trouvé");
      return;
    }
    if (interaction.options._hoistedOptions.length) {
      await interaction.reply(
        `<@${userId}> a spam **${user.count} fois**, il est ${getLevel(
          user.count
        )}\nClassement: **${userIndex + 1}/${users.length + 1}**`
      );
    } else {
      await interaction.reply(
        `Tu as spam **${user.count} fois**, tu es ${getLevel(
          user.count
        )}\nClassement: **${userIndex + 1}/${users.length + 1}**`
      );
    }
  },
};

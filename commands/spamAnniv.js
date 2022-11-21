const { SlashCommandBuilder } = require("@discordjs/builders");
const { spam } = require("../config.json");
const { User } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("spam-anniv")
    .setDescription("Spam pour l'anniv :^)")
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
          name: "souhaiter un anniv mdr",
        },
      ],
      status: "online",
    });

    let valueCount = interaction.options._hoistedOptions[1].value;
    const channel = await interaction.guild.channels.cache.get(
      interaction.channelId
    );

    await interaction.reply(
      `Ok, je commence à spa.. Heu oui, juste souhaiter un joyeux anniv à <@${interaction.options._hoistedOptions[0].value}> :smirk:`
    );

    let count = 0;

    let machine = setInterval(() => {
      if (count >= interaction.options._hoistedOptions[1].value) {
        clearInterval(machine);
        return;
      }

      channel.send(
        spam.anniv[Math.floor(Math.random() * spam.anniv.length)].replace(
          "{PSEUDO}",
          `<@${interaction.options._hoistedOptions[0].value}>`
        )
      );
      count++;
    }, 1000);
    // await interaction.reply("Pong!");
  },
};

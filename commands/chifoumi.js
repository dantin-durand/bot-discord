const { SlashCommandBuilder } = require("@discordjs/builders");
const { spam } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("spam-chifoumi")
    .setDescription("Faire un chifoumi avec... un bot cancer"),
  async execute(interaction) {
    const message = await interaction.reply({
      content: `Ok, je vais faire un chifoumi avec toi <@${interaction.user.id}>`,
      fetchReply: true,
    });
    message.react("✋");
    message.react("✌️");
    message.react("✊");
  },
};

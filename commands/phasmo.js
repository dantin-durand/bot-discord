const { SlashCommandBuilder } = require("@discordjs/builders");
const { phasmo } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("phasmo")
    .setDescription("Choisi une map de phasmo"),
  async execute(interaction) {
    await interaction.reply(
      `map: ${phasmo[Math.floor(Math.random() * phasmo.length)]} :ghost:`
    );
  },
};

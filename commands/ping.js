const { SlashCommandBuilder } = require("@discordjs/builders");
const { phasmo } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("ping"),
  async execute(interaction) {
    await interaction.reply("pong");
  },
};
// 390201635214721025

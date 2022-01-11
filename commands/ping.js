const { SlashCommandBuilder } = require("@discordjs/builders");
const { phasmo } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder().setName("spam-ping").setDescription("ping"),
  async execute(interaction) {
    await interaction.reply("pong");
  },
};

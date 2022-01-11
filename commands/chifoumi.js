const { SlashCommandBuilder } = require("@discordjs/builders");
const { spam } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("spam-chifoumi")
    .setDescription("Faire un chifoumi avec... un bot cancer"),
  async execute(interaction) {
    // const channel = await interaction.guild.channels.cache.get(spam.channel);
    // channel
    //   .send("Ok, je vais faire un chifoumi avec <@" + interaction.user.id + ">")
    //   .then(function (message) {
    //     message.react("✋");
    //     message.react("✌️");
    //     message.react("✊");
    //     message.pin();
    //     message.delete();
    //   })
    //   .catch(function () {
    //     //Something
    //   });
    const message = await interaction.reply({
      content: `Ok, je vais faire un chifoumi avec toi <@${interaction.user.id}>`,
      fetchReply: true,
    });
    message.react("✋");
    message.react("✌️");
    message.react("✊");
  },
};

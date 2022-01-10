const { Client, Intents } = require("discord.js");
const { token, spam } = require("./config.json");
const deployCommand = require("./deploy-commands");

deployCommand.execute;

const { User } = require("./models");
const { Op } = require("sequelize");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on("ready", async () => {
  client.user.setPresence({
    activities: [
      {
        name: "attendre d'être cancer",
      },
    ],
    status: "online",
  });

  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "spam") {
    const cmd = require("./commands/spam");
    await cmd.execute(interaction, client);
  } else if (interaction.commandName === "phasmo") {
    const cmd = require("./commands/phasmo");
    await cmd.execute(interaction);
  } else if (interaction.commandName === "ping") {
    const cmd = require("./commands/ping");
    await cmd.execute(interaction);
  } else if (interaction.commandName === "spam-info") {
    const cmd = require("./commands/spamInfo");
    await cmd.execute(interaction);
  } else if (interaction.commandName === "spam-classement") {
    const cmd = require("./commands/spamClassement");
    await cmd.execute(interaction);
  }
});

client.login(token);

require("dotenv").config();
const { DISCORD_TOKEN } = process.env;
const { Client, Intents } = require("discord.js");
const { spam } = require("./config.json");
const deployCommand = require("./deploy-commands");

deployCommand.execute;

const { User } = require("./models");
const { Op } = require("sequelize");
const { chifoumiResponse } = require("./reactions/chifoumi");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

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
  } else if (interaction.commandName === "spam-anniv") {
    const cmd = require("./commands/spamAnniv");
    await cmd.execute(interaction, client);
  } else if (interaction.commandName === "spam-phasmo") {
    const cmd = require("./commands/phasmo");
    await cmd.execute(interaction);
  } else if (interaction.commandName === "spam-ping") {
    const cmd = require("./commands/ping");
    await cmd.execute(interaction);
  } else if (interaction.commandName === "spam-info") {
    const cmd = require("./commands/spamInfo");
    await cmd.execute(interaction);
  } else if (interaction.commandName === "spam-classement") {
    const cmd = require("./commands/spamClassement");
    await cmd.execute(interaction);
  } else if (interaction.commandName === "spam-chifoumi") {
    const cmd = require("./commands/chifoumi");
    await cmd.execute(interaction);
  } else if (interaction.commandName === "group-create") {
    const cmd = require("./commands/groupCreate");
    await cmd.execute(interaction);
  } else if (interaction.commandName === "group-add") {
    const cmd = require("./commands/groupAdd");
    await cmd.execute(interaction);
  } else if (interaction.commandName === "group-kick") {
    const cmd = require("./commands/groupKick");
    await cmd.execute(interaction);
  } else if (interaction.commandName === "group-spam") {
    const cmd = require("./commands/groupSpam");
    await cmd.execute(interaction);
  }
});

client.on("messageReactionAdd", async (reaction, user) => {
  await chifoumiResponse(reaction, user, client);
});

client.login(DISCORD_TOKEN);

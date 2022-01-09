const { Client, Intents } = require("discord.js");
const { token, phasmo } = require("./config.json");
const deployCommand = require("./deploy-commands");
deployCommand.execute;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on("ready", () => {
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
  }
});

client.login(token);

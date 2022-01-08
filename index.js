const { Client, Intents } = require("discord.js");
const { token, phasmo } = require("./config.json");
const deployCommand = require("./deploy-commands");
deployCommand.execute;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on("ready", () => {
  client.user.setPresence({
    activities: [
      {
        name: "attendre de pouvoir spam Aaron",
      },
    ],
    status: "dnd",
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
  }
});

client.login(token);

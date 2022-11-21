require("dotenv").config();
const { DISCORD_TOKEN } = process.env;
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId } = require("./config.json");
const fs = require("fs");

const commands = [];
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(DISCORD_TOKEN);

exports.execute = (async (bot) => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(clientId), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

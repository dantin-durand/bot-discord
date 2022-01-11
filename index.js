const { Client, Intents } = require("discord.js");
const { token, spam } = require("./config.json");
const deployCommand = require("./deploy-commands");

deployCommand.execute;

const { User } = require("./models");
const { Op } = require("sequelize");

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
  }
});

client.on("messageReactionAdd", async (reaction, user) => {
  if (
    reaction.message.channel.id === spam.channel &&
    reaction.message.author.id !== user.id
  ) {
    if (
      reaction.message.content.includes(
        "Ok, je vais faire un chifoumi avec toi <@"
      )
    ) {
      const userInMessage = reaction.message.content
        .split("<@")[1]
        .replace(">", "");

      const channel = await client.channels.cache.get(spam.channel);

      const reactionsBot = ["✋", "✌️", "✊"];

      const reactionChoice =
        reactionsBot[Math.floor(Math.random() * reactionsBot.length)];

      if (reaction.emoji.name === "✌️" && reactionChoice === "✋") {
        await channel.send(`**j'ai choisis ✋**, donc <@${user.id}> a gagné`);
      } else if (reaction.emoji.name === "✊" && reactionChoice === "✌️") {
        await channel.send(`**j'ai choisis ✌️**, donc <@${user.id}> a gagné`);
      } else if (reaction.emoji.name === "✋" && reactionChoice === "✊") {
        await channel.send(`**j'ai choisis ✊**, donc <@${user.id}> a gagné`);
      } else if (reaction.emoji.name === reactionChoice) {
        await channel.send(
          `**j'ai choisis ${reactionChoice}**, mon créateur avait la flemme de faire un "rejouer" donc j'ai gagné <@${user.id}>`
        );
      } else {
        await channel.send(
          `**j'ai choisis ${reactionChoice}**, donc <@${user.id}> a perdu comme une merde`
        );
      }
    }
  }
});

client.login(token);

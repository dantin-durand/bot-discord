const chifoumiResponse = async function (reaction, user, client) {
  if (
    reaction.message.channel.id === reaction.message.channelId &&
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

      const channel = await client.channels.cache.get(
        reaction.message.channelId
      );

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
};

module.exports = { chifoumiResponse };

import * as dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import { Client, Events, GatewayIntentBits, Partials } from "discord.js";
import { createTweet, deleteTweet, replyTweet } from "./Twitter.mjs";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const settings = JSON.parse(fs.readFileSync("./settings.json", "utf-8"));

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.username}`);
});

client.on(Events.MessageReactionAdd, async (reaction, user) => {
  try {
    if (reaction.message.channelId !== settings.channelId) return;
    if (reaction.emoji.name !== settings.emojiName) return;
    await reaction.fetch();
    if (reaction.count !== settings.numberOfReactionsRequired) return;

    const tweets = JSON.parse(
      fs.readFileSync(settings.tweetsFilePath, "utf-8")
    );

    let tweetId;
    if (reaction.message.reference === null) {
      tweetId = await createTweet(reaction.message.cleanContent);
    } else {
      const refTweetId = tweets[reaction.message.reference.messageId];
      if (refTweetId !== undefined) {
        tweetId = await replyTweet(reaction.message.cleanContent, refTweetId);
      }
    }

    tweets[reaction.message.id] = tweetId;
    fs.writeFileSync(settings.tweetsFilePath, JSON.stringify(tweets, null, 2));
    reaction.message.react("☑️");
    await reaction.message.reply(
      `### ツイートしました\n${settings.baseTwitterUrl}${tweetId}\n承認者:<@${user.id}>`
    );
  } catch (error) {
    try {
      await reaction.message.reply(
        `### ツイートに失敗しました\n${error.message}`
      );
    } catch (e) {
      console.error(e.message);
    }
  }
});

client.on(Events.MessageDelete, async (message) => {
  try {
    if (message.author === null || message.author.bot === true) return;
    if (message.channelId !== settings.channelId) return;
    const tweets = JSON.parse(
      fs.readFileSync(settings.tweetsFilePath, "utf-8")
    );
    const tweetId = tweets[message.id];
    if (tweetId === undefined) return;

    await deleteTweet(tweetId);
    delete tweets[message.id];
    fs.writeFileSync(settings.tweetsFilePath, JSON.stringify(tweets, null, 2));
    await message.channel.send(
      `### ツイートを削除しました\n${settings.baseTwitterUrl}${tweetId}`
    );
  } catch (error) {
    try {
      await message.channel.send(
        `### ツイートの削除に失敗しました\n${error.message}\n削除対象: ${settings.baseTwitterUrl}${tweetId}`
      );
    } catch (e) {
      console.error(e.message);
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);

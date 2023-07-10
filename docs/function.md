## 機能について
### index.mjs
Discord botの機能が記述されています。

#### Discordクラアントの作成
```js
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});
```

#### 投稿機能
```js
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

// ツイートの返信元を調べ、nullだった場合に新規ツイートを作成する
    if (reaction.message.reference === null) {
      tweetId = await createTweet(reaction.message.cleanContent);
    } else {
// 返信元がある場合、ツイートのログからidを取得しリプライ(ツリー形式)で投稿
      const refTweetId = tweets[reaction.message.reference.messageId];
      if (refTweetId !== undefined) {
        tweetId = await replyTweet(reaction.message.cleanContent, refTweetId);
      }
    }

// discordのメッセージidとツイートidを紐づけてログファイルを上書きする
    tweets[reaction.message.id] = tweetId;
    fs.writeFileSync(settings.tweetsFilePath, JSON.stringify(tweets, null, 2));

// 投稿が完了すると専用のリアクションを作成
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
```

### Twitter.mjs
ツイートを行うための機能が記述されています。
Twitter APIを利用して投稿されます。

#### 投稿機能
https://github.com/wagumi/tweet-bot/blob/f237604c538b4050d974a7be1893bc2008788f51/Twitter.mjs#L13-L22

#### ツリー投稿機能
https://github.com/wagumi/tweet-bot/blob/f237604c538b4050d974a7be1893bc2008788f51/Twitter.mjs#L35-L44

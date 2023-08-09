# Tweet bot

## Description

Discord bot to send and remove tweets for your team/project Twitter account from a channel only accessible to its members (e.g. moderators). By installing this bot in your Discord server, you don't have to rely on TweetDeck anymore. The members in the specific channel should be able to do basic operations (tweet, remove and reply) from your Discord server.

## Production deployment

To start the bot for the first time,

```
(after the deployment triggered by the GitHub action, ssh to the production server and move to the directory)
cp tweets.json.sample tweets.json
pm2 start pm2.config.js
```

To restart the bot manually,

```
pm2 restart tweet-bot
```

## setting
```json
{
  "channelId": "1126...6853",
  "emojiName": "✅",
  "numberOfReactionsRequired": 1,
  "tweetsFilePath": "./tweets.json",
  "baseTwitterUrl": "https://twitter.com/xxxx/status/"
}
```
### channelId

Represents a Discord channel for posting to Twitter.

### emojiName

Represents an emoji for posting. If you use the one of emojiName in reaction to a tweet you want to post, it will be posted on Twitter.

### numberOfReactionsRequired

Represents the number of reactions requested to post on Twitter.

### tweetsFilePath

The path to the file where the log of posted tweets will be saved.
*The format must be json.*

### baseTwitterUrl

Represents the url of the user posting the tweet.

**※ Must match the user of the API retrieved.**

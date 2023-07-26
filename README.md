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

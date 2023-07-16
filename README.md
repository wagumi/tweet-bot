# Tweet bot

## Description

Discord bot to send and remove tweets managed in a channel only by members in the channel. By setting this bot up in your Discord servers, you don't have to rely on TweetDeck anymore for managing your team/project's Twitter account but basic operations (tweet, remove and reply) can be done from your Discord server.

## Production deployment for the first time

```
(ssh to the Wagumi production server and move to the directory)
cp tweets.json.sample
pm2 start pm2.config.js
```

To restart the server manually,

```
pm2 restart tweet-bot
```

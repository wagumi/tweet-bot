
## 設定
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
Twitterに投稿するための、Discordチャンネルを表します。
### emojiName
投稿用の絵文字を表します。投稿したいツイートにリアクションでemojiNameのものを使用すると、Twitterに投稿されるようになります。
### numberOfReactionsRequired
Twitterに投稿するために要求されているリアクション数を表します。
### tweetsFilePath
投稿されたツイートのログを保存するファイルのパスを表します。
※形式はjsonである必要があります。
### baseTwitterUrl
ツイートを投稿するユーザーのurlを表します。

**※取得したAPIのユーザーと一致している必要があります。**

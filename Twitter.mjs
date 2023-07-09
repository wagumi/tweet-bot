import * as dotenv from "dotenv";
dotenv.config();

import { TwitterApi } from "twitter-api-v2";

const client = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_KEY_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
});

const createTweet = async (text) => {
  try {
    const result = await client.v2.tweet(text);
    console.log(result);
    return result.data.id;
  } catch (error) {
    console.error(`Tweetに失敗しました\n${error.message}`);
    throw error; 
  }
};

const deleteTweet = async (tweetId) => {
  try {
    const result = await client.v2.deleteTweet(tweetId);
    console.log(result);
    return result.data.deleted;
  } catch (error) {
    console.error(`Tweetの削除に失敗しました\n${error.message}`);
    throw error; 
  }
};

const replyTweet = async (text, refTweetId) => {
  try {
    const result = await client.v2.reply(text, refTweetId);
    console.log(result);
    return result.data.id;
  } catch (error) {
    console.error(`Tweetに失敗しました\n${error.message}`);
    throw error; 
  }
};

export { createTweet, deleteTweet, replyTweet };

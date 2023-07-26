module.exports = {
    apps: [
        {
            name: "tweet-bot",
            script: "./index.mjs",
            watch: true,
            ignore_watch: ["tweets.json"],
            time: true,
        },
    ],
};

## Twitter Bot setting
### API register
- Access below the link
https://developer.twitter.com/en
- To go "Developer Portal"
**Choice "Sign up for Free Account"**
Please include "Describe all of your use cases of Twitter’s data and API:"(Must be 250 characters or longer)


![スクリーンショット 2023-07-10 23 18 01](https://github.com/wagumi/tweet-bot/assets/46296566/f9c83fb3-a1cb-4489-a87e-b89e7739864a)

![スクリーンショット 2023-07-10 23 18 41](https://github.com/wagumi/tweet-bot/assets/46296566/60b8c61b-847b-4fd2-b0b3-c5c7987a6ffc)

### setting permissions
- App permissions
  - Read and write
- Type of App
  - Web App, Automated App or Bot
- Callback URI / Redirect URL
- Website URL

### Regenerate Authentication Tokens

- Check that it says **Created with <ins>Read and Write</ins> permissions**

![スクリーンショット 2023-07-10 23 23 33](https://github.com/wagumi/tweet-bot/assets/46296566/f04cd6fb-f477-4d36-8ff3-9489a23e192a)

### Setting .env

```
API_KEY=
API_KEY_SECRET=
ACCESS_TOKEN=
ACCESS_TOKEN_SECRET=
DISCORD_BOT_TOKEN=
```

### User authentication

1. Access the following link with the user you want to Tweet automatically and authenticate

`https://twitter.com/i/oauth2/authorize?response_type=code&client_id=<Client Id>&redirect_uri=<Redirect Url>&scope=tweet.read%20tweet.write%20&state=abc&code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM&code_challenge_method=s256`


2. **The following information must be entered after checking the settings**
- `<Client_id>`
- `<Redirect_url>`

Then <Authentication_code> is created in the redirect URL

`<Redirect_url>state=abc&code=<Authentication_code>`

3. Execute the following command in curl

```bash
curl --location --request POST 'https://api.twitter.com/2/oauth2/token' \
                  --basic -u '<Client Id>:<Client Secret >' \
                  --header 'Content-Type: application/x-www-form-urlencoded' \
                  --data-urlencode 'code=<Authentication_code>' \
                  --data-urlencode 'grant_type=authorization_code' \
                  --data-urlencode 'client_id=<Client Id>' \
                  --data-urlencode 'redirect_uri=<Redirect Url>' \
                  --data-urlencode 'code_verifier=dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk'
```

⚠️ **Authentication Code must be executed within 30 seconds of creation or it will be revoked**

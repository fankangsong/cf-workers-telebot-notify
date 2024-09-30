# telegram bot notify on CloudFlare Workers

1. add `wrangler.toml` config:

```
[vars]
AUTH_TOKEN = "custom password"
CHAT_ID = "your chat_id"
TELEGRAM_BOT_KEY = "your telegram bot key, like 1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ, without 'bot' string"
```

2. `npm i && npm start` run local server, then access http://local:port?token={custom password}&text={you want to send text to telegram bot}

3. deploy to CloudFlare Workers: `npm run deploy`

# gideon-discord-bot

Here is a Discord bot I made for the 2021 Maple High School Hackathon.
Through this project, I developed skills with
- Node.js
- Discord.js
- Accessing data from APIs

Currently the bot is not public so a few steps need to be taken to run the bot.

1. Invite the bot to a server using this link: https://discord.com/api/oauth2/authorize?client_id=927674710119030814&permissions=8&scope=bot%20applications.commands
2. Enable developer mode in Discord. To do this: settings > advanced > developer mode.
3. Right click on the server's name (top-left of Discord) and click "Copy ID".
4. Open `.env` and replace the numbers after "GUILD_ID = " with the server ID you copied.
    - Alternatively, join my testing server: https://discord.gg/geH2ypJtmg and proceed with steps 5-7
5. Run `deploy-commands.js`.
6. Run `main.js`.
7. Use the /help command in Discord and explore from there!

NOTE: Make sure you have node.js installed. Install the CURRENT version here: https://nodejs.org/en/

Hopefully this is everything you need to run the bot, DM me if anything: J0LT#1432
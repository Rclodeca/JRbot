# JRbot

A Music and Reaction bot for Discord. Built with Node.js and Discord.js.

## Getting Started

Add JRbot to your server [here.](https://discordapp.com/oauth2/authorize?client_id=447869484238110723&scope=bot)

OR

To host the bot yourself:

* Install [Node.js](https://nodejs.org/en/)
* Make a folder and git clone this repository: https://github.com/Rclodeca/JRbot
* Then type "npm install" to get the needed packages for the bot

## Commands

Begin each command with the `/` prefix.

| Command | Description |
| ---- | --- |
| `help` | List all commands with their descirptions |
| `server` | Lists info that JRbot gathers on the current server/guild |
| `say {message}` | JRbot responds in chat with whatever is in the `{}` |
| `purge {N}` | Removes N number of recent messages from the chat. Requires admin permissions |
| `insult {@user}` | JRbot responds in chat with an insult directed at the user in the `{}`. Must `@` the user. Array of insults can be edited and are located in config.json |
| `mute {@user}` | Chat restricts the user in the `{}`. Requires admin permissions |
| `unmute {@user}` | Removes chat restriction from the user in the `{}`. Requires admin permissions |

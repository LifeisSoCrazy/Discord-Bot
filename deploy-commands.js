const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');

const commands = []
// Get command files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(.js));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}
console.log(commands)
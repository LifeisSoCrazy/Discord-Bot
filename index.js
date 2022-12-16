// Require the necessary discord.js classes
// fs gets
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, BaseInteraction, escapeMaskedLink } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

// Gets the command directory's path and its individual js files;
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
console.log(client.commands)
for (const file of commandFiles) {
	// Obtain the individual file
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item into the Collection with the key as the command
	// the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
	}
}

// Event listener to interactions (slash commands are interactions)
console.log(client.commands)
client.on(Events.InteractionCreate, interaction => {
	if (!interaction.isChatInputCommand) return;
	// Get the name of the slash command:
	const command = interaction.client.commands.get(interaction.commandName);
	if (!command) {
		// If command doesn't exist
		console.error(`No command matching ${interaction.commandName} exists.`);
		return;
	}
	try {
		// This will call the property 'execute' of the specific command that was requested
		await command.execute(interaction);
	} catch(error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephermeral: true});
	}

});

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);

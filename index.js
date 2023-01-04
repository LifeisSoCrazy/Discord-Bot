// Require the necessary discord.js classes
require('dotenv').config();

const Sequelize = require('sequelize');
const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const token = process.env.DISCORD_TOKEN;

// Sequelize instance
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

/*
 * equivalent to: CREATE TABLE tags(
 * name VARCHAR(255) UNIQUE,
 * description TEXT,
 * username VARCHAR(255),
 * usage_count  INT NOT NULL DEFAULT 0
 * );
 */
const Tags = sequelize.define('tags', {
	name: {
		type: Sequelize.STRING,
		unique: true,
	},
	description: Sequelize.TEXT,
	username: Sequelize.STRING,
	usage_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
});

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.MessageContent] });
client.commands = new Collection();

// Path for commands
const commandPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));

// Loop for adding command files to client.commands
for (const file of commandFiles) {
	const filePath = path.join(commandPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	// eslint-disable-next-line brace-style
	} else {
		console.log(`${filePath} does not have required "data" or "execute property"`);
	}
}
// Gets the event directory's path and its individual js files for events directory
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	// Get file path of the events
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		// Sync the model
		Tags.sync({ force: true });
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
// Log in to Discord with your client's token
client.login(token);

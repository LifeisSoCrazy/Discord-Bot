const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
module.exports = {
	// Function that replies 'pong!' when called
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply({ content: 'POOONNNGG', ephemeral: true });
		await wait(1000);
		await interaction.followUp({ content: 'AAAAAAAAAAAAAAAAAHHHHHHHHHHHH', ephemeral: true });
	},
};

const { SlashCommandBuilder, ChannelType } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Replies with your input!')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('The input to echo into another channel')
				.setRequired(true))
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('The channel to echo into')
				.setRequired(true)
				.addChannelTypes(ChannelType.GuildText)),
	async execute(interaction) {
		const input = interaction.options.getString('input');
		const Channel = interaction.options.getChannel('channel');
		const ephemeral = interaction.options.getBoolean('ephemeral');
		console.log(ephemeral)
		await Channel.send(input);
	},
};
const { SlashCommandBuilder, BaseGuildTextChannel } = require('discord.js');

// Slash command to bulk delete messages

module.exports = {
  data: new SlashCommandBuilder()
    .setName('del')
    .setDescription('Enter how many messages you would like to delete.')
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('Enter amount')
        .setRequired(true)),
  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');
    await interaction.channel.bulkDelete(amount);
  },
};
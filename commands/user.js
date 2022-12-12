const { SlashCommandBuilder } = require('discord.js');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Provides information about the user.'),
  async execute(interaction) {
    // Takes information from the interaction object to display user details.
    await interaction.reply(`User ${interaction.user.username} joined ${interaction.channelid} on ${interaction.member.joined_at}`);
  },
};

const { Events } = require('discord.js');
const { deleteableWords } = require('./deleteWords');

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    for (const word of deleteableWords) {
      if (message.content.includes(word)) {
        await message.delete();
        console.log('Working!');
        message.channel.send('Please do not use such language!');
      }
    }
  },
};
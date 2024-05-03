const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    console.log(interaction, process.env.CLIENT_TOKEN);
  },
};

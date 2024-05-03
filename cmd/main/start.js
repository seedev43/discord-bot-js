module.exports = {
  name: "start",
  description: "start bot",
  tags: "main",
  run: async ({ client, msg }) => {
    return msg.reply("Hello!");
  },
};

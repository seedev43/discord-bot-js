module.exports = {
  name: "start",
  description: "start bot",
  tags: "main",
  execute: async ({ client, msg }) => {
    return msg.reply("Hello!");
  },
};

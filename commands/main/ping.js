const moment = require("moment-timezone");

const processTime = (timestamp, now) => {
  return moment.duration(now - moment(timestamp)).asSeconds();
};
module.exports = {
  name: "ping",
  aliases: ["pung"],
  description: "ping bot",
  tags: "main",
  execute: async ({ client, msg }) => {
    return msg.reply(`Pong!\n🏎️ ${processTime(msg.date, moment())} seconds`);
  },
};

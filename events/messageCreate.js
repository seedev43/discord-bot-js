const { Events } = require("discord.js");
const serializeMsg = require("../system/serialize");
const message = require("../system/message");

module.exports = {
  name: Events.MessageCreate,
  async execute(msg) {
    const m = await serializeMsg(msg.client, msg);
    await message(msg.client, m);
  },
};

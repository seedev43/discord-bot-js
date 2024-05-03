const { prefixList, owners } = require("../config/config");

async function serializeMsg(client, msg) {
  if (!msg) return;
  //   console.log(msg);
  msg.date = msg.createdTimestamp;
  msg.channelId = msg.channelId;
  msg.guildId = msg.guildId;
  msg.msgId = msg.id;
  msg.text = msg.content;
  msg.userId = msg.author.id;
  msg.username = msg.author.username;
  msg.pushname = msg.author.globalName;
  msg.isBot = msg.author.bot;
  msg.isOwner = owners.includes(msg.userId);

  const regexPrefix = new RegExp("^[" + prefixList + "]", "i");
  const matchPrefix = regexPrefix.test(msg.text)
    ? msg.text.match(regexPrefix)[0]
    : "";

  msg.prefix = matchPrefix;
  msg.query = msg.text.split(" ").slice(1).join(" ");

  return msg;
}

module.exports = serializeMsg;

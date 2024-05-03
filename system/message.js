const chalk = require("chalk");
const { commandExecute } = require("./command");
const moment = require("moment-timezone");

async function message(client, msg) {
  if (msg.isBot) return;
  let log = `${chalk.red("------------------------------")}

${chalk.blueBright("GUILD ID: " + msg.guildId)}
${chalk.blueBright("Channel ID: " + msg.channelId)}
${chalk.blueBright("USER ID: " + msg.userId)}
${chalk.blueBright("PUSHNAME: " + msg.pushname)}
${chalk.blueBright("MESSAGE ID: " + msg.msgId)}
${chalk.blueBright("MESSAGE:\n" + msg.text)}
${chalk.yellow("SENDING AT: " + moment(msg.date).format("DD-MM-YYYY HH:mm:ss"))}
${chalk.red("------------------------------")}
`;
  console.log(log);
  commandExecute(client, msg);
}

module.exports = message;

const chalk = require("chalk");
const { commandExecute } = require("./command");
const moment = require("moment-timezone");

async function message(client, msg) {
  //   console.log(msg);
  let ok = new Date(msg.date * 1000);
  let log = `${chalk.red("------------------------------")}

${chalk.blueBright("ID: " + msg.id)}
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

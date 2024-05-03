const path = require("path");
const fs = require("fs");
const helpers = require("../helpers/helpers");
let commands = new Map();

function commandExecute(client, msg) {
  const dir = path.join(__dirname, "..", "cmd");
  const dirs = fs.readdirSync(dir);

  // Clear the existing commands map before reloading
  commands.clear();

  dirs
    .filter((a) => a !== "function")
    .map(async (res) => {
      let files = fs
        .readdirSync(`${dir}/${res}`)
        .filter((file) => file.endsWith(".js"));
      for (const file of files) {
        const cmd = require(`../cmd/${res}/${file}`);
        commands.set(cmd.name, cmd);
      }
    });

  const cmd = msg.text
    .slice(msg.prefix.length)
    .trim()
    .split(/ +/)
    .shift()
    .toLowerCase();

  const command =
    commands.get(cmd) ||
    (() => {
      let foundCommand = null;
      commands.forEach((val) => {
        if (val.aliases && val.aliases.includes(cmd)) {
          foundCommand = val;
        }
      });
      return foundCommand;
    })();

  if (command && !msg.isBot) {
    if (command.noPrefix) {
      command.noPrefix = true;
    } else {
      command.noPrefix = false;
    }

    if (
      (command.noPrefix && msg.prefix === "") ||
      (!command.noPrefix &&
        msg.prefix !== "" &&
        msg.text.startsWith(msg.prefix))
    ) {
      if (command.isOwner && !msg.isOwner) {
        return msg.reply(helpers.notOwner);
      }

      if (command.isGroup && !msg.isGroup) {
        return msg.reply(helpers.notGroup);
      }

      if (command.isBotAdmin && !msg.isBotAdmin) {
        return msg.reply(helpers.botNotAdmin);
      }

      if (command.isAdmin && !msg.isAdmin) {
        return msg.reply(helpers.notAdmin);
      }

      command
        .run({ client, msg })
        .then((a) => a)
        .catch((err) => console.log(err));
    }
  }
}

module.exports = { commands, commandExecute };

const helpers = require("../helpers/helpers");

function commandExecute(client, msg) {
  const cmd = msg.text
    .slice(msg.prefix.length)
    .trim()
    .split(/ +/)
    .shift()
    .toLowerCase();

  const command =
    client.commands.get(cmd) ||
    (() => {
      let foundCommand = null;
      client.commands.forEach((val) => {
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
        .execute({ client, msg })
        .then((a) => a)
        .catch((err) => console.log(err));
    }
  }
}

module.exports = { commandExecute };

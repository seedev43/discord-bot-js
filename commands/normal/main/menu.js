module.exports = {
  name: "menu",
  aliases: ["menu"],
  tags: "main",
  execute: async ({ client, msg }) => {
    let tags = Array.from(client.commands.values());
    let list = {};
    let text = `Hi ${msg.pushname}\n\n`;

    tags.forEach((value) => {
      if (!value?.tags) return;
      if (!(value?.tags in list)) {
        list[value.tags] = [];
      }
      list[value.tags].push(value);
    });

    Object.entries(list).map(([tag, cmd]) => {
      text += `「 ${tag.toUpperCase()} MENU 」\n`;
      text +=
        cmd
          .map(
            (val) =>
              `✦ ${val.noPrefix ? val.name : msg.prefix + val.name} ${
                val.description ? `(${val.description})` : ""
              }`
          )
          .join("\n") + "\n";
      text += "\n";
    });
    text += "© SeeDev Bot 2023";
    msg.reply(text);
  },
};

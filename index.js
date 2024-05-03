// Initialize dotenv
require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const serializeMsg = require("./system/serialize");
const message = require("./system/message");

async function startBot() {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  const prefix = "!";

  client.on("ready", () => {
    console.log("BOT STARTED!");
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on("messageCreate", async (msg) => {
    const m = await serializeMsg(client, msg);
    await message(client, m);
  });

  client.login(process.env.CLIENT_TOKEN);
}

startBot();

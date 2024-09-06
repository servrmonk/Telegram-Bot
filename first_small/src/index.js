const TelegramBot = require("node-telegram-bot-api");
// check npm node-telegram-bot-api
require("dotenv").config();

const token = process.env.TLGTOKEN||"Token is not present";
console.log(token);
const bot = new TelegramBot(token, {
  polling: true,
});

bot.on("message", (mess) => {
  let chat_id = mess.from.id;
  console.log(mess);
  bot.sendMessage(chat_id, "Hello from NodeJS,");
});

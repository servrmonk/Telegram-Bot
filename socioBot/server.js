const { Telegraf } = require("telegraf");

const { UserModel } = require("./src/models/user.model.js");
const connectWithMongoose = require("./src/config/db.js");
const { message } = require("telegraf/filters");
const { EventModel } = require("./src/models/event.model.js");

const bot = new Telegraf(process.env.TELEGRAM_BOT_API);

connectWithMongoose()
  .then(() => {
    console.log("Db connected successfully");
  })
  .catch((err) => console.log("Mongodb connection failed", err));

bot.start(async (contextAboutUserInfo) => {
  // console.log(contextAboutUserInfo);
  await contextAboutUserInfo.reply("Welcome to the telegram bot");

  const from = contextAboutUserInfo.update.message.from;
  console.log(from);

  try {
    await UserModel.findOneAndUpdate(
      { telegramId: from.id },
      {
        $setOnInsert: {
          telegramId: from.id,
          firstName: from.first_name,
          lastName: from.last_name || "Lastname is notpresent",
          isBot: from.is_bot,
          userName: from.username,
        },
      },
      { upsert: true, new: true }
    );
    await contextAboutUserInfo.reply(
      `Hey! ${from.first_name} Welcome, I Will be writing highly engaging social media posts for you just keep feedin me wilt the event thought of the day .`
    );
  } catch (error) {
    console.log("Error => ", error);
    await contextAboutUserInfo.reply("Facing Difficulties");
  }
});

// https://github.com/telegraf/telegraf

bot.command("generate", async (ctx) => {
  const from = ctx.update.message.from;
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const events = await EventModel.find({
    tgId: from.id,
    createdAt: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  });
  if (events.length === 0) {
    await ctx.reply("No events for the day");
    return;
  }
  console.log("Events ", events);
  await ctx.reply("Doing things...");
});

bot.on(message("text"), async (ctx) => {
  const form = ctx.update.message.from;

  const msg = ctx.update.message.text;
  try {
    await EventModel.create({
      text: msg,
      tgId: form.id,
    });
    await ctx.reply(
      "Msg Noted keep texting me your thoughts. To generate the posts, just enter the command :/generate"
    );
  } catch (error) {
    await ctx.reply("Facing difficulties, try again later");
  }

  console.log("Context in messg", ctx);
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

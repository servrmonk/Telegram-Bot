const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    telegramId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    isBot: {
      type: Boolean,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    promtTokens: {
      //open ai ka
      type: Number,
      required: false,
    },
    completionTokens: {
      type: Number,
      require: false,
    },
  },
  { timestamps: true }
);

 const UserModel = new mongoose.model("UserModel", userSchema);
 module.exports = {UserModel}

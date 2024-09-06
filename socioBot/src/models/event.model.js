const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    text: { type: String, required: true },
    tgId: { type: String, required: true },
  },
  { timestamps: true }
);

const EventModel = new mongoose.model("EventModel", eventSchema);
module.exports = { EventModel };

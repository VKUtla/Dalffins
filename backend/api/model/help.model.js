//Author: Jay Patel (B00881906)
const mongoose = require("mongoose");

const HelpTicketSchema = mongoose.Schema(
  {
    reason: {
      type: String,
      required: true,
    },
    messages: {
      type: Array,
      default: [],
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Open",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HelpTicket", HelpTicketSchema);

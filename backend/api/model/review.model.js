//Author: Jay Patel (B00881906)
const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);

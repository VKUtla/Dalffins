const mongoose = require("mongoose");

const FoodItemSchema = mongoose.Schema({
  dishname: {
    type: String,
  },
  dishRating: {
    type: Number,
    default: 0,
  },
  dishTotalRatings: {
    type: Number,
    default: 0,
  },
  Image: {
    data: Buffer,
    type: String,
  },
  dishcost: {
    type: String,
  },
  mealtype: {
    type: String,
  },
  dishstatus: {
    type: String,
  },
  delivery: {
    type: String,
  },
  vendorEmail: {
    type: String,
  },
});

const KitchenSchema = mongoose.Schema({
  kitchenName: {
    type: String,
  },
  kitchenImages: {
    type: Array,
  },
  userId: {
    type: mongoose.ObjectId,
  },
  foodItems: [FoodItemSchema],
});

module.exports = mongoose.model("foodItems", KitchenSchema);

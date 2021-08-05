/* Author - Akshay Garg */

// importing the model into foodItems
// const foodItems = require("../model/food.items");
const foodItems = require("../model/kitchen.model");

module.exports.getKitchenByOwnerId = (req, res, next) => {
  const id = req.params.id;
  // Calls the mongoDB and find the collection for which the input id is matching.
  foodItems.findById(id, function (err, docs) {
    if (err) {
      //In case of error returning error json.
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    } else {
      // Return the data on successful fetching of data from mongoDB
      return res.status(200).json({
        success: true,
        data: docs,
      });
    }
  });
};

module.exports.getVendors = (req, res, next) => {
  console.log("Test");
  foodItems.find({}, function (err, docs) {
    if (err) {
      //In case of error returning error json.
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    } else {
      // Return the data on successful fetching of data from mongoDB
      return res.status(200).json({
        success: true,
        data: docs,
      });
    }
  });
};

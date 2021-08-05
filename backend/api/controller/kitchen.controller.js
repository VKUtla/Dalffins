//Author: Tanuj Sobti (B00864990)
const passport = require('passport');
const Kitchen = require('../model/kitchen.model')
const mongoose = require("mongoose");


module.exports.createKitchen = async (req, res) => { 
  try{ 
      const kitchen = {...req.body, userId: mongoose.Types.ObjectId(req.body.userId)}
      const kitchenObj = new Kitchen(kitchen)
      const kitchenDetails = await kitchenObj.save();
      res.status(200).json(kitchenDetails);

  }catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
};

module.exports.getKitchen = async (req, res) => { 
  const userId = req.query.userId;
  try{ 
        let kitchen;
        if(userId){
          kitchen = await Kitchen.find({ "userId" : userId });
        } else {
          res.status(404).json("No dish found for the userID")
        }
        res.status(200).json(kitchen);
    }catch (err) {
        return res.status(500).json({
          message: "Internal server error",
          success: false,
        });
      }
};

module.exports.addDish = async (req, res) => { 
  try{ 

      const kitchen = await Kitchen.findById(req.query.kitchenId);
      kitchen.foodItems.push(req.body)
      const updatedKitchen = await kitchen.save();
      res.status(200).json(updatedKitchen.foodItems);

  }catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
};

module.exports.removeDish = async (req, res) => {
    try{
      const kitchen = await Kitchen.findById(req.query.kitchenId);
      kitchen.foodItems.id(req.query.foodItemId).remove();
      kitchen.save();
      res.status(200).json("Dish has been removed from Kitchen Successfully!! ");
    }catch (err) {
        console.log(err);
        return res.status(500).json({
          message: "Internal server error",
          success: false,
        });
      }
    };

module.exports.updateDish = async (req, res) => {
  try{
    const {kitchenId} = req.query;
    const updatedKitchen = await Kitchen.findOneAndUpdate({
      "_id": kitchenId, "foodItems._id": req.body._id
    }, {
      "$set": {
        "foodItems.$": req.body
      }
    }, {new: true})
    res.status(200).json(updatedKitchen.foodItems);
  }catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
}

module.exports.updateDishStatus = async (req, res) => {
  try{
    const {kitchenId} = req.query;
    const updatedKitchen = await Kitchen.findOneAndUpdate({
      "_id": kitchenId, "foodItems._id": req.body._id
    }, {
      "$set": {
        "foodItems.$.dishstatus": req.body.dishstatus
      }
    }, {new: true})
    res.status(200).json(updatedKitchen.foodItems);
  }catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
}
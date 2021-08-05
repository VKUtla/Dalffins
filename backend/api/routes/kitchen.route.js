//Author: Tanuj Sobti (B00864990)
const express = require('express')

const router = express.Router();

const kitchenController = require('../controller/kitchen.controller')

router.post('/adddish', kitchenController.addDish);

router.post('/createKitchen', kitchenController.createKitchen);

router.get('/getKitchen', kitchenController.getKitchen);

router.delete('/removedish', kitchenController.removeDish);

router.put('/updatedish', kitchenController.updateDish);

router.put('/updatedishstatus', kitchenController.updateDishStatus);


module.exports = router;
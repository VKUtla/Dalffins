//Author: Vamsi Krishna Utla (B00870632)

const express = require('express')

const router = express.Router();

const paymentController = require('../controller/payment.controller')

//interac route
router.post('/saveOrderInterac', paymentController.saveOrderInterac);

//cash route
router.post('/saveOrderCash', paymentController.saveOrderCash);

module.exports = router;
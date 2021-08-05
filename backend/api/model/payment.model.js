//Author: Vamsi Krishna Utla (B00870632)

const mongoose = require("mongoose");


//create mongodb schema
const paymentAndOrderInformation = mongoose.Schema(
{
    orderID: {
      type: String,
      required: true    
    },
    user: {
      type: String,
      required: true,
    },
    vendor: {
      type: String,
      required: true    
    },
    orderItems: {
      type: String,
      required: true,
    },
    total: {
      type: String,
      required: true,
    },
    paymentOption: {
      type: String,
      required: true,
    },
    receipt: {
      type: String
    },
    instructions: {
      type: String  
    }
});

module.exports = mongoose.model("paymentAndOrderInformation", paymentAndOrderInformation);

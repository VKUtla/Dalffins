//Author: Vamsi Krishna Utla (B00870632)

var uuid = require('uuid');
const Payment = require('../model/payment.model')
var nodemailer = require('nodemailer');

//setup node mailer transport parameter
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dalffinsofficial@gmail.com',
        pass: 'Dalffins@123'
    }
});

//interac mode function
module.exports.saveOrderInterac = (req, res, next) => {

    var orderIDcounter = "ORD"+uuid.v4();

    //design mongo schema
    const paymentObj = new Payment({
        orderID: orderIDcounter,
        user: req.body.user,
        vendor: req.body.vendor,
        total: req.body.total,
        orderItems: req.body.orderItems,
        paymentOption: req.body.paymentOption,
        transactionID: req.body.transactionID,
        instructions: req.body.instructions
    });

    console.log("Interac")
    //save order details to mongo db
    paymentObj.save();
    res.status(201);
    
    //user email parameters
    var userEmail = {
        from: 'dalffinsofficial@gmail.com',
        to: req.body.user,
        subject: 'Order confirmation: '+orderIDcounter,
        text: 'Hello,\n\nYour order has been placed successfully. Please find the details of the order as follows:\n\nItems:\n'+req.body.orderItems+'\nTotal:\n'+req.body.total+'\nSpecial Instructions:\n'+req.body.instructions+'\nThanks.\n\nRegards,\nDalffins Teams'
    };

    //vendor email parameters
    var vendorEmail = {
        from: 'dalffinsofficial@gmail.com',
        to: req.body.vendor,
        subject: 'New order: '+orderIDcounter,
        text: 'Hello,\n\nYou have got a new order. Please find the details of the order as follows:\n\nItems:\n'+req.body.orderItems+'\nTotal:\n'+req.body.total+'\nPayment Transaction: \n'+req.body.transactionID+'\nSpecial Instructions:\n'+req.body.instructions+'\nThanks.\n\nRegards,\nDalffins Teams'
    };

    //send email confirmation to end user of the order
    transporter.sendMail(userEmail, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    //send email to vendor about order confirmation
    transporter.sendMail(vendorEmail, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    return res.json(paymentObj);
};


//cash mode function
module.exports.saveOrderCash = (req, res, next) => {

    var orderIDcounter = "ORD"+uuid.v4();

    //design mongo schema
    const paymentObj = new Payment({
        orderID: orderIDcounter,
        user: req.body.user,
        vendor: req.body.vendor,
        total: req.body.total,
        orderItems: req.body.orderItems,
        paymentOption: req.body.paymentOption,
        instructions: req.body.instructions
    });

    //save order details to mongo db
    paymentObj.save();
    res.status(201);
    
    //user email parameters
    var userEmail = {
        from: 'dalffinsofficial@gmail.com',
        to: req.body.user,
        subject: 'Order confirmation: '+orderIDcounter,
        text: 'Hello,\n\nYour order has been placed successfully. Please find the details of the order as follows:\n\nItems:\n'+req.body.orderItems+'\nTotal:\n'+req.body.total+'\nSpecial Instructions:\n'+req.body.instructions+'\nThanks.\n\nRegards,\nDalffins Teams'
    };

    console.log(req.body.vendor);
    console.log(orderIDcounter);
    
    //vendor email parameters
    var vendorEmail = {
        from: 'dalffinsofficial@gmail.com',
        to: req.body.vendor,
        subject: 'New order: '+orderIDcounter,
        text: 'Hello,\n\nYou have got a new order. Please find the details of the order as follows:\n\nItems:\n'+req.body.orderItems+'\nTotal:\n'+req.body.total+'\nPayment Transaction: \nCash'+'\nSpecial Instructions:\n'+req.body.instructions+'\nThanks.\n\nRegards,\nDalffins Teams'
    };

    //send email confirmation to end user of the order
    transporter.sendMail(userEmail, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

     //send email to vendor about order confirmation
    transporter.sendMail(vendorEmail, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    return res.json(paymentObj);
};
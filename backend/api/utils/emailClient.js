//Author: Jay Patel (B00881906)
const nodemailer = require("nodemailer");
const config = require("../config/email.config");

const sendTicketUpdateEmail = (email, name, subject, messageTitle, message) => {
  // function to send email to the user
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.email,
      pass: config.pass,
    },
  });

  // email content configuration
  let mailOptions = {
    from: '"Dalffins Team" team.dalffins@gmail.com',
    to: email,
    subject,
    html: `
        <p>Hello ${name},</p>
        
        <p>${messageTitle}</p>
        <p>"${message}."</p>
        
        <p>Best wishes,<br/>Dalffins</p>`,
  };

  // send email
  transporter.sendMail(mailOptions, (err, data) => {
    if (!err) {
      // success message
      console.log("Email sent successfully!");
    } else {
      // send error response
      console.error("Error: " + err);
    }
  });
};

module.exports = { sendTicketUpdateEmail };

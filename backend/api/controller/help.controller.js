//Author: Jay Patel (B00881906)
const { sendTicketUpdateEmail } = require("../utils/emailClient");

function helpController(HelpTicket) {
  function getTickets(req, res) {
    // Returns support tickets associated with the particular user
    if (!req.query.email) {
      res.status(400);
      return res.send("User email is required");
    }

    // find tickets associated with the user email
    HelpTicket.find({ email: req.query.email }, (err, tickets) => {
      if (err) {
        // send error response
        return res.send(err);
      }
      // send response
      return res.json(tickets);
    });
  }

  function getAllTickets(req, res) {
    // Returns all the support tickets for the admin
    HelpTicket.find((err, tickets) => {
      if (err) {
        // send error response
        return res.send(err);
      }
      // send response
      return res.json(tickets);
    });
  }

  function saveTicket(req, res) {
    // create support ticket for a user
    const ticket = new HelpTicket(req.body);

    // validate input data
    if (!req.body.reason) {
      // send error response
      res.status(400);
      return res.send("Reason is required");
    }
    if (!req.body.messages) {
      // send error response
      res.status(400);
      return res.send("Messages is required");
    }
    if (!req.body.email) {
      // send error response
      res.status(400);
      return res.send("Email is required");
    }

    // save ticket
    ticket.save();

    // send email to the user
    sendTicketUpdateEmail(
      req.body.email,
      req.body.messages[0].name,
      `New ticket created - ${req.body.reason}`,
      "You have created new support ticket created with the following message:",
      req.body.messages[0].text
    );

    // send response
    res.status(201);
    return res.json(ticket);
  }

  function updateTicket(req, res) {
    // update support ticket which is already created in the database
    const { ticket } = req;
    ticket.reason = req.body.reason;
    ticket.messages = req.body.messages;
    ticket.email = req.body.email;
    ticket.status = req.body.status;

    // save updated data
    ticket.save((err) => {
      if (err) {
        // send error response
        return res.send(err);
      }

      // send email notification about the ticket update
      sendTicketUpdateEmail(
        req.body.messages[0].author,
        req.body.messages[0].name,
        `Update on your ticket - ${req.body.reason}`,
        `There is a new comment on your ticket by 
          ${
            req.body.messages[req.body.messages.length - 1].name ===
            req.body.messages[0].name
              ? "you"
              : req.body.messages[req.body.messages.length - 1].name
          }`,
        req.body.messages[req.body.messages.length - 1].text
      );

      // send response
      return res.json(ticket);
    });
  }

  return { getTickets, saveTicket, getAllTickets, updateTicket };
}

module.exports = helpController;

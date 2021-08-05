//Author: Jay Patel (B00881906)
const express = require("express");
const HelpTicket = require("../model/help.model");
const helpController = require("../controller/help.controller");
const helpMiddleware = require("../middleware/help.middleware");

function routes() {
  const helpRoute = express.Router();
  const controller = helpController(HelpTicket);
  const middleware = helpMiddleware(HelpTicket);

  // route to fetch all tickets for admin
  helpRoute.route("/admin/tickets").get(controller.getAllTickets);

  // route to tickets by email and save new ticket
  helpRoute
    .route("/tickets")
    .get(controller.getTickets)
    .post(controller.saveTicket);

  // middleware for /tickets/:ticketId API
  helpRoute.use("/tickets/:ticketId", middleware.helpTicketFinderMiddleware);

  // route to update specific ticket by given id
  helpRoute.route("/tickets/:ticketId").put(controller.updateTicket);

  return helpRoute;
}

module.exports = routes();

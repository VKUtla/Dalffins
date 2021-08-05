//Author: Jay Patel (B00881906)
function helpMiddleware(HelpTicket) {
  function helpTicketFinderMiddleware(req, res, next) {
    // middleware to add ticket in the request
    const { ticketId } = req.params;
    // find ticket by the id
    HelpTicket.findById({ _id: ticketId }, (err, ticket) => {
      if (err) {
        // send error response
        return res.send(err);
      }
      if (ticket) {
        req.ticket = ticket;
        // continue to the api endpoint
        return next();
      }
      // send error response
      return res.sendStatus(404);
    });
  }

  return { helpTicketFinderMiddleware };
}

module.exports = helpMiddleware;

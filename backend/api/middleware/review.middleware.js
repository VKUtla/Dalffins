//Author: Jay Patel (B00881906)
function reviewMiddleware(Review) {
  function reviewFinderMiddleware(req, res, next) {
    // middleware to add ticket in the request
    const { reviewId } = req.params;
    // find ticket by the id
    Review.findById({ _id: reviewId }, (err, review) => {
      if (err) {
        // send error response
        return res.send(err);
      }
      if (review) {
        req.review = review;
        // continue to the api endpoint
        return next();
      }
      // send error response
      return res.sendStatus(404);
    });
  }

  return { reviewFinderMiddleware };
}

module.exports = reviewMiddleware;

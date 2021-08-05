//Author: Jay Patel (B00881906)
const foodItems = require("../model/kitchen.model");

function reviewController(Review) {
  function getReview(req, res) {
    // Returns review associated with the particular product
    return res.json(req.review);
  }

  function saveReview(req, res) {
    // create review for a user
    const review = new Review(req.body);

    // validate input data
    if (!req.body.productId) {
      // send error response
      res.status(400);
      return res.send("Product Id is required");
    }
    if (!req.body.rating) {
      // send error response
      res.status(400);
      return res.send("Rating is required");
    }
    if (!req.body.review) {
      // send error response
      res.status(400);
      return res.send("Review is required");
    }
    if (!req.body.email) {
      // send error response
      res.status(400);
      return res.send("Email is required");
    }

    // save review
    review.save();

    foodItems.findOne(
      { foodItems: { $elemMatch: { dishname: req.body.productId } } },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          if (docs && docs.hasOwnProperty("foodItems")) {
            docs.foodItems = docs.foodItems.map((item) => {
              if (item.dishname === req.body.productId) {
                item.dishRating = Math.round(
                  (Number(item.dishRating) + Number(req.body.rating)) /
                    (item.dishTotalRatings + 1)
                );
                item.dishTotalRatings = item.dishTotalRatings + 1;
              }
              return item;
            });
            docs.save();
          }
        }
      }
    );

    // send response
    res.status(201);
    return res.json(review);
  }

  function updateReview(req, res) {
    // update review which is already created in the database
    const { review } = req;
    review.productId = req.body.productId;
    review.rating = req.body.rating;
    review.review = req.body.review;
    review.email = req.body.email;

    // save updated data
    review.save((err) => {
      if (err) {
        // send error response
        return res.send(err);
      }

      // send response
      return res.json(review);
    });
  }

  function deleteReview(req, res) {
    // delete review from the database
    const { review } = req;

    review.remove((err) => {
      if (err) {
        // send error response
        return res.send(err);
      }

      // send response
      res.status(200);
      return res.json({});
    });
  }

  return { getReview, saveReview, updateReview, deleteReview };
}

module.exports = reviewController;

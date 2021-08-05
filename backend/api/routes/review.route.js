//Author: Jay Patel (B00881906)
const express = require("express");
const Review = require("../model/review.model");
const reviewController = require("../controller/review.controller");
const reviewMiddleware = require("../middleware/review.middleware");

function routes() {
  const reviewRoute = express.Router();
  const controller = reviewController(Review);
  const middleware = reviewMiddleware(Review);

  // route to tickets by email and save new ticket
  reviewRoute.route("/review").post(controller.saveReview);

  // middleware for /review/:reviewId API
  reviewRoute.use("/review/:reviewId", middleware.reviewFinderMiddleware);

  // route to update specific review by given id
  reviewRoute
    .route("/review/:reviewId")
    .get(controller.getReview)
    .put(controller.updateReview)
    .delete(controller.deleteReview);

  return reviewRoute;
}

module.exports = routes();

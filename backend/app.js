//Author: Divyashree Bangalore Subbaraya (B00875916)
const bodyParser = require("body-parser");

const express = require("express");

const app = express();

const mongoose = require("mongoose");

const cors = require("cors");

const passport = require("passport");

const dbConfig = require("../backend/api/config/mongodb.config");

const userRoute = require("../backend/api/routes/user.route");

const helpRoute = require("../backend/api/routes/help.route");

const reviewRoute = require("../backend/api/routes/review.route");

const foodSelectionRoute = require("../backend/api/routes/food.selection.route");

const passportConfig = require("../backend/api/config/passport.config");

const payRoute = require("../backend/api/routes/payment.route");

const kitchenRoute = require("../backend/api/routes/kitchen.route");

app.use(cors());

app.use(express.json());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use(passport.session());

app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
  next();
});

mongoose.Promise = global.Promise;

//connect to mongo db database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(async () => {
    console.log("Successfully connected to dalffins mongoDb database!");
  })
  .catch((err) => {
    console.log("Could not connect to dalffins MongoDB database.");
    process.exit();
  });

//Route user
app.use("/user", userRoute);

//Route help
app.use("/help", helpRoute);

//Route review
app.use("/rating", reviewRoute);

//Route foodSelection
app.use("/foodSelection", foodSelectionRoute);

//Kitchen Items
app.use("/kitchen", kitchenRoute);

//Route order summary and payment
app.use("/summaryAndPayment", payRoute);

module.exports = app;

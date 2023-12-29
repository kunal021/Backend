const express = require("express");
const app = express();
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

// MIDDLEWARES

if (process.env.NODE_ENV === "developement") {
  app.use(morgan("dev"));
}
//.use is used to use middleware(express.json() is inbuilt middleware)
app.use(express.json());

//creating own middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
//middleware to impelement routes
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

//middleware to serve file taht's route is not defined
app.use(express.static(`${__dirname}/public`));

// SERVER

module.exports = app;

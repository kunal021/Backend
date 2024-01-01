const express = require("express");
const tourController = require("../controllers/tourController");

const router = express.Router();

//middleware to check if id is present or not
// router.param("id", tourController.checkId);

//middleware to check body
// const checkBody = tourController.checkBody;

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;

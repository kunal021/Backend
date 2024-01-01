const Tour = require("../models/tourModel");

// exports.checkId = (req, res, next, value) => {
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: "fail",
//       data: "Invalid ID",
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: "bad request",
//       data: "name or price missing",
//     });
//   }
//   next();
// };

exports.getAllTours = async (req, res) => {
  try {
    //find method to find tour
    //if we don't specify any argument in find method it will return all tours
    const tours = await Tour.find();
    res.status(200).json({
      status: "sucess",
      result: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    //findById method to find tour by its id
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: "sucess",
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    //const newTour = new Tour({});
    //newTour.save();

    //same as above but we directly create tour in database
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "sucess",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "sucess",
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "sucess",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

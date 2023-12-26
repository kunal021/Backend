const fs = require("fs");
const express = require("express");
const app = express();
const morgan = require("morgan");

// 1. MIDDLEWARES

app.use(morgan("dev"));
//.use is used to use middleware(express.json() is inbuilt middleware)
app.use(express.json());

//creating own middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2. ROUTE HANDERS

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "sucess",
    requestedAt: req.requestTime,
    result: tours.length,
    data: {
      tours: tours,
    },
  });
};

const getTour = (req, res) => {
  //converting string into number
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  // if (id > tours.length - 1)
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      data: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "sucess",
    data: {
      tour: tour,
    },
  });
};

const createTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "sucess",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      data: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "sucess",
    data: "<Updated Data Here>",
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      data: "Invalid ID",
    });
  }

  res.status(204).json({
    status: "sucess",
    data: null,
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    data: "route not defined",
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    data: "route not defined",
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    data: "route not defined",
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    data: "route not defined",
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    data: "route not defined",
  });
};

// 3. ROUTES

// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.post("/api/v1/tours", createTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

//tour route
app.route("/api/v1/tours").get(getAllTours).post(createTour);
app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

//user route
app.route("/api/v1/users").get(getAllUsers).post(createTour);
app
  .route("/api/v1/tours/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

// 4. SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

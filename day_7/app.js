const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.json());

// app.get("/", (req, res) => {
//   // res.status(200).send("My first Express app");
//   //sending json data
//   res.json({ name: "Kunal", age: 20, "current-occupation": "Student" });
// });

// app.post("/", (req, res) => {
//   res.send("You can post here");
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "sucess",
    result: tours.length,
    data: {
      tours: tours,
    },
  });
});

app.get("/api/v1/tours/:id", (req, res) => {
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
});

app.post("/api/v1/tours", (req, res) => {
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
});

app.patch("/api/v1/tours/:id", (req, res) => {
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
});

app.delete("/api/v1/tours/:id", (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

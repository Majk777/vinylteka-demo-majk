require("dotenv").config();
const cors = require("cors");
const express = require("express");

const alboumRoutes = require("./routes/albums");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/albums", alboumRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.json({ mssg: "welcome in main url" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// app.listen(process.env.PORT, () => {
//   console.log("server on run ;)");
// });

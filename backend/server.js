require("dotenv").config();
const cors = require("cors");
const express = require("express");

const alboumRoutes = require("./routes/albums");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");
const multer = require("multer");

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());
// app.use(handleImageUpload);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
const upload = multer({ storage: multer.memoryStorage() });

app.use(
  "/api/albums",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "file2", maxCount: 1 },
    { name: "file3", maxCount: 1 },
  ]),
  alboumRoutes
);
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

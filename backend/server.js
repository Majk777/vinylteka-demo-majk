require("dotenv").config();
const path = require("path");
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

if (process.env.NODE_ENV === "production") {
  console.log("build / production environment is set");
  const dirname = path.resolve();

  app.use(express.static(path.join(dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(dirname, "../frontend", "build", "index.html"))
  );
} else {
  console.log("dev server");
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

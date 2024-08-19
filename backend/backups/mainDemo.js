require("dotenv").config();
const cors = require("cors");
const express = require("express");
const Grid = require("gridfs-stream");
const { GridFsStorage } = require("multer-gridfs-storage");
const Metadata = require("./models/metadataModel");

const { v4: uuidv4 } = require("uuid");
const { BlobServiceClient } = require("@azure/storage-blob");
const accountName = process.env.ACCOUNT_NAME;
const sasToken = process.env.SAS_TOKEN;
const containerName = process.env.CONTAINER_NAME;
const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net/?${sasToken}`
);
const containerClient = blobServiceClient.getContainerClient(containerName);

const alboumRoutes = require("./routes/albums");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");
const multer = require("multer");
const uploadSchema = require("./models/uploadModel");

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

app.use("/api/albums", alboumRoutes);
app.use("/api/user", userRoutes);
// T U   R O B O T A
// const upload = multer({ storage: multer.memoryStorage() });
// app.use("/api/upload",upload.fields([ { name: "file", maxCount: 1 },{ name: "file2", maxCount: 1 },{ name: "file3", maxCount: 1 },]), , metadataRoutes);

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

// D O    U J E B A N I A ----- >

const conn = mongoose.connection;

let gfs;
let albums;

conn.once("open", () => {
  // Inicjalizacja strumienia GridFS
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

const upload = multer({ storage: multer.memoryStorage() });

app.post(
  "/api/upload",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "file2", maxCount: 1 },
    { name: "file3", maxCount: 1 },
  ]),
  async (req, res) => {
    // const { username, title, description } = req.body;
    // const img = req.file;
    // const image = req.files;
    // console.log(image);
    // console.log("req headers are below");
    // console.log(req.headers);
    // console.log("req body is below");
    // console.log(req.body);
    // console.log("req file is below");
    // console.log(req.file);
    // console.log("req file mimetype is below");
    // console.log(req.file.mimetype);
    // console.log("req file name is");
    // console.log(req.file.originalname);

    // console.log("below image is down there");
    // console.log(img);
    // console.log(username);
    // console.log(title);
    // console.log(description);
    try {
      const { username, title, description, genres } = req.body;
      // const image = req.file;
      const file1 = req.files.file[0];
      const file2 = req.files.file2[0];
      const file3 = req.files.file3[0];
      console.log(username);
      console.log(title);
      console.log(description);
      console.log(genres);
      // console.log(image);

      // const blobName = uuidv4() + "-" + image.originalname;
      // const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      // await blockBlobClient.uploadData(image.buffer, {
      //   blobHTTPHeaders: { blobContentType: image.mimetype },
      // });
      // const imageUrl = blockBlobClient.url;
      // Przetwarzanie pierwszego pliku i przesyłanie do Azure Blob Storage
      const blobName1 = uuidv4() + "-" + file1.originalname;
      const blockBlobClient1 = containerClient.getBlockBlobClient(blobName1);
      await blockBlobClient1.uploadData(file1.buffer, {
        blobHTTPHeaders: { blobContentType: file1.mimetype },
      });
      const imageUrl1 = blockBlobClient1.url;

      // Przetwarzanie drugiego pliku i przesyłanie do Azure Blob Storage
      const blobName2 = uuidv4() + "-" + file2.originalname;
      const blockBlobClient2 = containerClient.getBlockBlobClient(blobName2);
      await blockBlobClient2.uploadData(file2.buffer, {
        blobHTTPHeaders: { blobContentType: file2.mimetype },
      });
      const imageUrl2 = blockBlobClient2.url;

      const blobName3 = uuidv4() + "-" + file3.originalname;
      const blockBlobClient3 = containerClient.getBlockBlobClient(blobName3);
      await blockBlobClient3.uploadData(file3.buffer, {
        blobHTTPHeaders: { blobContentType: file3.mimetype },
      });
      const imageUrl3 = blockBlobClient3.url;

      const metadata = await Metadata.create({
        username,
        title,
        description,
        // imageUrl: imageUrl,
        imageUrlFront: imageUrl1,
        imageUrlBack: imageUrl2,
        imageUrlBandPic: imageUrl3,
        genres,
      });
      res.status(200).json(metadata);
    } catch (error) {
      // console.log(error);
      res.status(400).json({ error: error.message });
    }
  }
);

app.get("/api/metadata", async (req, res) => {
  try {
    // Pobierz wszystkie metadane z bazy danych
    const metadataList = await Metadata.find();
    res.status(200).json(metadataList);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server error");
  }
});

app.get("/api/upload", async (req, res) => {
  try {
    // Pobierz wszystkie metadane z bazy danych
    const metadataList = await Metadata.find();
    res.status(200).json(metadataList);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server error");
  }
});

module.exports = { conn, gfs };

// Stworzyć route (osobny?) dla uploadowania

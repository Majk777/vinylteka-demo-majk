const multer = require("multer");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const GridFsStorage = require("multer-gridfs-storage");

// Połączenie z bazą danych MongoDB
mongoose.connect("your_mongodb_connection_string", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const conn = mongoose.connection;

let gfs;

conn.once("open", () => {
  // Inicjalizacja strumienia GridFS
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Konfiguracja przechowywania plików w GridFS
const storage = new GridFsStorage({
  url: "your_mongodb_connection_string",
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: "uploads",
    };
  },
});

const upload = multer({ storage });

// Obsługa przesyłania plików
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ file: req.file });
});

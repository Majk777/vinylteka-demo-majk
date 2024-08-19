const express = require("express");

const router = express.Router();

const Album = require("../models/albumModels");

const {
  getAlbums,
  getAlbum,
  createAlbum,
  deleteAlbum,
  updateAlbum,
} = require("../controllers/albumController");

const requireAuth = require("../middleware/authorization");

// router.get("/", (req, res) => {
//   res.json({ mssg: "welcome in router: all albums are here" });
// });
router.get("/", getAlbums);

// router.get("/:id", (req, res) => {
//   res.json({ mssg: "its a single album" });
// });
router.get("/:id", getAlbum);

router.post("/", requireAuth, createAlbum);

router.delete("/:id", deleteAlbum);

router.patch("/:id", updateAlbum);

module.exports = router;

// router.post("/", async (req, res) => {
//   const { bandName, albumTitle, description, label, released, genres } =
//     req.body;

//   try {
//     const album = await Album.create({
//       bandName,
//       albumTitle,
//       description,
//       label,
//       released,
//       genres,
//     });
//     res.status(200).json(album);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }

//   res.json({ mssg: "you are trying to POST album" });
// });

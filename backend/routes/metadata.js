// AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
const express = require("express");

const router = express.Router();

const { postMetadata } = require("../controllers/metadataController");

// router.get("/", getAlbums);

// router.get("/:id", (req, res) => {
//   res.json({ mssg: "its a single album" });
// });
// router.get("/:id", getAlbum);

router.post("/", postMetadata);

// router.delete("/:id", deleteAlbum);
module.exports = router;

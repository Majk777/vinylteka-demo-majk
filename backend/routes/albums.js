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


router.get("/", getAlbums);


router.get("/:id", getAlbum);

router.post("/", requireAuth, createAlbum);

router.delete("/:id", deleteAlbum);

router.patch("/:id", updateAlbum);

module.exports = router;

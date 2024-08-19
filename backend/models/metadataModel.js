const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const metadataSchema = new Schema({
  username: String,
  bandName: {
    type: String,
    required: true,
  },
  albumTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
  released: {
    type: Number,
    required: true,
  },
  imageUrlFront: String,
  imageUrlBack: String,
  imageUrlBandPic: String,
  genres: {
    // type: Number,
    type: [String],
    // required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Metadata", metadataSchema);

// const metadataSchema = new Schema({
//   username: String,
//   title: String,
//   description: String,
//   // imageUrl: String,
//   imageUrlFront: String,
//   imageUrlBack: String,
//   imageUrlBandPic: String,
//   genres: {
//     // type: Number,
//     type: [String],
//     // required: true,
//   },
// });

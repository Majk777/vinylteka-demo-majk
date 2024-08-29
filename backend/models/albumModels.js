const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    usernameCommenting: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const albumSchema = new Schema(
  {
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
    imageUrlFront: { type: String, required: true },
    imageUrlBack: String,
    imageUrlBandPic: String,
    genres: {
      type: [String],
    },
    type: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Album", albumSchema);

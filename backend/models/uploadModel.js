const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const uploadSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // img: {
  //   data: Buffer,
  //   contentType: String,
  // },
  file: {
    data: Buffer,
    contentType: String,
  },
});
module.exports = mongoose.model("Upload", uploadSchema);

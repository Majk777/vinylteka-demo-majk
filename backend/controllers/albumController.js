const Album = require("../models/albumModels");
const mongoose = require("mongoose");

const { v4: uuidv4 } = require("uuid");
const { BlobServiceClient } = require("@azure/storage-blob");
const accountName = process.env.ACCOUNT_NAME;
const sasToken = process.env.SAS_TOKEN;
const containerName = process.env.CONTAINER_NAME;
const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net/?${sasToken}`
);
const containerClient = blobServiceClient.getContainerClient(containerName);

//                  AMAZON        S3          STORAGE
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const getAlbums = async (req, res) => {
  const albums = await Album.find({}).sort({ createdAt: -1 });

  res.status(200).json(albums);
};

const getAlbum = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Error 404: found no result" });
  }

  const album = await Album.findById(id);

  if (!album) {
    return res.status(404).json({ error: "Error 404: found no result" });
  }

  res.status(200).json(album);
};

const deleteAlbum = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Error 404: found no result" });
  }

  const album = await Album.findByIdAndDelete({ _id: id });

  if (!album) {
    return res.status(404).json({ error: "Error 404: found no result" });
  }

  res.status(200).json(album);
};

// const createAlbum = async (req, res) => {
//   try {
//     const {
//       username,
//       bandName,
//       description,
//       albumTitle,
//       label,
//       genres,
//       released,
//       type,
//     } = req.body;

//     const file1 = req.files.file[0];
//     const file2 = req.files.file2[0];
//     const file3 = req.files.file3[0];
//     console.log(username);
//     // console.log(title);
//     console.log(description);
//     console.log(genres);

//     const blobName1 = uuidv4() + "-" + file1.originalname;
//     const params1 = {
//       Bucket: process.env.AWS_BUCKET_NAME,
//       Key: blobName1,
//       Body: file1.buffer,
//       ContentType: file1.mimetype,
//     };
//     await s3.upload(params1).promise();
//     const imageUrl1 = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${blobName1}`;

//     // Przetwarzanie drugiego pliku i przesyłanie do Azure Blob Storage
//     const blobName2 = uuidv4() + "-" + file2.originalname;
//     const params2 = {
//       Bucket: process.env.AWS_BUCKET_NAME,
//       Key: blobName2,
//       Body: file2.buffer,
//       ContentType: file2.mimetype,
//     };
//     await s3.upload(params2).promise();
//     const imageUrl2 = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${blobName2}`;

//     const blobName3 = uuidv4() + "-" + file3.originalname;
//     // const blockBlobClient3 = containerClient.getBlockBlobClient(blobName3);
//     // await blockBlobClient3.uploadData(file3.buffer, {
//     //   blobHTTPHeaders: { blobContentType: file3.mimetype },
//     // });
//     // const imageUrl3 = blockBlobClient3.url;
//     const params3 = {
//       Bucket: process.env.AWS_BUCKET_NAME,
//       Key: blobName3,
//       Body: file3.buffer,
//       ContentType: file3.mimetype,
//     };
//     await s3.upload(params3).promise();
//     const imageUrl3 = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${blobName3}`;

//     const album = await Album.create({
//       username,
//       bandName,
//       albumTitle,
//       description,
//       label,
//       // imageUrl: imageUrl,
//       imageUrlFront: imageUrl1,
//       imageUrlBack: imageUrl2,
//       imageUrlBandPic: imageUrl3,
//       genres,
//       released,
//       type,
//     });
//     res.status(200).json(album);
//   } catch (error) {
//     // console.log(error);
//     res.status(400).json({ error: error.message });
//   }
// };

const createAlbum = async (req, res) => {
  try {
    const {
      username,
      bandName,
      description,
      albumTitle,
      label,
      genres,
      released,
      type,
    } = req.body;

    let imageUrl1, imageUrl2, imageUrl3;

    if (req.files.file && req.files.file[0]) {
      const file1 = req.files.file[0];
      const blobName1 = uuidv4() + "-" + file1.originalname;
      const params1 = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: blobName1,
        Body: file1.buffer,
        ContentType: file1.mimetype,
      };
      await s3.upload(params1).promise();
      imageUrl1 = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${blobName1}`;
    }

    if (req.files.file2 && req.files.file2[0]) {
      const file2 = req.files.file2[0];
      const blobName2 = uuidv4() + "-" + file2.originalname;
      const params2 = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: blobName2,
        Body: file2.buffer,
        ContentType: file2.mimetype,
      };
      await s3.upload(params2).promise();
      imageUrl2 = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${blobName2}`;
    }

    if (req.files.file3 && req.files.file3[0]) {
      const file3 = req.files.file3[0];
      const blobName3 = uuidv4() + "-" + file3.originalname;
      const params3 = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: blobName3,
        Body: file3.buffer,
        ContentType: file3.mimetype,
      };
      await s3.upload(params3).promise();
      imageUrl3 = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${blobName3}`;
    }

    const album = await Album.create({
      username,
      bandName,
      albumTitle,
      description,
      label,
      imageUrlFront: imageUrl1,
      imageUrlBack: imageUrl2,
      imageUrlBandPic: imageUrl3,
      genres,
      released,
      type,
    });

    res.status(200).json(album);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateAlbum = async (req, res) => {
  const { id } = req.params;
  // const updatedAlbumData = req.body;
  const { usernameCommenting, comment } = req.body;
  // console.log(updatedAlbumData);
  console.log(id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Error 404: found no result" });
  }

  try {
    // const album = await Album.findByIdAndUpdate(id, updatedAlbumData, {
    //   new: true,
    // });

    const album = await Album.findByIdAndUpdate(
      id,
      // { $push: { comments: { usernameCommenting, comment } } },
      { $push: { comments: { usernameCommenting, comment } } },
      { new: true }
    );

    if (!album) {
      return res.status(404).json({ error: "Album not found" });
    }

    console.log(album);
    res.status(200).json(album);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAlbums,
  getAlbum,
  createAlbum,
  deleteAlbum,
  updateAlbum,
};

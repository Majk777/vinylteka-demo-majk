// AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
const mongoose = require("mongoose");
const Metadata = require("../models/metadataModel");

const { v4: uuidv4 } = require("uuid");
const { BlobServiceClient } = require("@azure/storage-blob");
const accountName = process.env.ACCOUNT_NAME;
const sasToken = process.env.SAS_TOKEN;
const containerName = process.env.CONTAINER_NAME;
const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net/?${sasToken}`
);
const containerClient = blobServiceClient.getContainerClient(containerName);

const postMetadata = async (req, res) => {
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
};

module.exports = {
  postMetadata,
  //   getpostMetadata
};

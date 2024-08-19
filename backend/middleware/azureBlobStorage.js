require("dotenv").config();
const {
  BlobServiceClient,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");

const { conn } = require("../server");

const accountName = process.env.ACCOUNT_NAME;
const sasToken = process.env.SAS_TOKEN;
const containerName = process.env.CONTAINER_NAME;
const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net/?${sasToken}`
);
const containerClient = blobServiceClient.getContainerClient(containerName);

//Ekstrakcja metadanych: Funkcja wywołuje extractMetadata w celu uzyskania informacji
// takich jak nazwa pliku, opis, typ pliku itp. z nagłówków żądania.
async function extractMetadata(headers) {
  const contentType = headers["content-type"];
  const fileType = contentType.split("/")[1];
  const contentDisposition = headers["content-disposition"] || "";
  const caption = headers["x-image-caption"] || "No caption provided";
  const matches = /filename="([^"]+)"/i.exec(contentDisposition);
  const fileName = matches?.[1] || `image-${Date.now()}.${fileType}`;
  return { fileName, caption, fileType };
}

//Przesłanie obrazu do Azure Blob Storage: Następnie funkcja używa uploadImageStreamed
//do przesłania obrazu do Azure Blob Storage jako strumień.
async function uploadImageStreamed(blobName, dataStream) {
  const blobClient = containerClient.getBlockBlobClient(blobName);
  await blobClient.uploadStream(dataStream);
  return blobClient.url;
}

//Przechowanie metadanych w MongoDB: Po przesłaniu obrazu, funkcja wywołuje storeMetadata w celu zapisania
//metadanych obrazu (nazwa, opis, typ, URL obrazu) w bazie danych MongoDB.
async function storeMetadata(name, caption, fileType, imageUrl) {
  //   const collection = client.db("test").collection("metadata");
  const collection = conn.db("test").collection("metadata");

  await collection.insertOne({ name, caption, fileType, imageUrl });
}

//Zwrócenie odpowiedzi: Na koniec funkcja zwraca odpowiedź HTTP w zależności od przebiegu operacji - z sukcesem lub błędem.
const handleImageUpload = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  if (req.url === "/api/upload" && req.method === "POST") {
    try {
      // Extract metadata from headers
      const { fileName, caption, fileType } = await extractMetadata(
        req.headers
      );

      // Upload the image as a to Azure Storage Blob as a stream
      const imageUrl = await uploadImageStreamed(fileName, req);

      // Store the metadata in MongoDB
      await storeMetadata(fileName, caption, fileType, imageUrl);

      res.writeHead(201);
      res.end(
        JSON.stringify({
          message: "Image uploaded and metadata stored successfully",
          imageUrl,
        })
      );
    } catch (error) {
      console.error("Error:", error);
      res.writeHead(500);
      res.end(JSON.stringify({ error: "Internal Server Error" }));
    }
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Not Found" }));
  }
};
module.exports = { handleImageUpload };

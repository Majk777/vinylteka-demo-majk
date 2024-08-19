import React, { useState, useEffect, useRef } from "react";

const UploadImage = () => {
  // const [file, setFile] = useState("");
  // const [file2, setFile2] = useState("");
  // const [file3, setFile3] = useState("");
  // const [previewUrl, setPreviewUrl] = useState();
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genres, setgenres] = useState([]);
  const [genre, setgenre] = useState("");
  const ingredientInput = useRef(null);
  // const form = document.querySelector("#image-upload-form");
  // setBackFile
  const fileForFrontUpload = (e) => {
    console.log(e.target.files);
    setFile(e.target.files[0]);
  };

  const fileForBackUpload = (e) => {
    console.log(e.target.files);
    setFile2(e.target.files[0]);
  };

  const fileForBandPicUpload = (e) => {
    console.log(e.target.files);
    setFile3(e.target.files[0]);
  };

  useEffect(() => {
    const readFile = (file) => {
      return new Promise((resolve, reject) => {
        if (file instanceof Blob) {
          const fileReader = new FileReader();
          fileReader.onload = () => resolve(fileReader.result);
          fileReader.onerror = reject;
          fileReader.readAsDataURL(file);
        } else {
          reject(new Error("Parameter is not a Blob"));
        }
      });
    };

    const loadPreviews = async (files) => {
      const previews = await Promise.all(files.map(readFile));
      setPreviewUrls(previews);
    };

    if (file || file2 || file3) {
      const files = [file, file2, file3].filter((f) => f !== null);
      if (files.length > 0) {
        loadPreviews(files);
      }
    }
  }, [file, file2, file3]);

  // useEffect(() => {
  //   if (!file) {
  //     return;
  //   }
  //   const fileReader = new FileReader();
  //   fileReader.onload = () => {
  //     setPreviewUrl(fileReader.result);
  //   };
  //   fileReader.readAsDataURL(file);
  // }, [file]);

  // useEffect(() => {
  //   const readFile = (file) => {
  //     return new Promise((resolve, reject) => {
  //       const fileReader = new FileReader();
  //       fileReader.onload = () => resolve(fileReader.result);
  //       fileReader.onerror = reject;
  //       fileReader.readAsDataURL(file);
  //     });
  //   };

  //   const loadPreviews = async (files) => {
  //     const previews = await Promise.all(files.map(readFile));
  //     setPreviewUrls(previews);
  //   };

  //   if (file || file2 || file3) {
  //     loadPreviews([file, file2, file3].filter((f) => f !== null));
  //   }
  // }, [file, file2, file3]);

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = genre.trim();

    if (ing && !genres.includes(ing)) {
      setgenres((prevGenres) => [...prevGenres, genre]);
    }
    setgenre("");
    ingredientInput.current.focus();
    console.log(genres);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // const userStorage = localStorage.getItem("user");
    const userStorage = JSON.parse(localStorage.getItem("user"));
    // const userStorageJson = JSON.stringify(userStorage);
    console.log(userStorage.user);

    formData.append("username", userStorage.user);
    // formData.append("file", file);
    formData.append("file", file);
    formData.append("file2", file2);
    formData.append("file3", file3);
    formData.append("title", title);
    formData.append("description", description);
    genres.forEach((genre) => formData.append("genres[]", genre));
    // formData.append("genres", genres);
    // genres;
    console.log(formData);
    console.log(genres);

    const response = await fetch("http://localhost:4000/api/upload", {
      method: "POST",
      body: formData,
    });
    const json = await response.json();
    const responseJson = JSON.stringify(json);
    if (response.ok) {
      console.log(json);
      console.log(responseJson);
    }
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    console.log(file, title, description);
  };
  // try {
  //   const response = await fetch("/upload", {
  //     method: "POST",
  //     body: formData,
  //   });
  //   if (response.ok) {
  //     alert("File uploaded");
  //   } else {
  //     throw new Error("Error uploading file");
  //   }
  // } catch (err) {
  //   console.error(err);
  // }

  return (
    <div>
      <form id="image-upload-form" onSubmit={onSubmit}>
        <div>
          <h1>Upload Front Image</h1>
          {/* czemu nie trzeba value */}
          <input type="file" name="file" onChange={fileForFrontUpload} />
        </div>

        <div>
          <h1>Upload Back Image</h1>
          {/* czemu nie trzeba value */}
          <input type="file" name="file2" onChange={fileForBackUpload} />
        </div>

        <div>
          <h1>Upload Band Image</h1>
          {/* czemu nie trzeba value */}
          <input type="file" name="file3" onChange={fileForBandPicUpload} />
        </div>

        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <label>
          <span>genres:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setgenre(e.target.value)}
              value={genre}
              ref={ingredientInput}
            />
            <button onClick={handleAdd} className="btn">
              add
            </button>
          </div>
        </label>

        <p>
          Current genres:{" "}
          {genres.map((i) => (
            <em key={i}>{i}, </em>
          ))}
        </p>

        <button type="submit">Submit</button>
      </form>
      {/* {previewUrl && <img src={previewUrl} alt="Preview" />} */}
      {previewUrls.length > 0 &&
        previewUrls.map((url, index) => (
          <img key={index} src={url} alt={`Preview ${index + 1}`} />
        ))}
    </div>
  );
};

export default UploadImage;

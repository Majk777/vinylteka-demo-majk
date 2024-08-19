import { useState, useEffect, useRef } from "react";
import { useAlbumsContext } from "../../hooks/useAlbumsContext";
import { useNavigate } from "react-router-dom";
import "./Create.css";

const Create = ({ user }) => {
  const { dispatch } = useAlbumsContext();

  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [previewUrls, setPreviewUrls] = useState([]);

  const [bandName, setbandName] = useState("");
  const [albumTitle, setalbumTitle] = useState("");
  const [description, setdescription] = useState("");
  const [label, setlabel] = useState("");
  const [released, setreleased] = useState("");
  const [type, settype] = useState("");
  const [genres, setgenres] = useState([]);
  const [genre, setgenre] = useState("");
  const ingredientInput = useRef(null);
  const [error, setError] = useState(null);

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

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // const userStorage = localStorage.getItem("user");
    const userStorage = JSON.parse(localStorage.getItem("user"));
    // const userStorageJson = JSON.stringify(userStorage);
    console.log(userStorage.user);

    formData.append("username", userStorage.user);
    // formData.append("file", file);
    formData.append("bandName", bandName);
    formData.append("description", description);
    formData.append("albumTitle", albumTitle);
    formData.append("label", label);
    formData.append("released", released);
    formData.append("type", type);
    formData.append("file", file);
    formData.append("file2", file2);
    formData.append("file3", file3);

    genres.forEach((genre) => formData.append("genres[]", genre));
    // formData.append("genres", genres);
    // genres;
    console.log(formData);
    console.log(genres);

    // "http://localhost:4000/api/upload"
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/albums",
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    const responseJson = JSON.stringify(json);

    if (!response.ok) {
      console.log("before mistake");
      setError(json.error);
      console.log(json);

      // console.log(JSON.parse(json));
      console.log(response);
      console.log("after mistake");
    }

    if (response.ok) {
      console.log(json);
      console.log(responseJson);
      dispatch({ type: "CREATE_ALBUM", payload: json });
      navigate("/");
    }
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    // console.log(file, title, description);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = genre.trim();

    if (ing && !genres.includes(ing)) {
      setgenres((prevGenres) => [...prevGenres, genre]);
    }
    setgenre("");
    ingredientInput.current.focus();
  };

  return (
    <div className="create-form-wrapper h-full flex flex-row justify-center my-28 ">
      <form
        onSubmit={onSubmit}
        className="create-form w-10/12 border-l-4 border-black"
      >
        <h1 className="text-6xl py-20 text-center uppercase tracking-tighter font-black">
          Dodaj album
        </h1>
        <label className="create-inputs">
          <span>Nazwa zespołu:</span>
          <input
            className="custom-input"
            placeholder="Uzupełnij..."
            type="text"
            name="name"
            onChange={(e) => setbandName(e.target.value)}
            value={bandName}
            required
          />
        </label>

        <label className="create-inputs">
          <span>Nazwa albumu:</span>
          <input
            className="custom-input"
            placeholder="Uzupełnij..."
            type="text"
            name="name"
            onChange={(e) => setalbumTitle(e.target.value)}
            value={albumTitle}
            required
          />
        </label>

        <label className="create-inputs">
          <span>Opis albumu:</span>
          <textarea
            // className="custom-input"
            placeholder="Uzupełnij..."
            type="text"
            name="name"
            onChange={(e) => setdescription(e.target.value)}
            value={description}
            required
            className="setdescription"
          />
        </label>

        <label className="create-inputs">
          <span>Wytwórnia:</span>
          <input
            className="custom-input"
            placeholder="Uzupełnij..."
            type="text"
            name="name"
            onChange={(e) => setlabel(e.target.value)}
            value={label}
          />
        </label>

        <label className="create-inputs">
          <span>Data wydania:</span>
          <input
            className="custom-input"
            placeholder="Uzupełnij..."
            type="text"
            name="name"
            onChange={(e) => setreleased(e.target.value)}
            value={released}
            required
          />
        </label>

        {/* <label className="create-inputs">
          <span> Typ nośnika:</span>
          <input
            className="custom-input"
            placeholder="Uzupełnij..."
            type="text"
            name="name"
            onChange={(e) => settype(e.target.value)}
            value={type}
            required
          />
        </label> */}

        <label className="create-inputs select-input">
          <span>Typ nośnika:</span>
          <select
            className="custom-input"
            name="type"
            onChange={(e) => settype(e.target.value)}
            value={type}
            required
          >
            <option value="">Wybierz...</option>
            <option value="CD">CD</option>
            <option value="Vinyl">Winyl</option>
            <option value="Kaseta">Kaseta</option>
          </select>
        </label>

        <label className="create-inputs">
          <span>Gatunki:</span>
          <div className="ingredients flex items-center justify-between">
            <input
              className="custom-input"
              placeholder="Uzupełnij..."
              type="text"
              onChange={(e) => setgenre(e.target.value)}
              value={genre}
              ref={ingredientInput}
              // required
            />
            <button onClick={handleAdd} className="btn-add  hover:text-white">
              Dodaj
            </button>
          </div>
        </label>
        <p className="genres-list font-semibold text-right">
          Dodane gatunki:{" "}
          {genres.map((i) => (
            <em key={i}>{i}, </em>
          ))}
        </p>

        <div className="custom-files-wrapper flex flex-row w-full justify-around my-10">
          <div className="custom-file-container">
            {/* <h1>Dodaj okładke płyty </h1> */}
            <input
              type="file"
              name="file"
              id="file"
              onChange={fileForFrontUpload}
              required
              className="hidden"
            />
            <label htmlFor="file" className="custom-file-upload">
              <span>Dodaj okładke płyty{"(Front)"}</span>
            </label>
          </div>

          <div className="custom-file-container">
            {/* <h1>Dodaj tylną okładke płyty</h1> */}
            <input
              type="file"
              name="file2"
              id="file2"
              onChange={fileForBackUpload}
              className="hidden"
            />
            <label htmlFor="file2" className="custom-file-upload ">
              <span>Dodaj okładke płyty{"(Back)"}</span>
            </label>
          </div>

          <div className="custom-file-container">
            {/* <h1>Dodaj zdjęcie zespołu</h1> */}
            <input
              type="file"
              name="file3"
              id="file3"
              onChange={fileForBandPicUpload}
              className="hidden"
            />
            <label htmlFor="file3" className="custom-file-upload">
              <span>Dodaj zdjęcie zespołu</span>
            </label>
          </div>
        </div>

        {/* <div className="custom-file-container">
          <h1>Upload Back Image</h1>
          <input
            type="file"
            name="file2"
            onChange={fileForBackUpload}
            className="border-2 border-black h-24 p-4 hover:bg-black hover:text-white  max-xl:mt-5 w-40"
          />
        </div>

        <div className="custom-file-container">
          <h1>Upload Band Image</h1>
          <input type="file" name="file3" onChange={fileForBandPicUpload} />
        </div> */}

        <button className="  text-4xl max-xl:my-5 w-40 mx-5 my-5">
          Kliknij żeby dodać album
        </button>

        {error && (
          <p className="text-red-600 font-semibold mb-5 text-lg">
            Nie można było dodać albumu !
          </p>
        )}

        {previewUrls.length > 0 &&
          previewUrls.map((url, index) => (
            <img key={index} src={url} alt={`Preview ${index + 1}`} />
          ))}
      </form>
    </div>
  );
};

export default Create;

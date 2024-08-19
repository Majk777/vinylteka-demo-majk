import { useState, useRef } from "react";
import { useAlbumsContext } from "../../hooks/useAlbumsContext";

const Create = () => {
  const { dispatch } = useAlbumsContext();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(
      bandName,
      albumTitle,
      description,
      label,
      released,
      type,
      genres
    );

    const album = {
      bandName,
      albumTitle,
      description,
      label,
      released,
      type,
      genres,
    };

    const response = await fetch("http://localhost:4000/api/albums", {
      method: "POST",
      body: JSON.stringify(album),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      console.log("before mistake");
      setError(json.error);
      console.log(json);

      // console.log(JSON.parse(json));
      console.log(response);
      console.log("after mistake");
    }
    if (response.ok) {
      setError(null);
      setbandName("");
      setalbumTitle("");
      setdescription("");
      setlabel("");
      setreleased("");
      settype("");
      setgenres([]);
      console.log("new recipe added:", album);
      console.log("new recipe-json added:", json);
      dispatch({ type: "CREATE_ALBUM", payload: json });

      // coś nie działa IMPORTOWAĆ TUTAJ HOME !!!!!!!!!!!!!!!!!!!!!!!
    }
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
    <form onSubmit={handleSubmit}>
      <label>
        Name of the band:
        <input
          type="text"
          name="name"
          onChange={(e) => setbandName(e.target.value)}
          value={bandName}
        />
      </label>

      <label>
        albumTitle:
        <input
          type="text"
          name="name"
          onChange={(e) => setalbumTitle(e.target.value)}
          value={albumTitle}
        />
      </label>

      <label>
        description:
        <input
          type="text"
          name="name"
          onChange={(e) => setdescription(e.target.value)}
          value={description}
        />
      </label>

      <label>
        label:
        <input
          type="text"
          name="name"
          onChange={(e) => setlabel(e.target.value)}
          value={label}
        />
      </label>

      <label>
        released:
        <input
          type="text"
          name="name"
          onChange={(e) => setreleased(e.target.value)}
          value={released}
        />
      </label>

      <label>
        type:
        <input
          type="text"
          name="name"
          onChange={(e) => settype(e.target.value)}
          value={type}
        />
      </label>

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

      <button>button</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Create;

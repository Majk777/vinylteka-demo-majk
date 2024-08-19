import React, { useEffect, useState, useRef } from "react";
// import React, { useEffect, useState } from "react";
import AlbumsList from "../../components/AlbumsList";
import { useAlbumsContext } from "../../hooks/useAlbumsContext";
import "./Home.css";
import BackgroundLeftFirst from "./albumCD.jpg";
import BackgroundLeftSecond from "./albumvinyl.jpg";
import BackgroundRight from "./albumkassette.jpg";
import BackgroundSmall from "./aBannerMediaQ.jpg";

const Home = () => {
  // const [albums, setAlbums] = useState(null);
  const { albums, dispatch } = useAlbumsContext();
  const [searchText, setSearchText] = useState("");
  const [filteredAlbums, setFilteredAlbums] = useState(null);

  const [typeOfAlbum, setTypeOfAlbum] = useState(null);

  const nameInput = useRef(null);

  const [toggle, setToggle] = useState(true);

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    console.log(searchText);
  };

  //                   WYSZUKIWARKA                 WYSZUKIWARKA                 WYSZUKIWARKA                 WYSZUKIWARKA
  const handleSearchClick = () => {
    setFilteredAlbums(
      albums.filter((album) =>
        album.bandName.toLowerCase().includes(searchText.toLowerCase())
      )
    );
    setToggle(!toggle);

    nameInput.current.value = "";

    console.log(filteredAlbums);
    console.log(searchText);
    console.log("handleSearchClick", albums);
  };

  //           KATEGORIE             KATEGORIE             KATEGORIE             KATEGORIE             KATEGORIE
  const handleSearchCategory = (e) => {
    console.log(e.target.value);
    setFilteredAlbums(null);
    setTypeOfAlbum(e.target.value);
  };

  //            WYSZUKIWARKA  CLEAN           WYSZUKIWARKA  CLEAN         WYSZUKIWARKA  CLEAN         WYSZUKIWARKA  CLEAN
  const clearFilterAlbums = () => {
    console.log("nullowanko albumów");
    setFilteredAlbums(null);
    setTypeOfAlbum(null);
  };

  useEffect(() => {
    console.log(process.env.REACT_APP_BACKEND_URL);
    const fetchAlbums = async () => {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/albums"
      );
      const json = await response.json();

      if (response.ok) {
        // setAlbums(json);
        console.log(response);
        console.log(json);
        console.log(dispatch);
        if (!typeOfAlbum) {
          dispatch({ type: "GET_ALBUMS", payload: json });
          console.log(typeOfAlbum);
        } else {
          const filteredAlbumsByCategories = json.filter(
            (album) => album.type === typeOfAlbum
          );

          dispatch({ type: "GET_ALBUMS", payload: filteredAlbumsByCategories });
          console.log(typeOfAlbum);
        }

        if (searchText) {
          setTypeOfAlbum(null);
          dispatch({ type: "GET_ALBUMS", payload: filteredAlbums });
          setSearchText("");
        }
      }
      // console.log(albums);
    };
    fetchAlbums();
    // console.log(albums); [dispatch, albums]
  }, [dispatch, typeOfAlbum, filteredAlbums]);

  return (
    <div>
      <div className="wrapper-banner ">
        <div
          className="banner-front-small max-lg:h-full lg:invisible bg-cover"
          style={{
            backgroundImage: `url(${BackgroundSmall})`,
          }}
        ></div>
        <div className="banner-front max-lg:invisible lg:h-0">
          <div className="divleft bg-red-400 h-3/4 w-full relative bg-cover flex flex-row">
            <div
              className="BackgroundLeftFirst h-full w-1/2 bg-cover "
              style={{
                backgroundImage: `url(${BackgroundLeftFirst})`,
              }}
            ></div>
            <div
              className="BackgroundLeftSecond h-full w-1/2 bg-cover "
              style={{
                backgroundImage: `url(${BackgroundLeftSecond})`,
              }}
            ></div>
            <div className="border-div-left z-20 absolute border-black "></div>
          </div>
          <div
            className="divright bg-indigo-400 h-3/4 w-1/2 relative bg-cover"
            style={{
              backgroundImage: `url(${BackgroundRight})`,
            }}
          >
            <div className="border-div-right absolute border-black border-l-2"></div>
          </div>
        </div>
      </div>

      <div className="description-home flex flex-row justify-center ">
        <div className="w-11/12 border-t-2 border-black">
          <h1 className="text-7xl max-lg:text-5xl font-bold tracking-tighter leading-tight uppercase font-helvetica ">
            Podziel się z innymi swoją audioteką
          </h1>
        </div>
      </div>

      <div className="typeofalbum flex flex-row justify-around my-20 mx-5">
        {/* tutaj wyszukiwarka */}
        <div className="search ">
          {!filteredAlbums && (
            <div className="filteredFalse">
              <input
                type="text"
                placeholder="Szukaj zespołu..."
                value={searchText}
                onChange={handleInputChange}
                className="search-input p-2 border-2  "
                ref={nameInput}
              />
              <button
                onClick={handleSearchClick}
                className="p-2 bg-black  text-white mt-2 ml-2"
              >
                {/* {toggle ? "Szukaj" : "Wyczyść wyniki"} */}
                {/* Szukaj */}
                Szukaj
              </button>
            </div>
          )}
          {filteredAlbums && (
            <button
              onClick={clearFilterAlbums}
              className="p-2 bg-black  text-white  ml-2"
            >
              Wyczyść wyniki
            </button>
          )}
        </div>
        <div className="typewrapper">
          <button
            value={"Vinyl"}
            onClick={handleSearchCategory}
            className={`mr-2 ${
              typeOfAlbum === "Vinyl" ? "bg-black  text-amber-50" : ""
            }`}
          >
            Vinyl
          </button>
          <button
            value={"CD"}
            onClick={handleSearchCategory}
            className={`mr-2 ${
              typeOfAlbum === "CD" ? "bg-black  text-amber-50" : ""
            }`}
          >
            CD
          </button>
          <button
            value={"Kaseta"}
            onClick={handleSearchCategory}
            className={`mr-2 ${
              typeOfAlbum === "cassette" ? "bg-black  text-amber-50" : ""
            } mt-2`}
          >
            Kaseta
          </button>
          {typeOfAlbum && (
            <button
              value={null}
              onClick={clearFilterAlbums}
              className="bg-black text-amber-50  px-1 text-center"
            >
              X
            </button>
          )}
        </div>
      </div>

      <div className=" flex flex-row basis-5/6 justify-self-center justify-center mt-6">
        <div className="containerGrid gap-2">
          {/* Home */}
          {!albums && <h1>no results</h1>}
          {/* <div className="flex flex-row"> przed zmianą  */}

          {albums &&
            albums.map((album) => {
              return <AlbumsList album={album} key={album._id} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;

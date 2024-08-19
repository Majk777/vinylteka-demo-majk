// import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAlbumsContext } from "../hooks/useAlbumsContext";
import "./AlbumsList.css";

const AlbumsList = ({ album }) => {
  const { dispatch } = useAlbumsContext();

  const deleteAlbum = async () => {
    const response = await fetch(
      `http://localhost:4000/api/albums/${album._id}`,
      { method: "DELETE" }
    );

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_ALBUM", payload: json });
    }

    console.log(response);
    console.log(response._id);
    console.log("ju ar gołing tu dilit album");
    console.log(album._id);
  };
  return (
    <div className="parentDiv  flex flex-row relative my-2 ">
      <div
        // className="frontDiv bg-red-500 z-10 bg-no-repeat bg-cover grayscale  hover:grayscale-0 "
        className="frontDiv bg-red-500 z-10 bg-no-repeat bg-cover   hover:hue-rotate-15"
        style={{
          backgroundImage: `url(${album.imageUrlFront})`,
        }}
      ></div>
      <Link to={`albums/${album._id}`}>
        <div
          className="backDiv  bg-green-500 rounded-full bg-no-repeat absolute right-1/2 bg-cover transition-transform duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${album.imageUrlFront})`,
          }}
        ></div>
      </Link>
      <div className="content  ml-auto text-right uppercase font-bold tracking-tight flex flex-col justify-around ">
        <p className="border-album-paragraph border-t-2 border-black">
          {album.bandName}
        </p>
        <button onClick={deleteAlbum}>Usuwanko buttonik</button>
        <p className="border-album-paragraph  border-b-2 border-black">
          {album.albumTitle}
        </p>
      </div>
    </div>
    // <div className="album bg-gray-400 mx-4">
    //   <h1>{album.bandName}</h1>
    //   <Link to={`albums/${album._id}`}>Zobacz więcej</Link>
    //   <button onClick={deleteAlbum}>Usuwanko buttonik</button>
    // </div>
  );
};

export default AlbumsList;

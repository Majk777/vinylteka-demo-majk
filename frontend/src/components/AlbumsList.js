import { Link } from "react-router-dom";

import "./AlbumsList.css";

const AlbumsList = ({ album }) => {
  return (
    <div className="parentDiv  flex flex-row relative my-2 ">
      <div
        className="frontDiv bg-red-500 z-10 bg-no-repeat bg-cover   hover:hue-rotate-15"
        style={{
          backgroundImage: `url(${encodeURI(album.imageUrlFront)})`,
        }}
      ></div>
      <Link to={`albums/${album._id}`}>
        <div
          className="backDiv  bg-green-500 rounded-full bg-no-repeat absolute right-1/2 bg-cover transition-transform duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${encodeURI(album.imageUrlFront)})`,
          }}
        ></div>
      </Link>
      <div className="content  ml-auto text-right uppercase font-bold tracking-tight flex flex-col justify-around ">
        <p className="border-album-paragraph border-t-2 border-black">
          {album.bandName}
        </p>
        <Link to={`albums/${album._id}`}>
          <button>Zobacz więcej</button>
        </Link>

        <p className="border-album-paragraph  border-b-2 border-black">
          {album.albumTitle}
        </p>
      </div>
    </div>
  );
};

export default AlbumsList;

import React, { useEffect, useState, useRef } from "react";
import { useAlbumsContext } from "../../hooks/useAlbumsContext";
import { useParams } from "react-router-dom";
import "./Album.css";
import { useUserContext } from "../../hooks/useUserContext";

const Album = () => {
  const { user } = useUserContext();
  const [error, setError] = useState("");
  const [bandFontSize, setBandFontSize] = useState(9);
  const [albumComment, setalbumComment] = useState("");
  const [commentss, setComments] = useState([]);

  const bandNameRef = useRef(null);
  const descWrapperRef = useRef(null);
  const { album, dispatch } = useAlbumsContext();
  const { id } = useParams();

  useEffect(() => {
    const fetchAlbum = async () => {
      const response = await fetch(`http://localhost:4000/api/albums/${id}`);
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "GET_ALBUM", payload: json });
        setComments(json.comments);
      } else {
        setError(error);
      }
    };
    fetchAlbum();
  }, [dispatch, id, error]);

  useEffect(() => {
    if (album && album.bandName) {
      if (album.bandName.length === 5) {
        setBandFontSize(8);
      } else if (album.bandName.length === 6) {
        setBandFontSize(7);
      } else if (album.bandName.length === 7) {
        setBandFontSize(6);
      } else if (album.bandName.length === 8) {
        setBandFontSize(5);
      } else if (album.bandName.length === 9) {
        setBandFontSize(4);
      } else if (album.bandName.length === 10) {
        setBandFontSize(3);
      } else if (album.bandName.length > 10) {
        setBandFontSize(2);
      } else {
      }
    }
  }, [album]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    let usernameCommenting = user.user;

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/albums/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ usernameCommenting, comment: albumComment }),
      }
    );
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      dispatch({ type: "UPDATE_ALBUM", payload: json });
      setalbumComment("");
      setComments(json.comments);
      setError("");
    }
  };

  const sortedComments = commentss.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="h-full">
      {album && (
        <div
          className="wrapper-album pb-48 mb-12 h-full relative"
          key={album._id}
        >
          <h1
            className={`max-lg:hidden font-bold tracking-widest text-9xl uppercase bandName `}
            style={{
              fontSize: `${bandFontSize}rem`,
            }}
            ref={bandNameRef}
          >
            {album.bandName}
          </h1>

          <div className="Bcircles my-20 h-96 ">
            <div
              className="bgCircle bg-white bg-cover"
              style={{
                backgroundImage: `url(${encodeURI(album.imageUrlFront)})`,
              }}
            ></div>
            <div className="c-one circle "></div>
            <div className="c-two circle"></div>
            <div className="c-three circle"></div>
          </div>

          <div className="data-wrapper mt-12 mb-12 flex flex-row max-md:flex-col justify-center content-end max-md:content-center">
            <div
              className="desc-wrapper w-1/5 max-lg:w-1/2 max-md:w-11/12 max-md:pr-10 mr-10 ml-10 self-start "
              ref={descWrapperRef}
            >
              <p className="leading-8">{album.description}</p>
            </div>
            <div className="tags-wrapper w-2/5 md:self-end font-bold text-2xl uppercase mr-10  max-md:w-11/12 max-md:pr-10 ml-10">
              <p className="text-right">{album.bandName}</p>
              <p className="text-right">{album.albumTitle}</p>
              <p>Wytwórnia: {album.label}</p>
              <p>Data wydania: {album.released}</p>
              <div className="genres">
                Gatunki:
                {album.genres.map((genre, index) => (
                  <p key={index}>{genre}</p>
                ))}
              </div>

              <p>Typ nośnika: {album.type}</p>
              <p>Użytkownik: {album.username}</p>
            </div>
          </div>

          <div className="band-images flex flex-row justify-center my-20">
            <div className="band-pics-container w-1/2 flex flex-col">
              <div className="single-pic-wrapper flex flex-row">
                <img
                  src={album.imageUrlFront}
                  alt="imgfront"
                  className="img-proportions"
                />
                <h1 className="pic-description">Front</h1>
              </div>

              {album.imageUrlBack && (
                <div className="single-pic-wrapper flex flex-row">
                  <img
                    src={album.imageUrlBack}
                    alt="imgfront"
                    className="img-proportions"
                  />
                  <h1 className="pic-description">Back</h1>
                </div>
              )}

              {album.imageUrlBandPic && (
                <div className="single-pic-wrapper flex flex-row">
                  <img
                    src={album.imageUrlBandPic}
                    alt="imgfront"
                    className="img-proportions"
                  />
                  <h1 className="pic-description">Foto</h1>
                </div>
              )}
            </div>
          </div>
          <div className="comment-wrapper flex flex-row justify-center ">
            <div className="comment-section max-lg:w-3/4 ">
              {error && (
                <p className="text-center mb-2 text-red-600 font-semibold ">
                  {error}
                </p>
              )}
              <form
                onSubmit={handleUpdate}
                className=" flex flex-row justify-evenly items-center max-xl:flex-col "
              >
                <textarea
                  className="w-3/4 h-32 lg:w-96 lg:h-64 resize-none comment-placeholder mx-10"
                  type="text"
                  id="album-comment"
                  value={albumComment}
                  placeholder="Zostaw komentarz"
                  onChange={(e) => setalbumComment(e.target.value)}
                  required
                />

                <button type="submit" className=" text-3xl    max-xl:mt-5">
                  Dodaj <br /> komentarz
                </button>
              </form>
              <div>
                {sortedComments.map((comment) => {
                  return (
                    <div
                      key={comment._id}
                      className="p-8 w-full border-b-2 border-black"
                    >
                      <p className="text-2xl uppercase">
                        {comment.usernameCommenting}
                      </p>
                      <p>{comment.comment}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Album;

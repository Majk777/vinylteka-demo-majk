import React, { useEffect, useState, useRef } from "react";
import { useAlbumsContext } from "../../hooks/useAlbumsContext";
import { json, useParams } from "react-router-dom";
// import './App.css';
import "./Album.css";
import { useUserContext } from "../../hooks/useUserContext";

const Album = () => {
  const { user } = useUserContext();
  const [error, setError] = useState("");
  const [front, setfront] = useState(
    "https://ia903409.us.archive.org/24/items/mbid-04c77734-4d5c-4b91-bd0d-27be62f2e67b/mbid-04c77734-4d5c-4b91-bd0d-27be62f2e67b-29091115463_thumb500.jpg"
  );
  const [back, setback] = useState(
    "https://ia803409.us.archive.org/24/items/mbid-04c77734-4d5c-4b91-bd0d-27be62f2e67b/mbid-04c77734-4d5c-4b91-bd0d-27be62f2e67b-29091117332.jpg"
  );
  const [pic, setpic] = useState(
    "https://ia803409.us.archive.org/24/items/mbid-04c77734-4d5c-4b91-bd0d-27be62f2e67b/mbid-04c77734-4d5c-4b91-bd0d-27be62f2e67b-29091117332.jpg"
  );

  const [testNam, setTestNam] = useState("korn5678910");
  const [bandFontSize, setBandFontSize] = useState(9);
  // const [isFixed, setIsFixed] = useState(true);

  const [albumComment, setalbumComment] = useState("");
  // const [usernameCommenting, setusernameCommenting] = useState("");

  const [albumData, setAlbumData] = useState({
    bandName: "",
    albumTitle: "",
    description: "",
    label: "",
    released: "",
    imageUrlFront: "",
    imageUrlBack: "",
    imageUrlBandPic: "",
    genres: [],
    type: "",
  });

  // Create a reference to the h1 element
  const bandNameRef = useRef(null);
  const descWrapperRef = useRef(null);
  const { album, dispatch } = useAlbumsContext();
  const { id } = useParams();

  useEffect(() => {
    const fetchAlbum = async () => {
      const response = await fetch(`http://localhost:4000/api/albums/${id}`);
      const json = await response.json();
      console.log(response);
      console.log(json);

      // setAlbumData(json);

      if (response.ok) {
        dispatch({ type: "GET_ALBUM", payload: json });
      } else {
        setError(error);
      }
    };
    fetchAlbum();
  }, [dispatch, id, error]);

  useEffect(() => {
    if (album && album.bandName) {
      console.log(`Liczba znaków w bandName: ${album.bandName.length}`);
      if (album.bandName.length === 5) {
        console.log("the number is bigger than 5");
        setBandFontSize(8);
      } else if (album.bandName.length === 6) {
        setBandFontSize(7);
        console.log("the number is 6");
      } else if (album.bandName.length === 7) {
        setBandFontSize(6);
        console.log("the number is smaller than 5");
      } else if (album.bandName.length === 8) {
        setBandFontSize(5);
        console.log("the number is smaller than 5");
      } else if (album.bandName.length === 9) {
        console.log("the number is smaller than 5");
        setBandFontSize(4);
      } else if (album.bandName.length === 10) {
        console.log("the number is smaller than 5");
        setBandFontSize(3);
      } else if (album.bandName.length > 10) {
        console.log("the number is smaller than 5");
        setBandFontSize(2);
      } else {
        console.log("strange number");
      }
    }
  }, [album]);

  // useEffect(() => {
  //   setusernameCommenting(user.user);
  //   console.log(usernameCommenting);
  // }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlbumData({ ...albumData, [name]: value });
  };

  const handleGenresChange = (e) => {
    const { value } = e.target;
    setAlbumData({ ...albumData, genres: value.split(",") });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(user.token);
    // console.log(albumData);
    console.log(id);
    let usernameCommenting = user.user;
    // setusernameCommenting(username);
    // console.log(usernameCommenting);
    console.log(user.token);
    console.log("username is declared with let", usernameCommenting);

    const updatedData = { username: "josh", comment: albumComment };
    console.log(updatedData);

    const response = await fetch(
      // `${process.env.REACT_BACKEND_URL}/albums/${id}`,

      `${process.env.REACT_APP_BACKEND_URL}/albums/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        // body: JSON.stringify({
        //   usernameCommenting: username,
        //   comment: albumComment,
        // }),
        body: JSON.stringify({ usernameCommenting, comment: albumComment }),
      }
    );
    const json = await response.json();
    if (response.ok) {
      console.log("Album updated successfully:", json);
    } else {
      console.error("Failed to update album:", json.error);
    }
  };

  // return <div>Wykonawca: {album && <p>{album.bandName}</p>} </div>;
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
            {/* {testNam} */}
          </h1>

          <div class="Bcircles my-20 h-96 ">
            <div
              className="bgCircle bg-white bg-cover"
              style={{
                backgroundImage: `url(${album.imageUrlFront})`,
              }}
            ></div>
            <div class="c-one circle "></div>
            <div class="c-two circle"></div>
            <div class="c-three circle"></div>
          </div>

          <div className="data-wrapper mt-12 mb-12 flex flex-row max-md:flex-col justify-center content-end max-md:content-center">
            <div
              className="desc-wrapper w-1/5 max-lg:w-1/2 max-md:w-11/12 max-md:pr-10 mr-10 ml-10 self-start "
              ref={descWrapperRef}
            >
              {/* <p>description: {album.description}</p> */}
              <p className="leading-8">{album.description}</p>
            </div>
            <div className="tags-wrapper w-2/5 md:self-end font-bold text-2xl uppercase mr-10  max-md:w-11/12 max-md:pr-10 ml-10">
              {/* <h1 className="font-bold tracking-widest text-2xl uppercase ">
                {album.albumTitle}
              </h1> */}
              <p className="text-right">{album.bandName}</p>
              <p className="text-right">{album.albumTitle}</p>
              {/* <button onClick={getToken}>token get</button> */}
              {/* <p>description: {album.description}</p> */}
              <p>Wytwórnia: {album.label}</p>
              <p>Data wydania: {album.released}</p>
              <div className="genres">
                Gatunki:
                {album.genres.map((genre, index) => (
                  <p key={index}>{genre}</p>
                ))}
              </div>

              <p>Typ nośnika: {album.type}</p>
              <p>użytkownik: {album.username}</p>
              {/* <img alt="imgfromMGdb" src={album.imageUrlFront}></img>
              <img alt="imgfromMGdb" src={album.imageUrlBack}></img>
              <img alt="imgfromMGdb" src={album.imageUrlBandPic}></img> */}
            </div>
          </div>
          {/* <div className="footer h-12 bg-black bottom-1.5 mb-10  w-full"></div> */}
          <div className="band-images flex flex-row justify-center my-20">
            {/* imageUrlBack, imageUrlBandPic */}
            <div className="band-pics-container w-1/2 flex flex-col">
              {/* <div className="flex flex-row"> */}

              <div className="single-pic-wrapper flex flex-row">
                <img
                  src={album.imageUrlFront}
                  alt="imgfront"
                  className="img-proportions"
                  // className="max-lg:max-w-2xl"
                />
                <h1 className="pic-description">Front</h1>
              </div>

              {album.imageUrlBack && (
                <div className="single-pic-wrapper flex flex-row">
                  <img
                    src={album.imageUrlBack}
                    alt="imgfront"
                    className="img-proportions"
                    // className="max-lg:max-w-2xl"
                  />
                  <h1 className="pic-description">Back</h1>
                </div>
              )}

              {album.imageUrlBandPic && (
                <div className="single-pic-wrapper flex flex-row">
                  <img
                    src={album.imageUrlBandPic}
                    alt="imgfront"
                    // className="max-lg:max-w-2xl"
                    className="img-proportions"
                  />
                  <h1 className="pic-description">Foto</h1>
                </div>
              )}

              {/* <div className="single-pic-wrapper flex flex-row">
                <img src={album.imageUrlFront} alt="imgfront" />
                <div>
                  <span>Front</span>
                </div>
              </div>

              <div className="single-pic-wrapper flex flex-row">
                <img src={album.imageUrlFront} alt="imgfront" />
                <h1 className="pic-description">Front</h1>
              </div>

              <div className="single-pic-wrapper flex flex-row">
                <img src={album.imageUrlBack} alt="imgfront" />
                <div>
                  <span>Back</span>
                </div>
              </div>

              <div className="single-pic-wrapper ">
                <h1>Foto</h1>
                <img src={album.imageUrlBandPic} alt="imgfront" />
              </div> */}

              {/* <img src={album.imageUrlBack} alt="imgfront" />
              <img src={album.imageUrlBandPic} alt="imgfront" /> */}
            </div>
          </div>
          <div className="comment-wrapper flex flex-row justify-center ">
            <div className="comment-section max-lg:w-3/4 ">
              {" "}
              <form
                onSubmit={handleUpdate}
                className=" flex flex-row justify-evenly items-center max-xl:flex-col "
              >
                {/* <label htmlFor="album-title">Twój komentarz:</label> */}
                {/* <input
                  className="mb-5"
                  type="text"
                  id="album-comment"
                  value={albumComment}
                  placeholder="Zostaw komentarz"
                  onChange={(e) => setalbumComment(e.target.value)}
                  required
                /> */}
                <textarea
                  className="w-3/4 h-32 lg:w-96 lg:h-64 resize-none comment-placeholder mx-10"
                  type="text"
                  id="album-comment"
                  value={albumComment}
                  placeholder="Zostaw komentarz"
                  onChange={(e) => setalbumComment(e.target.value)}
                  required
                />

                <button
                  type="submit"
                  // className="border-2 border-black h-24 p-4 hover:bg-black hover:text-white  max-xl:mt-5"
                  className=" text-3xl hover:bg-black hover:text-white  max-xl:mt-5"
                >
                  Dodaj <br /> komentarz
                </button>
              </form>
              <div>
                {album.comments &&
                  album.comments.map((comment) => {
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
                {album.comments.map((comment) => {
                  <p>lol</p>;
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

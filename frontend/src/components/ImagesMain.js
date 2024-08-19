import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ImagesMain.css";

const ImagesMain = () => {
  const [metaData, setMetaData] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch("http://localhost:4000/api/albums");
      const json = await response.json();

      if (response.ok) {
        setMetaData(json);
      }
    };
    fetchImages();
  }, []);

  return (
    <div>
      ImagesMain
      {!metaData && <p>no results from fetch</p>}
      {/* <div className="flex flex-row"> */}
      <div
        className="containerGrid"
        // style={{grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));}}
      >
        {metaData &&
          //   metaData.map((data) => <p key={data._id}>{data.username}</p>)}
          // imageUrlBandPic
          metaData.map((data) => (
            <div className="parentDiv  flex flex-row relative" key={data._id}>
              <div
                className="frontDiv bg-red-500 z-10 bg-no-repeat bg-cover"
                style={{
                  backgroundImage: `url(http://coverartarchive.org/release/f268b8bc-2768-426b-901b-c7966e76de29/12750224075-250.jpg)`,
                }}
              ></div>

              <div
                className="backDiv bg-green-500 rounded-full bg-no-repeat absolute right-1/2 bg-cover transition-transform duration-1000 ease-in-out"
                style={{
                  backgroundImage: `url(http://coverartarchive.org/release/f268b8bc-2768-426b-901b-c7966e76de29/12750224075-250.jpg)`,
                }}
              ></div>
              <div className="content">place for content</div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default ImagesMain;
{
  /* <Link to={`albums/${album._id}`}>Zobacz więcej</Link> */
}

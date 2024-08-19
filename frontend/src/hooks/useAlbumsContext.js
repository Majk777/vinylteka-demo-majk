import { AlbumContext } from "../context/AlbumContext";
import { useContext } from "react";

export const useAlbumsContext = () => {
  const context = useContext(AlbumContext);

  if (!context) {
    throw Error(
      "useAlbumsContext must be used inside an AlbumsContextProvider"
    );
  }

  return context;
};

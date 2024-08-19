import { createContext, useReducer } from "react";

export const AlbumContext = createContext();

export const albumReducer = (state, action) => {
  switch (action.type) {
    case "GET_ALBUM": {
      console.log(state);
      console.log(action);
      return {
        album: action.payload,
      };
    }
    case "GET_ALBUMS": {
      console.log(state);
      console.log(action);
      return {
        albums: action.payload,
      };
    }
    case "CREATE_ALBUM": {
      console.log(state);
      console.log(action);
      return {
        albums: [action.payload, { ...state.albums }],
      };
    }
    case "DELETE_ALBUM": {
      console.log(state);
      console.log(action);
      return {
        albums: state.albums.filter((w) => w._id !== action.payload._id),
      };
      // const updatedAlbums = state.albums.filter(
      //   (album) => album._id !== action.payload
      // );
      // return {
      //   albums: updatedAlbums,
      //   album: null,
      // };
    }
    default:
      return state;
  }
};

export const AlbumContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(albumReducer, {
    // album: null,
    // albums: [],
    albums: null,
  });

  return (
    // value={{ ...state, dispatch } czemu ... spytać chatgpt
    <AlbumContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AlbumContext.Provider>
  );
};

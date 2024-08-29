import { createContext, useReducer } from "react";

export const AlbumContext = createContext();

export const albumReducer = (state, action) => {
  switch (action.type) {
    case "GET_ALBUM": {
      return {
        album: action.payload,
      };
    }
    case "GET_ALBUMS": {
      return {
        albums: action.payload,
      };
    }
    case "CREATE_ALBUM": {
      return {
        albums: [action.payload, { ...state.albums }],
      };
    }
    case "DELETE_ALBUM": {
      return {
        albums: state.albums.filter((w) => w._id !== action.payload._id),
      };
    }
    // case "UPDATE_ALBUM": {
    //   return {
    //     albums: state.albums.map((album) =>
    //       album._id === action.payload._id ? action.payload : album
    //     ),
    //   };
    // }
    case "UPDATE_ALBUM": {
      if (state.albums) {
        return {
          albums: state.albums.map((album) =>
            album._id === action.payload._id ? action.payload : album
          ),
        };
      } else {
        return state;
      }
    }
    default:
      return state;
  }
};

export const AlbumContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(albumReducer, {
    // albums: null,
    albums: [],
  });

  return (
    <AlbumContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AlbumContext.Provider>
  );
};

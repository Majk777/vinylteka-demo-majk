import { createContext, useReducer, useEffect } from "react";

export const UserContext = createContext();

export const userReducer = (state, action) => {
  switch (action.type) {
    case "SIGNUP": {
      return {
        users: [action.payload, { ...state.users }],
      };
    }
    case "LOGIN": {
      return { user: action.payload };
    }
    case "LOGOUT": {
      return {
        user: null,
      };
    }
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    users: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  console.log("state of user is" + state);
  console.log("AuthContext state:", state);
  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

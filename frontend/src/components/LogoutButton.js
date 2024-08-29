import React from "react";
import { useUserContext } from "../hooks/useUserContext";

const LogoutButton = () => {
  const { dispatch } = useUserContext();

  const logoutHandler = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
  };

  return (
    <button onClick={logoutHandler} className="ml-2">
      Wyloguj
    </button>
  );
};

export default LogoutButton;

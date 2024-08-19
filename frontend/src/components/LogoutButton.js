import React from "react";
import { useUserContext } from "../hooks/useUserContext";

const LogoutButton = () => {
  const { dispatch } = useUserContext();

  const logoutHandler = () => {
    console.log("logout");
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
  };

  return <button onClick={logoutHandler}>Logout</button>;
};

export default LogoutButton;

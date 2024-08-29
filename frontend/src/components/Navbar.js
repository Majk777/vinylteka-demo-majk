import { Link } from "react-router-dom";
import React from "react";
import { ReactComponent as MySVG } from "./Vinylteka.svg";
import { useUserContext } from "../hooks/useUserContext";
import UserNav from "./UserNav";
import "./Navbar.css";

export default function Navbar() {
  const { user } = useUserContext();

  return (
    <header className="flex flex-row justify-center ">
      <div className="border-b-2 border-black w-11/12 p-4 flex flex-row items-center shrink-0 justify-between">
        <Link to="/" className="inline-block">
          <MySVG className="svg-icon" />
        </Link>
        {!user && (
          <div className="logins bg-black text-amber-50">
            <Link to="/signup" className="inline-block mr-2">
              Rejestracja
            </Link>
            <Link to="/login" className="inline-block">
              Login
            </Link>
          </div>
        )}

        {user && <UserNav user={user} />}
      </div>
    </header>
  );
}

import { Link } from "react-router-dom";
import React from "react";
import LogoutButton from "./LogoutButton";

export default function UserNav({ user }) {
  return (
    <div className="inline-block">
      <p className="inline-block font-bold uppercase text-right w-full">
        {user.user}
      </p>
      <div className="bg-black text-amber-50">
        <Link to="/create" className="create-button h-full mr-2">
          Dodaj Album
        </Link>

        <LogoutButton />
      </div>
    </div>
  );
}

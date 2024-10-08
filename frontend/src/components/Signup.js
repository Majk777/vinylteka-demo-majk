import React, { useState } from "react";
import { useUserContext } from "../hooks/useUserContext";

const Signup = () => {
  const { dispatch } = useUserContext();

  const [userName, setuserName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [comparePassword, setcomparePassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();

    setError(null);

    if (!userName || !password || !comparePassword || !email) {
      setError("Uzupełnij wszystkie pola!");
      return;
    }

    if (password === comparePassword) {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/signup`,
        {
          method: "POST",
          body: JSON.stringify({ email, password, userName }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      }

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(json));
        dispatch({ type: "LOGIN", payload: json });
      }
    } else {
      setError("Hasła do siebie nie pasują");
    }
  };

  return (
    <div className="signup-wrapper  h-screen bg-cover bg-[url('https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?q=80&w=1626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
      <div className="signup-container flex flex-row content-center justify-center ">
        <form
          onSubmit={handleSignup}
          className="signup-form flex flex-col  items-center my-20 mx-10 py-20 bg-red-500 backdrop-blur-sm"
        >
          <label className=" ">{/* <span>Nazwa użytkownika</span> */}</label>
          <h1 className="text-center text-4xl font-semibold tracking-widest ">
            Zarejestruj się
          </h1>
          <input
            placeholder="Nazwa użytkownika"
            type="text"
            name="name"
            onChange={(e) => setuserName(e.target.value)}
            value={userName}
            className="signup-form-inputs ml-2  w-1/2 bg-white  opacity-100"
          />

          <input
            placeholder="Email"
            type="text"
            name="name"
            onChange={(e) => setemail(e.target.value)}
            value={email}
            className="ml-2 w-1/2 "
          />

          <input
            placeholder="Hasło"
            type="password"
            name="name"
            onChange={(e) => setpassword(e.target.value)}
            value={password}
            className="ml-2 w-1/2 "
          />

          <input
            placeholder="Powtórz hasło"
            type="password"
            name="name"
            onChange={(e) => setcomparePassword(e.target.value)}
            value={comparePassword}
            className="ml-2 w-1/2 "
          />

          <button className="mt-4">Zarejestruj się</button>
          {error && <p className="text-red-600 font-medium my-5">{error}</p>}
        </form>
      </div>
    </div>
  );
};
export default Signup;

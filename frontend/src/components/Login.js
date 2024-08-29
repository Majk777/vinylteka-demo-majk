import React, { useState } from "react";
import { useUserContext } from "../hooks/useUserContext";

const Login = () => {
  const { dispatch } = useUserContext();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [comparePassword, setcomparePassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError(null);

    const userLogin = {
      email,
      password,
    };

    if (!email || !password || !comparePassword) {
      setError("Uzupełnij wszystkie pola");

      return;
    }

    if (password === comparePassword) {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/login`,
        {
          method: "POST",
          body: JSON.stringify(userLogin),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json();

      if (!response.ok) {
        setError("Bład logowania");
        return;
      }

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(json));
        dispatch({ type: "LOGIN", payload: json });
      }
    } else {
      setError("passwords dont match");
    }
  };

  return (
    <div className="signup-wrapper  h-screen bg-cover bg-[url('https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?q=80&w=1626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
      <div className="signup-container flex flex-row content-center justify-center ">
        <form
          onSubmit={handleLogin}
          className="signup-form flex flex-col  items-center my-20 mx-10 py-20 bg-red-500 backdrop-blur-sm"
        >
          <h1 className="text-center text-4xl font-semibold tracking-widest ">
            Zaloguj się
          </h1>
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

          <button className="mt-4">Zaloguj się</button>
          {error && <p className="mt-5 text-red-600 font-medium">{error}!</p>}
        </form>
      </div>
    </div>
  );
};
export default Login;

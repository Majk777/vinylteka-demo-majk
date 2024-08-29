import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/home/Home";
import Create from "./pages/create/Create";
import Album from "./pages/album/Album";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useUserContext } from "./hooks/useUserContext";
import Footer from "./components/Footer";

function App() {
  const { user } = useUserContext();
  return (
    <div className="App ">
      <BrowserRouter>
        <Navbar />
        <div className="pages ">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/albums/:id" element={<Album />} />

            <Route
              path="create"
              element={!user ? <Navigate to="/" /> : <Create user={user} />}
            />

            <Route
              path="signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

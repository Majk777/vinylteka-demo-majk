import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
// import Search from "./pages/search/Search";
import Create from "./pages/create/Create";
import Album from "./pages/album/Album";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useUserContext } from "./hooks/useUserContext";
import UploadImage from "./components/UploadImage";
import ImagesMain from "./components/ImagesMain";
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

            <Route path="image" element={<UploadImage />} />
            <Route path="images" element={<ImagesMain />} />

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
            {/* <Route path="*" element={} /> */}
          </Routes>
        </div>
        {/* <div className="footer h-32 bg-black bottom-1.5 mb-10  w-full"></div> */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

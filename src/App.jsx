import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CreateBlogs from "./pages/CreateBlogs";
import Welcome from "./pages/Welcome";
import Details from "./Details";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Footer from "./components/Footer";
import SignUp from "./pages/SignUp";
import Bookmarked from "./pages/Bookmarked";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />

        <Route path="/blogs" element={<Home />} />

        <Route
          path="/createblogs"
          element={
            <ProtectedRoutes>
              <CreateBlogs />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/blogs/:id"
          element={
            <ProtectedRoutes>
              <Details />
            </ProtectedRoutes>
          }
        />

        <Route path="/login" element={<Login />} />   
        <Route path="/SignUp" element={<SignUp/>}/>
         <Route path="/bookmarked" element={<Bookmarked/>}/>
      </Routes>
   
      <Footer/>
    </BrowserRouter>
  );
}

export default App;

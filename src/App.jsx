import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CreateBlogs from "./pages/CreateBlogs";
import Welcome from "./pages/Welcome";
import Details from "./Details";
import Login from './pages/Login'
function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
           <Route path="/" element={<Welcome/>} />

        <Route path="/Blogs" element={<Home />} />

        <Route path="/CreateBlogs" element={<CreateBlogs />} />

        <Route path="/blogs/:id" element={<Details />} />
        
        
        <Route path="/Login" element={<Login />} />
      </Routes>
    </HashRouter>
  );
}

export default App;

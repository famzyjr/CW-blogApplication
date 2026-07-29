import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CreateBlogs from "./components/CreateBlogs";
import Welcome from "./components/Welcome";
import Details from "./Details";
function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
           <Route path="/" element={<Welcome/>} />

        <Route path="/home" element={<Home />} />

        <Route path="/CreateBlogs" element={<CreateBlogs />} />

        <Route path="/blogs/:id" element={<Details />} />
        
      </Routes>
    </HashRouter>
  );
}

export default App;

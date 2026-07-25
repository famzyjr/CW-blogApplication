import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CreateBlogs from "./components/CreateBlogs";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
       <Routes>
        <Route path="/CreateBlogs" element={<CreateBlogs/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

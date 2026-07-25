import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CreateBlogs from "./components/CreateBlogs";
import Details from "./Details";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/Home" element={<Home />} />

        <Route path="/CreateBlogs" element={<CreateBlogs />} />

        <Route path="/blogs/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

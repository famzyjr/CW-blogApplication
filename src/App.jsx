import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CreateBlogs from "./components/CreateBlogs";
import Details from "./Details";
function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />

        <Route path="/CreateBlogs" element={<CreateBlogs />} />

        <Route path="/blogs/:id" element={<Details />} />
      </Routes>
    </HashRouter>
  );
}

export default App;

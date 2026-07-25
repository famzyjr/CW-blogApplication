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
        <Route path="/" element={<Home />} />
      </Routes>
       <Routes>
        <Route path="/CreateBlogs" element={<CreateBlogs/>} />
      </Routes>
      <Routes>
            <Route path="/blogs/:id" element={<Details/>}/>
          </Routes>
    </BrowserRouter>
  );
}

export default App;

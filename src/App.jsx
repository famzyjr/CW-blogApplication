import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CreateBlogs from "./pages/CreateBlogs";
import Welcome from "./pages/Welcome";
import Details from "./Details";
import Login from './pages/Login'
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
           <Route path="/" element={<Welcome/>} />

        <Route path="/blogs" element={<Home />} />

        <Route path="/createblogs" element={<CreateBlogs />} />

        <Route path="/blogs/:id" element={<Details />} />
        
        
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

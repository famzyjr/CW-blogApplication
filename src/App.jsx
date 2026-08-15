import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CreateBlogs from "./pages/CreateBlogs";
import Welcome from "./pages/Welcome";
import Details from "./Details";
import Login from './pages/Login'
import ProtectedRoutes from "./components/ProtectedRoutes";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
           <Route path="/" element={<Welcome/>} />

        <Route path="/blogs" element={
         
        <ProtectedRoutes>
              <Home />
         
        </ProtectedRoutes>
        } />

        <Route path="/createblogs" element={
          <ProtectedRoutes>
            <CreateBlogs />
          </ProtectedRoutes>
        } />

        <Route path="/blogs/:id" element={
          <ProtectedRoutes>
            <Details />
          </ProtectedRoutes>
        } />
        
        
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

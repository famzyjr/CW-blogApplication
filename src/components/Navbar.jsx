import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <div className="s">
        <nav>
         <Link to='/'> <h2>IBlog</h2></Link>
          <ul>
            <Link to="/Home">
              Home
            </Link>
            <Link className="create-btn" to="/CreateBlogs">Create blog</Link>
          </ul>
        </nav>
        <hr></hr>
      </div>
    </>
  );
};

export default Navbar;

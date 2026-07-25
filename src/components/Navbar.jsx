import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <div className="s">
        <nav>
          <h2>IBlog</h2>
          <ul>
            <Link to="/">
              Home
            </Link>
            <Link to="/CreateBlogs">Create blog</Link>
          </ul>
        </nav>
        <hr></hr>
      </div>
    </>
  );
};

export default Navbar;

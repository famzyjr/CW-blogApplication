import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <div className="s">
        <nav>
         <Link to='/'> <h2>IBlog</h2></Link>
          <ul>
            <Link to="/blogs">
            Blogs
            </Link>
             <Link to="/login">
             Login
            </Link>
            <Link className="create-btn" to="/createblogs">Create blog</Link>
          </ul>
        </nav>
        <hr></hr>
      </div>
    </>
  );
};

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
const Navbar = () => {
  return (
    <>
      <div className="s">
        <nav>
          <Link to="/">
            {" "}
            <h2>IBlog</h2>
          </Link>
          <ul>
            <Link to="/blogs">Blogs</Link>
            <Link to="/login">
             <div className="icon-container">
                <User className="icon" size={35} />
              <span className="icon_context">user profile</span>
             </div>
            </Link>
            <Link className="create-btn" to="/createblogs">
              Create blog
            </Link>
          </ul>
        </nav>
        <hr></hr>
      </div>
    </>
  );
};

export default Navbar;

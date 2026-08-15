import React from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";

const Navbar = () => {
  return (
    <div className="s">
      <nav>
        <Link to="/">
          <h2>IBlog</h2>
        </Link>

        <ul>
          <Link to="/blogs">Blogs</Link>

          <div className="icon-container">
            <User className="icon" size={35} />

            <div className="profile-menu">
              <Link to="/profile">
                <span>User Profile</span>
              </Link>

             <span><Link to="/Login">Sign up</Link></span>


              <Link to="/logout">
                <span>Log out</span>
              </Link>
            </div>
          </div>

          <Link className="create-btn" to="/createblogs">
            Create blog
          </Link>
        </ul>
      </nav>

      <hr />
    </div>
  );
};

export default Navbar;
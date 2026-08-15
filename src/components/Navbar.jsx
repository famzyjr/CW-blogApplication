import React from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
const Navbar = () => {
  
   const logOut = async(e)=>{
     e.preventDefault();
     try{
     await signOut(auth)
      .then(()=>{
        alert('user Signed out')
      })
     }catch(error){
       console.error("Error signing out: ", error.message);
     }
    }

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
              
             <span><Link to="/login">Sign up</Link></span>


            
                <span onClick={logOut}>Log out</span>
             
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
import React from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import ProtectedRoute from "../components/ProtectedRoutes";

const Navbar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [user, setUser] = useState(null);
  
  useEffect(()=>{
   const unSubscribe = onAuthStateChanged(auth,(currentUser)=>{
    setUser(currentUser)
   })
   return ()=> unSubscribe();
  },[])

  const SignOut = async (e) => {
    try {
      await signOut(auth).then(() => {
        alert("user Signed out");
  setShowLogoutModal(false)
      });
    } catch (error) {
     
    }
  };
  const handelSignout = () => {
    SignOut();
  };
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

              {user ? (
               
               <div onClick={() => setShowLogoutModal(true)}>
                  <Link>
                    <span>Log out</span>
                  </Link>
                </div>
              ) : (
              <div>    <span>
                  <Link to="/login">Sign up</Link>
                </span></div>
              )}
            </div>
          </div>

          <Link className="create-btn" to="/createblogs">
            Create blog
          </Link>
        </ul>
      </nav>

      <hr />

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            {/* Modal Header */}
            <div className="mb-5">
              <h3 className="text-xl font-semibold text-gray-900">Log out?</h3>

              <p className="mt-2 text-sm text-gray-500">
                Are you sure you want to log out of your account?
              </p>
            </div>

            {/* Modal Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handelSignout}
                className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

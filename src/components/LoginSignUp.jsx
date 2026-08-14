import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast,Toaster } from "react-hot-toast";
const LoginSignUp = () => {
  const [user_name, setUser_Name] = useState("");
  const [user_email, setUser_Email] = useState("");
  const [user_password, setUser_Password] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //  creating new users with email and password
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user_email,
        user_password,
      );
        
       toast.success("🎉 Account created successfully!", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });

      console.log("User created:", userCredential.user);
      setTimeout(() => {
        navigate("/blogs");
      }, 2000);

      setUser_Email("");
      setUser_Password("");
      setErrors({});
      
    } catch (error) {
      console.log("Firebase error:", error);
      console.log("Firebase error code:", error.code);
      console.log("Firebase error message:", error.message);
      handelValidation();
    }
  };

  const handelValidation = () => {
    const errors = {};
    // if (user_name.trim() === "") {
    //   errors.user_name = "username is requried";
    // }
    if (user_email.trim() === "") {
      errors.user_email = "Email is requried";
    }
    if (user_password.trim() === "") {
      errors.user_password = "password is requried";
    } else if (user_password.length < 6) {
      errors.user_password = "password must be more than 6 characters";
    }
    setErrors(errors);
    return errors;
  };

  const handelSwitch = () => {
    setIsSignIn(true);
    setErrors({});
  };

  const handelSwitchLogin = () => {
    setIsSignIn(false);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {isSignIn ? (
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Create an account
            </h1>

            <p className="text-gray-500 mt-2">
              Create an account to start sharing your stories.
            </p>
          </div>
        ) : (
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>

            <p className="text-gray-500 mt-2">
              Login to continue to your blog.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Added space-y-5 here */}
          <div className="space-y-5">
            {/* {isSignIn && (
              <div>
                <label
                  htmlFor="user_Name"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Name
                </label>

                <input
                  id="user_Name"
                  type="text"
                  value={user_name}
                  placeholder="John Doe"
                  onChange={(e) => {
                    setUser_Name(e.target.value);

                    setErrors({
                      ...errors,
                      user_name: "",
                    });
                  }}
                    className={`w-full rounded-xl border ${errors.user_name ? `border-red-700` : 'border-gray-300'}  px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10`}
                />
                {errors.user_name ?  <div className="text-red-700">{errors.user_name}</div> : ''}
              </div>
            )} */}

            <div>
              <label
                htmlFor="user_Email"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <input
                id="user_Email"
                type="email"
                value={user_email}
                placeholder="you@example.com"
                onChange={(e) => {
                  setUser_Email(e.target.value);

                  setErrors({
                    ...errors,
                    user_email: "",
                  });
                }}
                className={`w-full rounded-xl border ${errors.user_email ? `border-red-700` : `border-gray-300`} px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10`}
              />
              {errors.user_email && (
                <div className="text-red-700">{errors.user_email}</div>
              )}
            </div>

            <div>
              <label
                htmlFor="user_Password"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <input
                id="user_Password"
              
                value={user_password}
                placeholder="••••••••"
                onChange={(e) => {
                  setUser_Password(e.target.value);

                  setErrors({
                    ...errors,
                    user_password: "",
                  });
                }}
                className={`w-full rounded-xl border ${errors.user_password ? `border-red-700` : `border-gray-300`} px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10`}
              />
              {errors.user_password && (
                <div className="text-red-700">{errors.user_password}</div>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full rounded-xl bg-black py-3 font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
              >
                {isSignIn ? "Sign Up" : "Login"}
              </button>
            </div>
          </div>
           <Toaster position="bottom-right" />
        </form>

        {isSignIn ? (
          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <button
              type="button"
              onClick={handelSwitchLogin}
              className="font-semibold text-black hover:underline"
            >
              Login
            </button>
          </div>
        ) : (
          <div className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={handelSwitch}
              className="font-semibold text-black hover:underline"
            >
              Create account
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignUp;

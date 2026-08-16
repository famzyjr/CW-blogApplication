import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { email, z } from "zod";
const LoginSignUp = () => {
  const [user_email, setUser_Email] = useState("");
  const [user_password, setUser_Password] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  const [errors, setErrors] = useState({});
  const [type, setType] = useState("password");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handelValidation = () => {
    const SignUpSchema = z.object({
      email: z.string().email(),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(32, { message: "Password cannot exceed 32 characters" })
        .regex(/[A-Z]/, {
          message: "Password must contain at least one uppercase letter",
        })
        .regex(/[a-z]/, {
          message: "Password must contain at least one lowercase letter",
        })
        .regex(/[0-9]/, {
          message: "Password must contain at least one number",
        })
        .regex(/[^A-Za-z0-9]/, {
          message: "Password must contain at least one special character",
        }),
    });

    const inputResult = SignUpSchema.safeParse({
      email: user_email,
      password: user_password,
    });
    console.log(inputResult);

    if (!inputResult.success) {
      const inputErrors = inputResult.error.flatten().fieldErrors;
      console.log(inputErrors);
      setErrors({
        email: inputErrors.email?.[0] || "",
        password: inputErrors.password?.[0] || "",
      });
      return false;
    }
    setErrors({});
    return true
  };

  const SignIn = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user_email,
        user_password,
      );

      toast.success("🎉 Account created  successfully!", {
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

  const Login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        user_email,
        user_password,
      );
      // the signed-in user info;
      const user = userCredential.user;
      toast.success("🎉 Login successfully!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      setTimeout(() => {
        navigate("/blogs");
      }, 2000);
      setUser_Email("");
      setUser_Password("");
      setErrors({});
    } catch (error) {
      toast.error(error.code, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      console.log("Firebase error:", error);
      console.log("Firebase error code:", error.code);
      console.log("Firebase error message:", error.message);
      handelValidation();
    }
  };

  const handelSwitch = () => {
    setIsSignIn(true);
    setErrors({});
    setUser_Email("");
    setUser_Password("");
  };

  const handelSwitchLogin = () => {
    setIsSignIn(false);
    setErrors({});
    setUser_Email("");
    setUser_Password("");
  };

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
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
                    email: "",
                  });
                }}
                className={`w-full rounded-xl border ${errors.email ? `border-red-700` : `border-gray-300`} px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10`}
              />
              {errors.email && (
                <div className="text-red-700">{errors.email}</div>
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
                type={type}
                placeholder="password"
                onChange={(e) => {
                  setUser_Password(e.target.value);

                  setErrors({
                    ...errors,
                    password: "",
                  });
                }}
                className={`w-full rounded-xl border ${errors.password ? `border-red-700` : `border-gray-300`} px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10`}
              />
              {errors.password && (
                <div className="text-red-700">{errors.password}</div>
              )}
              <div className="flex items-center  mt-3" onClick={handleToggle}>
                <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer select-none">
                  <span className="hover:text-gray-800 transition-colors">
                    Show password
                  </span>
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {isSignIn ? (
              <div>
                {" "}
                <div className="pt-2" onClick={SignIn}>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-black py-3 font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {" "}
                <div className="pt-2" onClick={Login}>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-black py-3 font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
                  >
                    Login
                  </button>
                </div>
              </div>
            )}
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

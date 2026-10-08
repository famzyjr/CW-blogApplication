import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { Eye } from "lucide-react";
import { EyeClosed } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
  const [type, setType] = useState("password");
  const [Icon, setIcon] = useState(EyeClosed);
  const navigate = useNavigate();

  // Form validation schema
  const LoginSchema = z.object({
    email: z
      .string()
      .trim()
      .min(1, {
        message: "Email is required",
      })
      .email({
        message: "Please enter a valid email",
      }),

    password: z.string().min(1, {
      message: "Password is required",
    }),
  });

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Submit form
  const handleSubmitForm = async (data) => {
    await LoginUser(data);
  };

  // Firebase Login
  const LoginUser = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      const user = userCredential.user;

      console.log("Logged in user:", user);

      reset();

      navigate("/blogs");
    } catch (error) {
      console.log("Firebase error:", error);
      console.log("Firebase error code:", error.code);
      console.log("Firebase error message:", error.message);

      // Firebase authentication error
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        toast.error("Incorrect email or password.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Please enter a valid email.");
      } else if (error.code === "auth/too-many-requests") {
        toast.error("Too many login attempts. Please try again later.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  // Show/hide password
  const handleToggle = () => {
    if (type === "password") {
      setIcon(Eye);
      setType("text");
    } else {
      setIcon(EyeClosed);
      setType("password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>

          <p className="text-gray-500 mt-2">Login to continue to your blog.</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-5">
          {/* Email */}
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
              placeholder="you@example.com"
              autoComplete="email"
              {...register("email")}
              className={`w-full rounded-xl border ${
                errors.email ? "border-red-700" : "border-gray-300"
              } px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10`}
            />

            {errors.email && (
              <div className="mt-2 text-sm text-red-700">
                {errors.email.message}
              </div>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="user_Password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="user_Password"
              type={type}
              placeholder="Password"
              autoComplete="current-password"
              {...register("password")}
              className={`w-full rounded-xl border ${
                errors.password ? "border-red-700" : "border-gray-300"
              } px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10`}
            />

            <div className="flex justify-end right-10 relative bottom-10">
              <button type="button" onClick={handleToggle}>
                <Icon className="absolute mr-10" size={25} />
              </button>
            </div>

            {errors.password && (
              <div className="mt-2 text-sm text-red-700">
                {errors.password.message}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full rounded-xl bg-black py-3 font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
            >
              Login
            </button>
          </div>
        </form>

        {/* Sign Up */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="font-semibold text-black hover:underline"
          >
            Create account
          </button>
        </div>
      </div>

      {/* Toast */}
      <Toaster position="bottom-right" />
    </div>
  );
};

export default Login;

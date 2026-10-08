
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Eye } from "lucide-react";
import { EyeClosed } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const SignUp = () => {
  const [type, setType] = useState("password");
  const [Icon, setIcon] = useState(EyeClosed);
  const navigate = useNavigate();

  // Signup validation schema
  const SignUpSchema = z.object({
    email: z
      .string()
      .trim()
      .min(1, {
        message: "Email is required",
      })
      .email({
        message: "Please enter a valid email",
      }),

    password: z
      .string()
      .min(1, {
        message: "Password is required",
      })
      .min(8, {
        message: "Password must be at least 8 characters long",
      })
      .max(32, {
        message: "Password cannot exceed 32 characters",
      })
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

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Submit form
  const handleSubmitForm = async (data) => {
    await createAccount(data);
  };

  // Firebase signup
  const createAccount = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      const user = userCredential.user;

      console.log("Created user:", user);

      reset();

      navigate("/blogs");
    } catch (error) {
      console.log("Firebase error:", error);
      console.log("Firebase error code:", error.code);

      if (error.code === "auth/email-already-in-use") {
        setError("email", {
          type: "server",
          message: "An account with this email already exists.",
        });
      } else if (error.code === "auth/invalid-email") {
        setError("email", {
          type: "server",
          message: "Please enter a valid email.",
        });
      } else if (error.code === "auth/weak-password") {
        setError("password", {
          type: "server",
          message: "Your password is too weak.",
        });
      } else {
        setError("password", {
          type: "server",
          message: "Something went wrong. Please try again.",
        });
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
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1
            id="signup-heading"
            className="text-3xl font-bold text-gray-900"
          >
            Create an account
          </h1>

          <p className="text-gray-500 mt-2">
            Create an account to start sharing your stories.
          </p>
        </header>

        {/* Form */}
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="space-y-5"
          aria-labelledby="signup-heading"
          noValidate
        >
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
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={
                errors.email ? "email-error" : undefined
              }
              className={`w-full rounded-xl border ${
                errors.email ? "border-red-700" : "border-gray-300"
              } px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10`}
            />

            {errors.email && (
              <p
                id="email-error"
                role="alert"
                className="mt-2 text-sm text-red-700"
              >
                {errors.email.message}
              </p>
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

            <div>
              <input
                id="user_Password"
                type={type}
                placeholder="Enter your password"
                autoComplete="new-password"
                {...register("password")}
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                className={`w-full rounded-xl border ${
                  errors.password
                    ? "border-red-700"
                    : "border-gray-300"
                } px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10`}
              />

              <div className="flex justify-end right-10 relative bottom-10">
                <button
                  type="button"
                  onClick={handleToggle}
                >
                  <Icon className="absolute mr-10" size={25} />
                </button>
              </div>
            </div>

            {errors.password && (
              <p
                id="password-error"
                role="alert"
                className="mt-2 text-sm text-red-700"
              >
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full rounded-xl bg-black py-3 font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Login */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-semibold text-black hover:underline focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
          >
            Login
          </button>
        </div>
      </div>
    </main>
  );
};

export default SignUp;


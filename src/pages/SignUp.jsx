import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const SignUp = () => {
  const [user_email, setUser_Email] = useState("");
  const [user_password, setUser_Password] = useState("");
  const [errors, setErrors] = useState({});
  const [type, setType] = useState("password");

  const navigate = useNavigate();

  const SignUpSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email",
    }),

    password: z
      .string()
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

  const handelValidation = () => {
    const inputResult = SignUpSchema.safeParse({
      email: user_email,
      password: user_password,
    });

    if (!inputResult.success) {
      const inputErrors = inputResult.error.flatten().fieldErrors;

      setErrors({
        email: inputErrors.email?.[0] || "",
        password: inputErrors.password?.[0] || "",
      });

      return false;
    }

    setErrors({});

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = handelValidation();

    if (!isValid) {
      return;
    }

    await SignIn();
  };

  const SignIn = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user_email,
        user_password
      );

      const user = userCredential.user;

      console.log("Created user:", user);

      setUser_Email("");
      setUser_Password("");
      setErrors({});

      navigate("/blogs");
    } catch (error) {
      console.log("Firebase error:", error);
      console.log("Firebase error code:", error.code);

      if (error.code === "auth/email-already-in-use") {
        setErrors({
          email: "An account with this email already exists.",
          password: "",
        });
      } else if (error.code === "auth/invalid-email") {
        setErrors({
          email: "Please enter a valid email.",
          password: "",
        });
      } else if (error.code === "auth/weak-password") {
        setErrors({
          email: "",
          password: "Your password is too weak.",
        });
      } else {
        setErrors({
          email: "",
          password: "Something went wrong. Please try again.",
        });
      }
    }
  };

  const handleToggle = () => {
    setType((currentType) =>
      currentType === "password" ? "text" : "password"
    );
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
          onSubmit={handleSubmit}
          className="space-y-5"
          aria-labelledby="signup-heading"
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
              name="email"
              type="email"
              value={user_email}
              placeholder="you@example.com"
              autoComplete="email"
              required
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={
                errors.email ? "email-error" : undefined
              }
              onChange={(e) => {
                setUser_Email(e.target.value);

                setErrors({
                  ...errors,
                  email: "",
                });
              }}
              className={`w-full rounded-xl border ${
                errors.email
                  ? "border-red-700"
                  : "border-gray-300"
              } px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10`}
            />

            {errors.email && (
              <p
                id="email-error"
                role="alert"
                className="mt-2 text-sm text-red-700"
              >
                {errors.email}
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

            <input
              id="user_Password"
              name="password"
              value={user_password}
              type={type}
              placeholder="Enter your password"
              autoComplete="new-password"
              required
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby={
                errors.password ? "password-error" : undefined
              }
              onChange={(e) => {
                setUser_Password(e.target.value);

                setErrors({
                  ...errors,
                  password: "",
                });
              }}
              className={`w-full rounded-xl border ${
                errors.password
                  ? "border-red-700"
                  : "border-gray-300"
              } px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10`}
            />

            {errors.password && (
              <p
                id="password-error"
                role="alert"
                className="mt-2 text-sm text-red-700"
              >
                {errors.password}
              </p>
            )}

            {/* Show password */}
            <div className="flex items-center mt-3">
              <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={type === "text"}
                  onChange={handleToggle}
                  aria-label={
                    type === "password"
                      ? "Show password"
                      : "Hide password"
                  }
                  className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                />

                <span className="hover:text-gray-800 transition-colors">
                  Show password
                </span>
              </label>
            </div>
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
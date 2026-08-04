import React, { useState } from "react";

const LoginSignUp = () => {
  const [user_name, setUser_Name] = useState("");
  const [user_email, setUser_Email] = useState("");
  const [user_password, setUser_Password] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser_Name("");
    setUser_Email("");
    setUser_Password("");
  };
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome Back 
            </h1>
            <p className="text-gray-500 mt-2">
              Sign in to continue to your blog.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                onChange={(e) => setUser_Name(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
              />
            </div>

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
                onChange={(e) => setUser_Email(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
              />
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
                type="password"
                value={user_password}
                placeholder="••••••••"
                onChange={(e) => setUser_Password(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-black py-3 font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-semibold text-black hover:underline"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignUp;

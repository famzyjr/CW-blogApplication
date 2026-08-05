import React, { useState } from "react";

const LoginSignUp = () => {
  const [user_name, setUser_Name] = useState("");
  const [user_email, setUser_Email] = useState("");
  const [user_password, setUser_Password] = useState("");
  const [isSignIn, setIsSignIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setUser_Name("");
    setUser_Email("");
    setUser_Password("");
  };

  const handelSwitch = () => {
    setIsSignIn(true);
  };

  const handelSwitchLogin = () => {
    setIsSignIn(false);
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
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome Back
            </h1>

            <p className="text-gray-500 mt-2">
              Login to continue to your blog.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Added space-y-5 here */}
          <div className="space-y-5">
            {isSignIn && (
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
            )}

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

            <div className="pt-2">
              <button
                type="submit"
                className="w-full rounded-xl bg-black py-3 font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
              >
                {isSignIn ? "Sign Up" : "Login"}
              </button>
            </div>
          </div>
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
import React from "react";
import { Link } from "react-router-dom";
import {
  FiGithub,
  FiTwitter,
  FiInstagram,
  FiMail,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12">

        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-bold">IBlog</h2>
            </Link>

            <p className="mt-4 text-sm leading-6 text-gray-400 max-w-xs">
              A place to discover, share, and read stories from people
              around the world.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-white transition"
              >
                <FiGithub />
              </a>

              <a
                href="#"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-white transition"
              >
                <FiTwitter />
              </a>

              <a
                href="#"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-white transition"
              >
                <FiInstagram />
              </a>

              <a
                href="#"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-white transition"
              >
                <FiMail />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold text-lg">Explore</h3>

            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  to="/"
                  className="hover:text-white transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/blogs"
                  className="hover:text-white transition"
                >
                  All Blogs
                </Link>
              </li>

              <li>
                <Link
                  to="/createblogs"
                  className="hover:text-white transition"
                >
                  Create a Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-semibold text-lg">Account</h3>

            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  to="/login"
                  className="hover:text-white transition"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="hover:text-white transition"
                >
                  Create Account
                </Link>
              </li>

              <li>
                <Link
                  to="/profile"
                  className="hover:text-white transition"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg">
              Stay Updated
            </h3>

            <p className="mt-4 text-sm leading-6 text-gray-400">
              Get the latest stories and updates delivered to your inbox.
            </p>

            <div className="mt-5 flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full min-w-0 rounded-l-lg bg-white px-4 py-3 text-sm text-black outline-none"
              />

              <button
                type="button"
                className="rounded-r-lg bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-gray-200 transition"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-12 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} IBlog. All rights reserved.
            </p>

            <div className="flex items-center gap-5 text-sm text-gray-500">
              <a
                href="#"
                className="hover:text-white transition"
              >
                Privacy
              </a>

              <a
                href="#"
                className="hover:text-white transition"
              >
                Terms
              </a>

              <a
                href="#"
                className="hover:text-white transition"
              >
                Contact
              </a>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
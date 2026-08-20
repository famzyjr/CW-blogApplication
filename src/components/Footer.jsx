import React from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

const Footer = () => {
  return (
    <footer
      aria-label="Site footer"
      className="mt-20 border-t border-gray-200 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8">
          
          {/* Copyright */}
          <div>
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} IBlog. Built for publishing blogs.
            </p>
          </div>

          {/* Navigation Links */}
          <nav aria-label="Footer navigation">
            <div className="flex items-center gap-6 text-sm">
              <Link
                to="/login"
                className="rounded text-gray-600 transition hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              >
                Sign in
              </Link>

              <Link
                to="/login"
                className="flex items-center gap-1 rounded text-gray-600 transition hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              >
                Create account

                <FiArrowUpRight
                  size={14}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
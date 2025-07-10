import React from "react";
import { Link } from "react-router-dom";

const Landing = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center">
    <div className="max-w-2xl w-full px-6 py-12 bg-white rounded-3xl shadow-2xl flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4 text-center">
        Welcome to LanceConnect
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        The modern marketplace for freelancers and clients. Find top talent or your next project, chat, manage orders, and grow your business—all in one place.
      </p>
      <div className="flex gap-6">
        <Link
          to="/login"
          className="px-8 py-3 bg-indigo-600 text-white rounded-full font-semibold shadow hover:bg-indigo-700 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-8 py-3 bg-white border border-indigo-600 text-indigo-700 rounded-full font-semibold shadow hover:bg-indigo-50 transition"
        >
          Sign Up
        </Link>
      </div>
    </div>
    <footer className="mt-10 text-gray-400 text-sm">
      &copy; {new Date().getFullYear()} LanceConnect. All rights reserved.
    </footer>
  </div>
);

export default Landing;

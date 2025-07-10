import React from "react";
import LoginForm from "../components/Auth/LoginForm";

const Login = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Login to LanceConnect</h2>
      <LoginForm />
      <div className="mt-4 text-center">
        <span className="text-gray-500">Don't have an account? </span>
        <a href="/register" className="text-indigo-600 font-semibold hover:underline">Sign Up</a>
      </div>
    </div>
  </div>
);

export default Login;
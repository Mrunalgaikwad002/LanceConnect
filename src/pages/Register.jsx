import React from "react";
import RegisterForm from "../components/Auth/RegisterForm";

const Register = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Create Your Account</h2>
      <RegisterForm />
      <div className="mt-4 text-center">
        <span className="text-gray-500">Already have an account? </span>
        <a href="/login" className="text-indigo-600 font-semibold hover:underline">Login</a>
      </div>
    </div>
  </div>
);

export default Register;

import React, { useState } from "react";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add login logic here
    alert("Login submitted! (Implement backend logic)");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        className="w-full py-2 bg-indigo-600 text-white rounded font-semibold hover:bg-indigo-700 transition"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
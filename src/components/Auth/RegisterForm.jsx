import React, { useState } from "react";
import RoleSelector from "./RoleSelector";

const RegisterForm = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "client" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRoleChange = (role) => setForm({ ...form, role });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add registration logic here
    alert("Registration submitted! (Implement backend logic)");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={form.name}
        onChange={handleChange}
        required
      />
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
      <RoleSelector selectedRole={form.role} onChange={handleRoleChange} />
      <button
        type="submit"
        className="w-full py-2 bg-indigo-600 text-white rounded font-semibold hover:bg-indigo-700 transition"
      >
        Sign Up
      </button>
    </form>
  );
};

export default RegisterForm;
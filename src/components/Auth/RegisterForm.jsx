import React, { useState } from "react";
import RoleSelector from "./RoleSelector";

const RegisterForm = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "client" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRoleChange = (role) => setForm({ ...form, role });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Registration successful! You can now log in.");
      } else {
        setError(data.msg || "Registration failed");
      }
    } catch (err) {
      setError("Server error");
    }
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
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      {success && <div className="text-green-600 text-sm mt-2">{success}</div>}
    </form>
  );
};

export default RegisterForm;
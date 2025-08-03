import React, { useState } from "react";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user)); // Store user info
        
        // Redirect based on user role
        if (data.user.role === "client") {
          window.location.href = "/client/dashboard";
        } else {
          window.location.href = "/freelancer/dashboard";
        }
      } else {
        setError(data.msg || "Login failed");
      }
    } catch (err) {
      setError("Server error");
    }
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
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </form>
  );
};

export default LoginForm;
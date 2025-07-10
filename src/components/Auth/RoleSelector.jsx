import React from "react";

const RoleSelector = ({ selectedRole, onChange }) => (
  <div className="flex gap-4 items-center justify-center">
    <label className="font-medium text-gray-700">Register as:</label>
    <button
      type="button"
      className={`px-4 py-2 rounded-full border font-semibold transition ${
        selectedRole === "client"
          ? "bg-indigo-600 text-white border-indigo-600"
          : "bg-white text-indigo-600 border-indigo-300"
      }`}
      onClick={() => onChange("client")}
    >
      Client
    </button>
    <button
      type="button"
      className={`px-4 py-2 rounded-full border font-semibold transition ${
        selectedRole === "freelancer"
          ? "bg-indigo-600 text-white border-indigo-600"
          : "bg-white text-indigo-600 border-indigo-300"
      }`}
      onClick={() => onChange("freelancer")}
    >
      Freelancer
    </button>
  </div>
);

export default RoleSelector;
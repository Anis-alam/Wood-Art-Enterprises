import React from "react";

export default function ServiceCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition duration-300 text-center">
      <div className="text-5xl mb-5">{icon}</div>

      <h3 className="text-2xl font-bold text-[#3E2723] mb-4">{title}</h3>

      <p className="text-gray-600 leading-7">{description}</p>
    </div>
  );
}

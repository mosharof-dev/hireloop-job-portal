// src/components/Dashboard/StatCard.jsx
import React from "react";

export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex flex-col gap-4 shadow-sm">
      {/* Icon Wrapper */}
      <div className="bg-neutral-800 w-10 h-10 rounded-lg flex items-center justify-center text-neutral-300">
        {icon}
      </div>

      {/* Content */}
      <div>
        <p className="text-neutral-400 text-sm mb-1">{title}</p>
        <h3 className="text-white text-2xl font-semibold">{value}</h3>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";

const PricingCard = ({ plan, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`relative bg-[#121214]/80 backdrop-blur-xl border ${
        plan.popular ? "border-blue-500/50" : "border-white/10"
      } rounded-3xl p-8 flex flex-col hover:border-white/20 transition-all duration-300 group`}
    >
      {/* Hover Glow */}
      <div
        className={`absolute inset-0 bg-linear-to-b ${plan.color} opacity-0 group-hover:opacity-[0.03] rounded-3xl transition-opacity duration-500 pointer-events-none`}
      ></div>

      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-[0_0_15px_-3px_rgba(59,130,246,0.5)]">
          MOST POPULAR
        </div>
      )}

      <div className="flex items-center gap-4 mb-6">
        <div
          className={`w-12 h-12 rounded-2xl bg-linear-to-br ${plan.color} flex items-center justify-center bg-opacity-10 shadow-lg ${plan.glow}`}
        >
          {plan.icon}
        </div>
        <div>
          <h3 className="text-xl font-bold">{plan.name}</h3>
        </div>
      </div>

      <div className="mb-6">
        <span className="text-4xl font-extrabold">{plan.price}</span>
        <span className="text-zinc-400 font-medium">{plan.period}</span>
      </div>

      <p className="text-zinc-400 text-sm mb-8 h-10">{plan.description}</p>

      <ul className="flex-1 space-y-4 mb-8">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="mt-1 bg-blue-500/20 rounded-full p-0.5">
              <FiCheck className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <span className="text-zinc-300 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <form action="/api/checkout_sessions" method="POST">
        <section>
          <button
            type="submit"
            role="link"
            className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
              plan.popular
                ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_-5px_rgba(37,99,235,0.6)] hover:scale-[1.02] border-none"
                : "bg-white/5 hover:bg-white/10 border border-white/10 text-white"
            }`}
          >
            {plan.buttonText}
          </button>
        </section>
      </form>
    </motion.div>
  );
};

export default PricingCard;

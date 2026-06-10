"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiCheck, FiHome, FiFileText, FiArrowRight } from "react-icons/fi";

export default function SuccessClient({ customerEmail, amountTotal, currency }) {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD',
  }).format((amountTotal || 0) / 100);

  return (
    <div className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden bg-[#050505] px-4 py-12 md:py-20 font-sans">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] mix-blend-screen" />
        </div>
      </div>

      {/* Main Container */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-lg w-full"
      >
        {/* Receipt Card */}
        <div className="relative bg-zinc-900/50 backdrop-blur-2xl border border-zinc-800/50 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
          
          {/* Subtle Top Inner Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-linear-to-r from-transparent via-emerald-500/50 to-transparent" />

          {/* Icon Area */}
          <div className="flex justify-center mb-8">
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
              className="relative w-24 h-24 flex items-center justify-center rounded-full bg-linear-to-br from-emerald-400 to-teal-500 shadow-[0_0_50px_rgba(16,185,129,0.4)]"
            >
              <div className="absolute inset-1 rounded-full bg-zinc-950 flex items-center justify-center">
                <FiCheck className="w-10 h-10 text-emerald-400" strokeWidth={3} />
              </div>
            </motion.div>
          </div>

          {/* Header Text */}
          <div className="text-center space-y-2 mb-10">
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-extrabold text-white tracking-tight"
            >
              Payment Successful!
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-zinc-400 text-sm md:text-base max-w-70 mx-auto"
            >
              Your subscription to <strong className="text-emerald-400 font-medium">HireLoop Pro</strong> is now active.
            </motion.p>
          </div>

          {/* Receipt Details Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-black/40 border border-zinc-800/80 rounded-2xl p-6 mb-10 relative overflow-hidden"
          >
            {/* Amount Section */}
            <div className="text-center mb-6">
              <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-1">Amount Paid</p>
              <div className="text-4xl font-black text-white tracking-tight">{formattedAmount}</div>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-2 w-full mb-6 opacity-40">
              <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
              <div className="w-full border-t border-dashed border-zinc-700"></div>
              <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
            </div>

            {/* Details Section */}
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Billed to</span>
                <span className="text-zinc-200 font-medium truncate ml-4 max-w-45 sm:max-w-55">
                  {customerEmail || "Customer"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Status</span>
                <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Completed
                </span>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-3 w-full mt-8"
          >
            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-full bg-white text-black hover:bg-zinc-200 rounded-xl px-6 py-4 text-[16px] font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
            >
              Go to Homepage
              <FiArrowRight className="w-5 h-5 ml-1" />
            </Link>

            <Link
              href="/dashboard/billing"
              className="flex items-center justify-center gap-2 w-full border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-xl px-6 py-4 text-[15px] font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
            >
              <FiFileText className="w-4 h-4" />
              View Invoice Details
            </Link>
          </motion.div>

        </div>
        
        {/* Bottom Support Text */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-zinc-600 text-xs mt-6"
        >
          Having trouble? <a href="mailto:support@hireloop.com" className="text-zinc-400 hover:text-white underline decoration-zinc-700 underline-offset-4 transition-colors">Contact Support</a>
        </motion.p>
      </motion.div>
    </div>
  );
}

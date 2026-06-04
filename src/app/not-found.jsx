"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiHome, FiSearch, FiArrowLeft, FiAlertCircle } from "react-icons/fi";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative min-h-[75vh] w-full flex items-center justify-center overflow-hidden bg-[#030303] px-6 py-12 md:py-20">
      {/* Background Grids & Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.05]" 
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Ambient Lights */}
        <div className="absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-blue-600/10 blur-[100px] opacity-70 animate-pulse" />
        <div className="absolute right-1/4 bottom-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-violet-600/10 blur-[130px] opacity-60" />
      </div>

      {/* Main Content Card */}
      <div className="relative z-10 max-w-2xl w-full text-center flex flex-col items-center">
        
        {/* 404 Graphic with Orbital Loop */}
        <div className="relative w-72 h-72 flex items-center justify-center mb-8">
          {/* Outer Rotating Dotted Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-dashed border-zinc-800 rounded-full"
          />

          {/* Inner Interactive Orbital Loop */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute w-56 h-56 border-2 border-linear-to-r from-blue-500/30 to-violet-500/30 rounded-full flex items-center justify-center"
          >
            {/* Tiny satellite node on the orbit */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-blue-400 rounded-full shadow-[0_0_12px_#3b82f6]" />
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-violet-400 rounded-full shadow-[0_0_10px_#8b5cf6]" />
          </motion.div>

          {/* Central Glow */}
          <div className="absolute w-40 h-40 rounded-full bg-blue-500/5 blur-xl" />

          {/* Large 404 digits */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
            className="relative select-none text-7xl md:text-8xl font-black tracking-tighter text-white"
          >
            <span className="bg-linear-to-r from-blue-400 via-sky-300 to-violet-400 bg-clip-text text-transparent">
              4
            </span>
            <span className="text-zinc-700 mx-1">0</span>
            <span className="bg-linear-to-r from-violet-400 via-fuchsia-300 to-blue-400 bg-clip-text text-transparent">
              4
            </span>
          </motion.div>
        </div>

        {/* Text Details */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/5 px-4 py-1.5 shadow-[0_0_15px_rgba(239,68,68,0.05)]">
            <FiAlertCircle className="w-4 h-4 text-red-400" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-red-300">
              Error Code: Page Not Found
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-4">
            Lost in the{" "}
            <span className="bg-linear-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              HireLoop
            </span>
            ?
          </h1>
          
          <p className="text-zinc-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            The page you are looking for has been moved, deleted, or never existed in our platform. Let&apos;s get you back on track.
          </p>
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center"
        >
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 w-full sm:w-auto border border-zinc-800 bg-[#121214] hover:bg-zinc-900 text-zinc-300 hover:text-white rounded-full px-6 py-3 text-[14px] font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <FiArrowLeft className="w-4 h-4" />
            Go Back
          </button>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-white text-black hover:bg-zinc-200 rounded-full px-6 py-3 text-[14px] font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-white/5"
          >
            <FiHome className="w-4 h-4" />
            Back to Home
          </Link>

          <Link
            href="/jobs"
            className="flex items-center justify-center gap-2 w-full sm:w-auto border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 text-blue-400 hover:text-blue-300 rounded-full px-6 py-3 text-[14px] font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <FiSearch className="w-4 h-4" />
            Browse Jobs
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

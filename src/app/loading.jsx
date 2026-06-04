"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import logo from "@/images/logo.png";

export default function Loading() {
  return (
    <div className="relative min-h-[70vh] w-full flex flex-col items-center justify-center overflow-hidden bg-[#030303] px-6">
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft centered blue glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-blue-600/5 blur-[100px] opacity-80" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Rotating Rings & Logo Container */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          
          {/* Outer high-tech spinning gradient ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 border-r-indigo-500/30"
          />

          {/* Inner opposite-spinning ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            className="absolute w-22 h-22 rounded-full border border-transparent border-b-violet-500 border-l-sky-500/20"
          />

          {/* Pulsing glow background for Logo */}
          <motion.div
            animate={{
              scale: [0.92, 1.05, 0.92],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-16 h-16 rounded-full bg-blue-500/10 blur-md"
          />

          {/* Brand Logo in the Center */}
          <motion.div
            animate={{
              scale: [0.96, 1.04, 0.96],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-20 w-14 h-14 flex items-center justify-center"
          >
            <Image
              src={logo}
              alt="HireLoop Logo"
              width={56}
              height={56}
              className="object-contain"
              priority
            />
          </motion.div>
        </div>

        {/* Loading text with animated ellipsis */}
        <div className="mt-8 flex flex-col items-center gap-1.5 text-center">
          <span className="text-zinc-200 font-semibold tracking-wide text-[14px]">
            Loading Opportunities
          </span>
          <div className="flex gap-1 items-center justify-center h-4">
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
              className="w-1.5 h-1.5 rounded-full bg-blue-500"
            />
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
              className="w-1.5 h-1.5 rounded-full bg-indigo-500"
            />
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.6 }}
              className="w-1.5 h-1.5 rounded-full bg-violet-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiSearch, FiMapPin, FiCheckCircle } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-[#030303] text-white h-full py-20 flex items-center pt-10">
      {/* Background decorations - Refined for premium look */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-[#030303] to-[#030303]"></div>

        {/* Orbs with smoother blur */}
        <div className="absolute top-0 -left-[10%] w-[50%] h-[60%] rounded-full bg-blue-600/10 blur-[160px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[50%] rounded-full bg-orange-500/10 blur-[150px]" />

        {/* Softer grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-5xl relative z-20"
        >
          {/* Animated Top Badge */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 mb-8 relative overflow-hidden group backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-blue-300">
              The Modern Job Hunting Portal
            </span>
          </motion.div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-extrabold tracking-tight mb-6 leading-[1.15] text-white">
            Find Your Dream Job <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-orange-400">
              Faster & Smarter
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg lg:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of professionals landing roles at top companies.
            Search millions of jobs and manage your applications in one seamless
            platform.
          </p>

          {/* Premium Search Bar replacing the generic buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-full max-w-4xl mx-auto bg-zinc-950/60 backdrop-blur-2xl border border-white/10 rounded-3xl md:rounded-full p-2 flex flex-col md:flex-row shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
          >
            <div className="flex-1 flex items-center px-4 md:px-6 py-4 md:py-3 border-b md:border-b-0 md:border-r border-white/10 group">
              <FiSearch className="text-zinc-400 text-xl mr-3 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                className="w-full bg-transparent text-white outline-none placeholder:text-zinc-500 text-sm md:text-base font-medium"
              />
            </div>
            <div className="flex-1 flex items-center px-4 md:px-6 py-4 md:py-3 group">
              <FiMapPin className="text-zinc-400 text-xl mr-3 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="text"
                placeholder="City, state, or 'Remote'"
                className="w-full bg-transparent text-white outline-none placeholder:text-zinc-500 text-sm md:text-base font-medium"
              />
            </div>
            <Link href="/jobs" className="w-full md:w-auto mt-2 md:mt-0">
              <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 md:py-3 px-8 rounded-2xl md:rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]">
                Search Jobs
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm"
          >
            <span className="text-zinc-500">Popular searches:</span>
            {["Software Engineer", "Product Manager", "Remote", "UI/UX"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer text-xs"
                >
                  {tag}
                </span>
              ),
            )}
          </motion.div>
        </motion.div>

        {/* --- Floating UI Elements (Fixed positioning so they don't overlap text) --- */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Floating Card 1: Candidate Match */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute top-[15%] left-[2%] lg:left-[5%] xl:left-[10%] hidden lg:flex flex-col gap-3 p-4 bg-zinc-900/80 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl w-56 z-10 pointer-events-auto"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 p-[2px]">
                <div className="w-full h-full bg-zinc-900 rounded-full flex items-center justify-center">
                  <span className="text-green-400 font-bold text-xs">98%</span>
                </div>
              </div>
              <div>
                <p className="font-bold text-xs text-white">Perfect Match</p>
                <p className="text-[10px] text-zinc-400">
                  Senior React Developer
                </p>
              </div>
            </div>
            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-[98%]"></div>
            </div>
          </motion.div>

          {/* Floating Card 2: Application Update */}
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{
              repeat: Infinity,
              duration: 7,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-[25%] right-[2%] lg:right-[5%] xl:right-[10%] hidden lg:flex flex-col gap-3 p-4 bg-zinc-900/80 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl w-64 z-10 pointer-events-auto"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/30">
                  <FaUserCircle className="text-xl" />
                </div>
                <div>
                  <p className="font-bold text-xs text-white">
                    Interview Scheduled
                  </p>
                  <p className="text-[10px] text-zinc-400">Today, 2:30 PM</p>
                </div>
              </div>
              <FiCheckCircle className="text-blue-400 text-base" />
            </div>
            <div className="bg-zinc-800/50 rounded-lg p-2 border border-white/5 flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-white flex items-center justify-center">
                <span className="text-black font-black text-[10px]">G</span>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-white">
                  Google LLC
                </p>
                <p className="text-[9px] text-zinc-500">Product Designer</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade to blend with next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#030303] to-transparent z-10 pointer-events-none"></div>
    </div>
  );
};

export default HeroSection;

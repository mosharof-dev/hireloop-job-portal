"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiHome, FiArrowLeft, FiLock, FiShield, FiLayout } from "react-icons/fi";
import { useSession, authClient } from "@/lib/auth-client";

export default function Unauthorized() {
  const router = useRouter();
  const { data: sessionData, isPending } = useSession();
  const user = sessionData?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/signin";
  };

  const dashboardUrl = user?.role === "recruiter" ? "/dashboard/recruiter" : "/dashboard/seeker";

  return (
    <div className="relative min-h-[75vh] w-full flex items-center justify-center overflow-hidden bg-[#030303] px-6 py-12 md:py-20">
      
      {/* Background Grids & Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.04]" 
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Ambient Lights - Crimson and Amber for security/restricted area */}
        <div className="absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-red-600/10 blur-[100px] opacity-75 animate-pulse" />
        <div className="absolute right-1/4 bottom-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-amber-600/5 blur-[120px] opacity-50" />
      </div>

      {/* Main Content Card */}
      <div className="relative z-10 max-w-xl w-full text-center flex flex-col items-center">
        
        {/* Cyber Security Lock Graphic - Compact & Balanced */}
        <div className="relative w-60 h-60 flex items-center justify-center mb-6">
          
          {/* Outer rotating dashed ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-dashed border-red-500/20 rounded-full"
          />

          {/* Inner decorative dotted ring */}
          <div className="absolute w-[200px] h-[200px] border border-dotted border-white/5 rounded-full" />

          {/* Central glowing red background aura */}
          <div className="absolute w-36 h-36 rounded-full bg-red-500/5 blur-xl" />

          {/* Glass Shield Node */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="relative w-36 h-36 rounded-full bg-zinc-950/65 border border-red-500/30 flex flex-col items-center justify-center shadow-[0_15px_35px_rgba(239,68,68,0.15)] backdrop-blur-md group"
          >
            {/* Lock icon */}
            <motion.div
              animate={{ 
                y: [0, -4, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-red-500"
            >
              <FiLock className="w-14 h-14 filter drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
            </motion.div>

            {/* Inner ring pulse */}
            <div className="absolute inset-2 border border-dashed border-red-500/10 rounded-full animate-spin" style={{ animationDuration: '60s' }} />
            
            <span className="text-[9px] font-mono tracking-[0.2em] text-red-400 mt-2 font-bold uppercase">
              Restricted
            </span>
          </motion.div>
        </div>

        {/* Text Details */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-4"
        >
          {/* System Error Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/5 px-4 py-1.5 shadow-[0_0_15px_rgba(239,68,68,0.05)]">
            <FiShield className="w-3.5 h-3.5 text-red-400" />
            <span className="text-[10px] font-mono tracking-[0.2em] text-red-300 font-bold uppercase">
              System Alert: 403 Forbidden
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-4">
            Access{" "}
            <span 
              style={{
                backgroundImage: "linear-gradient(135deg, #ef4444 0%, #fbbf24 50%, #ef4444 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
              className="inline-block"
            >
              Restricted
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
            You do not have permission to access this page. This resource is reserved for users with appropriate roles or access clearance.
          </p>
        </motion.div>

        {/* Action CTAs - Max 3 Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center"
        >
          {/* Primary CTA: Dashboard or Sign In */}
          {user ? (
            <Link
              href={dashboardUrl}
              className="flex items-center justify-center gap-2 w-full sm:w-auto bg-white text-black hover:bg-zinc-200 rounded-full px-6 py-3 text-[14px] font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-white/5"
            >
              <FiLayout className="w-4 h-4" />
              Go to Dashboard
            </Link>
          ) : (
            <Link
              href="/signin"
              className="flex items-center justify-center gap-2 w-full sm:w-auto bg-white text-black hover:bg-zinc-200 rounded-full px-6 py-3 text-[14px] font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-white/5"
            >
              Sign In
            </Link>
          )}

          {/* Secondary CTA: Go Back */}
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 w-full sm:w-auto border border-zinc-800 bg-[#121214] hover:bg-zinc-900 text-zinc-300 hover:text-white rounded-full px-6 py-3 text-[14px] font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <FiArrowLeft className="w-4 h-4" />
            Go Back
          </button>

          {/* Tertiary CTA: Back to Home */}
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full sm:w-auto border border-zinc-800 bg-[#121214] hover:bg-zinc-900 text-zinc-300 hover:text-white rounded-full px-6 py-3 text-[14px] font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <FiHome className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>

        {/* Switch Account link (Subtle text link underneath, to keep CTAs clean) */}
        {user && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-zinc-500 text-xs"
          >
            Logged in as <span className="text-zinc-300 font-semibold">{user.name}</span> ({user.role}). Need a different account?{" "}
            <button
              onClick={handleSignOut}
              className="text-red-400 hover:text-red-300 underline font-medium cursor-pointer ml-1 transition-colors duration-150"
            >
              Switch Account
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
}

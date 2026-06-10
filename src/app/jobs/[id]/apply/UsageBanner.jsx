"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiInfo, FiStar, FiTrendingUp, FiUnlock } from "react-icons/fi";

export default function UsageBanner({ used, max, isUnlimited, planName }) {
    const percentage = isUnlimited ? 0 : Math.min(100, Math.round((used / max) * 100));
    const applicationsLeft = isUnlimited ? "Unlimited" : Math.max(0, max - used);
    
    // Determine color based on usage percentage
    let statusColor = "from-blue-500 to-indigo-500";
    let textColor = "text-blue-400";
    let bgGlow = "bg-blue-500/20";
    
    if (!isUnlimited) {
        if (percentage >= 90) {
            statusColor = "from-rose-500 to-red-500";
            textColor = "text-rose-400";
            bgGlow = "bg-rose-500/20";
        } else if (percentage >= 75) {
            statusColor = "from-amber-500 to-orange-500";
            textColor = "text-amber-400";
            bgGlow = "bg-amber-500/20";
        }
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative w-full rounded-2xl overflow-hidden mb-6 group"
        >
            {/* Animated Background Glow */}
            <div className={`absolute inset-0 ${bgGlow} blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500`}></div>
            
            {/* Main Glass Container */}
            <div className="relative bg-[#121214]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-all duration-300 hover:border-white/20 hover:bg-[#121214]/90">
                
                {/* Left Side: Icon & Info */}
                <div className="flex w-full sm:w-auto items-center gap-4 flex-1">
                    {/* Icon Box */}
                    <div className="relative shrink-0">
                        <div className={`absolute inset-0 bg-linear-to-br ${statusColor} opacity-20 blur-md rounded-xl`}></div>
                        <div className="relative h-12 w-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                            {isUnlimited ? (
                                <FiUnlock className={`w-6 h-6 ${textColor}`} />
                            ) : (
                                <FiTrendingUp className={`w-6 h-6 ${textColor}`} />
                            )}
                        </div>
                    </div>

                    {/* Text Details */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-white font-bold text-lg sm:text-xl tracking-tight truncate">
                            {planName} Plan Usage
                        </h3>
                        <p className="text-zinc-300 text-sm sm:text-base mt-1">
                            You have used <span className={`font-bold ${textColor}`}>{used}</span> out of <span className="text-white font-bold">{isUnlimited ? "Unlimited" : max}</span> applications.
                        </p>
                    </div>
                </div>

                {/* Right Side: Progress Bar & Upgrade Button */}
                <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-5 sm:gap-6 shrink-0">
                    
                    {/* Progress Bar (Hidden if Unlimited) */}
                    {!isUnlimited && (
                        <div className="w-full sm:w-32 flex flex-col gap-2">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-zinc-400 font-medium">{percentage}% Used</span>
                                <span className="text-zinc-300 font-bold">{applicationsLeft} Left</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                                    className={`h-full bg-linear-to-r ${statusColor} rounded-full relative`}
                                >
                                    <div className="absolute inset-0 bg-white/20 w-full animate-pulse"></div>
                                </motion.div>
                            </div>
                        </div>
                    )}

                    {/* Upgrade Button */}
                    <Link 
                        href="/pricing" 
                        className="w-full sm:w-auto relative group/btn"
                    >
                        <div className="absolute inset-0 bg-linear-to-r from-amber-500 to-orange-600 rounded-xl blur opacity-60 group-hover/btn:opacity-100 transition duration-300"></div>
                        <div className="relative flex items-center justify-center gap-2 bg-linear-to-r from-amber-500 to-orange-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] group-hover/btn:scale-[1.02]">
                            <FiStar className="w-5 h-5" />
                            <span>Upgrade</span>
                        </div>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

"use client";

import React from "react";
import { FiBriefcase, FiUsers, FiSearch, FiStar } from "react-icons/fi";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const stats = [
  {
    label: "Active Jobs",
    value: 50,
    icon: FiBriefcase,
    suffix: "K",
    accentColor: "violet",
    glowColor: "rgba(139, 92, 246, 0.15)",
  },
  {
    label: "Companies",
    value: 12,
    icon: FiUsers,
    suffix: "K",
    accentColor: "blue",
    glowColor: "rgba(59, 130, 246, 0.15)",
  },
  {
    label: "Job Seekers",
    value: 2,
    icon: FiSearch,
    suffix: "M",
    accentColor: "cyan",
    glowColor: "rgba(6, 182, 212, 0.15)",
  },
  {
    label: "Satisfaction Rate",
    value: 97,
    icon: FiStar,
    suffix: "%",
    accentColor: "amber",
    glowColor: "rgba(245, 158, 11, 0.15)",
  },
];

const accentStyles = {
  violet: {
    iconBg: "bg-violet-500/10 text-violet-400 group-hover:text-violet-300 border-violet-500/20 group-hover:border-violet-500/40",
    glow: "group-hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]",
    suffix: "text-violet-400",
    border: "group-hover:border-violet-500/30",
    bar: "from-violet-500 to-transparent",
  },
  blue: {
    iconBg: "bg-blue-500/10 text-blue-400 group-hover:text-blue-300 border-blue-500/20 group-hover:border-blue-500/40",
    glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]",
    suffix: "text-blue-400",
    border: "group-hover:border-blue-500/30",
    bar: "from-blue-500 to-transparent",
  },
  cyan: {
    iconBg: "bg-cyan-500/10 text-cyan-400 group-hover:text-cyan-300 border-cyan-500/20 group-hover:border-cyan-500/40",
    glow: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]",
    suffix: "text-cyan-400",
    border: "group-hover:border-cyan-500/30",
    bar: "from-cyan-500 to-transparent",
  },
  amber: {
    iconBg: "bg-amber-500/10 text-amber-400 group-hover:text-amber-300 border-amber-500/20 group-hover:border-amber-500/40",
    glow: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]",
    suffix: "text-amber-400",
    border: "group-hover:border-amber-500/30",
    bar: "from-amber-500 to-transparent",
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 18,
    },
  },
};

const StatsSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#030303]  py-20 sm:py-20 lg:py-25">
      {/*  Tech Background with Grid Patterns and Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.08]" 
          style={{
            backgroundImage: "radial-linear(rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        
        {/* Top center soft purple glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-12.5 bg-[radial-linear(circle_at_center,rgba(124,58,237,0.12),transparent_60%)]" />
        
        {/* Side ambient lights for dynamic  */}
        <div className="absolute -left-1/4 top-1/3 w-125 h-125 rounded-full bg-violet-900/10 blur-[130px] opacity-75" />
        <div className="absolute -right-1/4 bottom-1/3 w-125 h-125 rounded-full bg-indigo-900/10 blur-[130px] opacity-75" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block with Premium Typography */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-4.5 py-1.5 shadow-[0_0_15px_rgba(124,58,237,0.06)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-300/90">
              Trusted by Thousands Worldwide
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-[1.15]"
          >
            Assisting over{" "}
            <span className="bg-linear-to-r from-violet-400 via-fuchsia-300 to-indigo-400 bg-clip-text text-transparent">
              15,000
            </span>{" "}
            job seekers find their dream positions.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg leading-relaxed"
          >
            HireLoop makes it easy to discover the right opportunities, connect with top companies, and land your next role faster.
          </motion.p>
        </div>

        {/* Stats Cards Grid with Framer Motion Stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((item) => {
            const Icon = item.icon;
            const style = accentStyles[item.accentColor];

            return (
              <motion.div
                key={item.label}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`group relative overflow-hidden rounded-3xl border border-white/60 bg-zinc-950/40 p-7 backdrop-blur-md transition-all duration-300 ${style.border} ${style.glow}`}
              >
                {/* Accent glow corner */}
                <div 
                  className="absolute -right-12 -top-12 h-24 w-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: item.glowColor }}
                />
                
                {/* Subtle linear light sweep from top-left */}
                <div className="absolute inset-0 bg-linear-to-br from-white/1.5 via-transparent to-transparent pointer-events-none" />

                {/* Animated Bottom border highlight line */}
                <div className={`absolute -bottom-px left-8 right-8 h-px bg-linear-to-r ${style.bar} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

                {/* Icon Box */}
                <div className="relative">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-300 ${style.iconBg}`}>
                    <Icon className="h-5.5 w-5.5" />
                  </div>
                </div>

                {/* Text Content */}
                <div className="mt-8">
                  <h3 className="text-4xl font-bold tracking-tight text-white flex items-baseline">
                    <CountUp
                      end={item.value}
                      duration={3.2}
                      separator=","
                      enableScrollSpy
                      scrollSpyOnce
                    />
                    <span className={`ml-0.5 ${style.suffix}`}>{item.suffix || ""}</span>
                  </h3>
                  
                  <p className="mt-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300">
                    {item.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;

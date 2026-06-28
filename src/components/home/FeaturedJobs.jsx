"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiDollarSign,
  FiArrowRight,
  FiArrowLeft,
  FiClock,
  FiBookmark,
} from "react-icons/fi";

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Fetch all jobs, just like the /jobs page does, so we get the real database items
        const res = await fetch("http://localhost:5000/api/jobs");
        if (res.ok) {
          const data = await res.json();
          // Show up to 8 real jobs from the database
          setJobs(data.slice(0, 8));
        } else {
          throw new Error("Failed to fetch");
        }
      } catch (error) {
        console.error("Error fetching jobs for slider:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  const formatCurrency = (amount, currency = "USD") => {
    if (!amount) return "";
    if (currency === "USD") return `$${amount}`;
    if (currency === "EUR") return `€${amount}`;
    if (currency === "GBP") return `£${amount}`;
    return `${amount} ${currency}`;
  };

  return (
    <section className="py-10 bg-[#030303] text-white relative overflow-hidden">
      {/* Background Subtle Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 -z-10 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] -translate-y-1/2 -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                Top{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                  Featured
                </span>{" "}
                Jobs
              </h2>
              <p className="text-zinc-400 text-lg">
                Discover elite opportunities hand-picked just for you. Apply to
                top-tier companies worldwide.
              </p>
            </motion.div>
          </div>

          {/* Slider Controls & View All */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 mr-4">
              <button
                onClick={scrollLeft}
                className="w-12 h-12 rounded-full border border-white/10 bg-zinc-900/50 flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 transition-all text-zinc-400 hover:text-white"
              >
                <FiArrowLeft className="text-xl" />
              </button>
              <button
                onClick={scrollRight}
                className="w-12 h-12 rounded-full border border-white/10 bg-zinc-900/50 flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 transition-all text-zinc-400 hover:text-white"
              >
                <FiArrowRight className="text-xl" />
              </button>
            </div>
            <Link
              href="/jobs"
              className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-all"
            >
              View All{" "}
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Pro-Level Horizontal Slider */}
      <div className="relative w-full pl-4 sm:pl-6 md:pl-8 lg:pl-[calc((100vw-1280px)/2+24px)] 2xl:pl-[calc((100vw-1536px)/2+24px)]">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 pb-12 pt-4 px-4 snap-x snap-mandatory hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {loading
            ? // Skeleton Loaders
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="min-w-[340px] md:min-w-[400px] h-[320px] bg-zinc-900/40 border border-white/5 rounded-3xl animate-pulse shrink-0 snap-center"
                ></div>
              ))
            : jobs.map((job, index) => (
                <motion.div
                  key={job._id || index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="min-w-[320px] md:min-w-[380px] shrink-0 snap-center group"
                >
                  <div className="bg-[#09090b] border border-white/10 hover:border-blue-500/30 rounded-[2rem] p-7 h-full flex flex-col justify-between transition-all duration-500 hover:shadow-[0_0_40px_-15px_rgba(37,99,235,0.3)] hover:-translate-y-1.5 relative overflow-hidden z-10">
                    {/* Subtle Gradient overlay on hover */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-screen" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen" />

                    <div className="relative z-20">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-3 shadow-inner group-hover:scale-105 group-hover:border-blue-500/30 group-hover:bg-blue-500/5 transition-all duration-300 shrink-0">
                          {job.companyLogo ? (
                            <Image
                              src={job.companyLogo}
                              alt={job.companyName || "Company"}
                              width={40}
                              height={40}
                              className="object-contain drop-shadow-md"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-inner">
                              {job.companyName
                                ? job.companyName.charAt(0)
                                : "C"}
                            </div>
                          )}
                        </div>

                        {job.jobCategory && (
                          <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
                            {job.jobCategory}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-indigo-300 transition-all duration-300 mb-1.5 leading-tight tracking-tight line-clamp-1">
                        {job.jobTitle}
                      </h3>
                      <p className="text-zinc-400 text-[13px] font-semibold tracking-wide uppercase mb-6">
                        {job.companyName}
                      </p>

                      <div className="grid grid-cols-2 gap-3 mb-8">
                        <div className="flex items-center gap-2.5 bg-white/5 border border-white/5 px-3.5 py-2.5 rounded-xl text-[11px] font-semibold text-zinc-300 group-hover:bg-white/10 transition-colors uppercase tracking-wider">
                          <FiClock className="text-zinc-400 w-3.5 h-3.5" />
                          <span className="truncate">
                            {job.jobType?.replace("-", " ")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5 bg-white/5 border border-white/5 px-3.5 py-2.5 rounded-xl text-[11px] font-semibold text-zinc-300 group-hover:bg-white/10 transition-colors uppercase tracking-wider">
                          <FiMapPin className="text-blue-400/70 w-3.5 h-3.5" />
                          <span className="truncate">
                            {job.isRemote ? "Remote" : job.location || "Remote"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="relative z-20 flex items-center justify-between mt-auto pt-5 border-t border-white/5">
                      <div className="flex flex-col">
                        <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-semibold mb-1">
                          Salary
                        </span>
                        <span className="text-white font-bold text-[15px] flex items-center">
                          <FiDollarSign className="text-amber-400 mr-0.5" />
                          {job.minSalary && job.maxSalary
                            ? `${formatCurrency(job.minSalary, job.currency)} - ${formatCurrency(job.maxSalary, job.currency)}/m`
                            : job.minSalary
                              ? `From ${formatCurrency(job.minSalary, job.currency)}/m`
                              : "Negotiable"}
                        </span>
                      </div>

                      <Link
                        href={`/jobs/${job._id}`}
                        className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-blue-600 flex items-center justify-center text-white transition-colors duration-300 transform group-hover:scale-110 shrink-0"
                      >
                        <FiArrowRight className="text-lg -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default FeaturedJobs;

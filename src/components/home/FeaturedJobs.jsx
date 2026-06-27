"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiMapPin, FiDollarSign, FiArrowRight } from 'react-icons/fi';

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/jobs?status=Active');
        if (res.ok) {
          const data = await res.json();
          setJobs(data.slice(0, 6)); // Top 6 featured jobs
        } else {
          throw new Error('Failed to fetch');
        }
      } catch (error) {
        console.error('Error fetching jobs, using fallbacks', error);
        setJobs([
          { _id: '1', jobTitle: 'Senior Frontend Developer', companyName: 'TechNova', location: 'New York, USA', jobType: 'Full-time', salaryRange: { min: 120000, max: 150000 }, isRemote: true },
          { _id: '2', jobTitle: 'Product Designer', companyName: 'CreativeSpace', location: 'London, UK', jobType: 'Remote', salaryRange: { min: 90000, max: 110000 }, isRemote: true },
          { _id: '3', jobTitle: 'Backend Engineer (Node.js)', companyName: 'Streamline', location: 'Berlin, Germany', jobType: 'Contract', salaryRange: { min: 80000, max: 100000 }, isRemote: false },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section className="py-24 bg-[#030303] text-white border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Featured <span className="text-blue-500">Opportunities</span>
            </h2>
            <p className="text-zinc-400 text-lg">
              Explore hand-picked jobs from top companies around the world. Find your next career move today.
            </p>
          </div>
          <Link href="/jobs" className="mt-6 md:mt-0 flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-all hover:gap-3">
            View All Jobs <FiArrowRight />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-zinc-900/50 h-64 w-full rounded-3xl border border-white/5"></div>
            ))}
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {jobs.map((job) => (
              <motion.div 
                key={job._id} 
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-zinc-900/40 rounded-3xl p-6 border border-white/10 shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all group backdrop-blur-sm"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-xl border border-blue-500/20">
                    {job.companyName ? job.companyName.charAt(0) : 'C'}
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-zinc-300 border border-white/10">
                    {job.jobType}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  {job.jobTitle}
                </h3>
                <p className="text-zinc-400 mb-6 text-sm">{job.companyName}</p>
                
                <div className="flex flex-col gap-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <FiMapPin className="text-zinc-500" />
                    {job.isRemote ? 'Remote' : job.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <FiDollarSign className="text-zinc-500" />
                    {job.salaryRange?.min ? `$${(job.salaryRange.min/1000).toFixed(0)}k` : 'Competitive'} 
                    {job.salaryRange?.max && ` - $${(job.salaryRange.max/1000).toFixed(0)}k`}
                  </div>
                </div>
                
                <Link href={`/jobs/${job._id}`} className="block w-full py-3 text-center rounded-xl bg-white/5 hover:bg-blue-600 border border-white/10 hover:border-blue-500 text-white font-medium transition-all">
                  Apply Now
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FeaturedJobs;

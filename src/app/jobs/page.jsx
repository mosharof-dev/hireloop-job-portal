import { getAllJobs } from '@/lib/api/jobs';
import React from 'react';
import JobListing from '@/components/jobs/JobListing';
import { FiAlertCircle } from 'react-icons/fi';
import Link from 'next/link';

const GetAllJobs = async () => {
    let jobs = null;
    let error = null;

    try {
        jobs = await getAllJobs();
    } catch (err) {
        error = err.message || "Failed to connect to the server.";
    }

    const isError = error || !jobs;

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">All Jobs</h1>
                <p className="text-zinc-400">
                    {!isError ? `Find your dream job from our available positions` : "Explore our open positions"}
                </p>
            </div>
            
            {isError ? (
                <div className="flex flex-col items-center justify-center py-24 px-4 bg-[#121214] rounded-3xl border border-red-500/20 shadow-lg shadow-red-500/5 overflow-hidden relative">
                    <div className="absolute inset-0 bg-linear-to-b from-red-500/5 to-transparent pointer-events-none"></div>
                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-5 border border-red-500/20 relative z-10">
                        <FiAlertCircle className="w-8 h-8 text-red-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 relative z-10">Connection Error</h3>
                    <p className="text-zinc-400 text-center max-w-md mb-8 relative z-10">
                        We&apos;re having trouble connecting to our servers right now. Please ensure your internet connection is stable and try again.
                    </p>
                    <Link 
                        href="/jobs" 
                        className="px-6 py-2.5 bg-white text-black hover:bg-zinc-200 rounded-xl font-bold transition-all duration-200 active:scale-[0.98] relative z-10"
                    >
                        Try Again
                    </Link>
                </div>
            ) : (
                <JobListing initialJobs={jobs} />
            )}
        </div>
    );
};

export default GetAllJobs;
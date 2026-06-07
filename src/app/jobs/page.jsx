import { getAllJobs } from '@/lib/api/jobs';
import React from 'react';
import JobCard from '@/components/jobs/JobCard';
import { FiAlertCircle, FiSearch } from 'react-icons/fi';

const GetAllJobs = async () => {
    let jobs = null;
    let error = null;

    try {
        jobs = await getAllJobs();
    } catch (err) {
        error = err.message || "Failed to connect to the server.";
    }

    const isError = error || !jobs;
    const isEmpty = jobs && jobs.length === 0;

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">All Jobs</h1>
                <p className="text-zinc-400">
                    {!isError && !isEmpty ? `Find your dream job from our ${jobs.length} available positions` : "Explore our open positions"}
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
                    <a 
                        href="/jobs" 
                        className="px-6 py-2.5 bg-white text-black hover:bg-zinc-200 rounded-xl font-bold transition-all duration-200 active:scale-[0.98] relative z-10"
                    >
                        Try Again
                    </a>
                </div>
            ) : isEmpty ? (
                <div className="flex flex-col items-center justify-center py-24 px-4 bg-[#121214] rounded-3xl border border-zinc-800/80 shadow-inner overflow-hidden relative">
                    <div className="absolute inset-0 bg-linear-to-b from-blue-500/5 to-transparent pointer-events-none"></div>
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-5 border border-blue-500/20 relative z-10">
                        <FiSearch className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 relative z-10">No Jobs Available</h3>
                    <p className="text-zinc-400 text-center max-w-md relative z-10">
                        We couldn&apos;t find any job postings at the moment. Please check back later or set up a job alert to stay updated.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {jobs.map((job) => (
                        <JobCard key={job._id} job={job} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default GetAllJobs;
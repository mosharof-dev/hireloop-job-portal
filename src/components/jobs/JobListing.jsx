"use client";

import React, { useState, useMemo } from 'react';
import JobCard from './JobCard';
import JobFilter from './JobFilter';
import { FiSearch } from 'react-icons/fi';

const JobListing = ({ initialJobs }) => {
    const [filters, setFilters] = useState({
        search: '',
        jobType: '',
        jobCategory: '',
        isRemote: false
    });

    const filteredJobs = useMemo(() => {
        if (!initialJobs) return [];
        return initialJobs.filter((job) => {
            // 1. Search (Title or Company Name)
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                const titleMatch = job.jobTitle?.toLowerCase().includes(searchLower);
                const companyMatch = job.companyName?.toLowerCase().includes(searchLower);
                if (!titleMatch && !companyMatch) return false;
            }

            // 2. Job Type
            if (filters.jobType) {
                if (job.jobType !== filters.jobType) return false;
            }

            // 3. Category
            if (filters.jobCategory) {
                if (job.jobCategory?.toLowerCase() !== filters.jobCategory.toLowerCase()) return false;
            }

            // 4. Remote Status
            if (filters.isRemote) {
                if (!job.isRemote) return false;
            }

            return true;
        });
    }, [initialJobs, filters]);

    const isEmpty = filteredJobs.length === 0;

    return (
        <div>
            {/* Filter Section */}
            <JobFilter filters={filters} setFilters={setFilters} />

            {/* Jobs Grid */}
            {isEmpty ? (
                <div className="flex flex-col items-center justify-center py-24 px-4 bg-[#121214] rounded-3xl border border-zinc-800/80 shadow-inner overflow-hidden relative">
                    <div className="absolute inset-0 bg-linear-to-b from-blue-500/5 to-transparent pointer-events-none"></div>
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-5 border border-blue-500/20 relative z-10">
                        <FiSearch className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 relative z-10">No Jobs Found</h3>
                    <p className="text-zinc-400 text-center max-w-md relative z-10">
                        We couldn&apos;t find any job postings matching your current filters. Please try adjusting your search criteria.
                    </p>
                    <button 
                        onClick={() => setFilters({ search: '', jobType: '', jobCategory: '', isRemote: false })}
                        className="mt-6 px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-bold transition-all duration-200 active:scale-[0.98] relative z-10"
                    >
                        Clear Filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredJobs.map((job) => (
                        <JobCard key={job._id} job={job} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default JobListing;

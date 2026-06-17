"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import JobCard from './JobCard';
import JobFilter from './JobFilter';
import { FiSearch } from 'react-icons/fi';

const JobListing = ({ initialJobs }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [filters, setFilters] = useState({
        search: searchParams.get('search') || '',
        jobType: searchParams.get('jobType') || '',
        jobCategory: searchParams.get('jobCategory') || '',
        isRemote: searchParams.get('isRemote') === 'true'
    });
    
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
    const itemsPerPage = 12;

    const handleFilterChange = (updater) => {
        setFilters(updater);
        setCurrentPage(1);
    };

    // Sync state to URL with debounce to avoid excessive router pushes and create a shareable URL
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            
            if (filters.search) params.set('search', filters.search);
            else params.delete('search');
            
            if (filters.jobType) params.set('jobType', filters.jobType);
            else params.delete('jobType');
            
            if (filters.jobCategory) params.set('jobCategory', filters.jobCategory);
            else params.delete('jobCategory');
            
            if (filters.isRemote) params.set('isRemote', 'true');
            else params.delete('isRemote');

            if (currentPage > 1) params.set('page', currentPage.toString());
            else params.delete('page');

            const newQuery = params.toString();
            if (newQuery !== searchParams.toString()) {
                router.replace(`${pathname}?${newQuery}`, { scroll: false });
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [filters, currentPage, pathname, router, searchParams]);

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

    // Pagination calculations
    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage);

    const isEmpty = filteredJobs.length === 0;

    return (
        <div>
            {/* Filter Section */}
            <JobFilter filters={filters} setFilters={handleFilterChange} />

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
                        onClick={() => handleFilterChange({ search: '', jobType: '', jobCategory: '', isRemote: false })}
                        className="mt-6 px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-bold transition-all duration-200 active:scale-[0.98] relative z-10"
                    >
                        Clear Filters
                    </button>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {paginatedJobs.map((job) => (
                            <JobCard key={job._id} job={job} />
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center mt-16 pt-8 border-t border-zinc-800/50 gap-2 sm:gap-3 flex-wrap">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-medium transition-all duration-200 ${
                                    currentPage === 1 
                                    ? 'bg-zinc-800/30 text-zinc-600 cursor-not-allowed border border-zinc-800/50' 
                                    : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-zinc-700 active:scale-[0.98]'
                                }`}
                            >
                                Previous
                            </button>
                            
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl font-bold flex items-center justify-center transition-all duration-200 ${
                                            currentPage === page
                                            ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)] border border-blue-500'
                                            : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-800'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-medium transition-all duration-200 ${
                                    currentPage === totalPages 
                                    ? 'bg-zinc-800/30 text-zinc-600 cursor-not-allowed border border-zinc-800/50' 
                                    : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-zinc-700 active:scale-[0.98]'
                                }`}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default JobListing;

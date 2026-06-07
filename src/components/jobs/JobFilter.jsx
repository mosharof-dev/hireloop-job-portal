"use client";

import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiChevronDown } from 'react-icons/fi';

const CustomSelect = ({ label, value, options, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div className="w-full sm:w-[160px] relative" ref={dropdownRef}>
            <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                {label}
            </label>
            <div 
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full bg-[#1A1A1D] border ${isOpen ? 'border-blue-500/50 ring-1 ring-blue-500/50' : 'border-zinc-800'} text-white rounded-xl py-3 px-4 flex items-center justify-between cursor-pointer transition-all text-sm`}
            >
                <span className="truncate">{selectedOption ? selectedOption.label : 'Select...'}</span>
                <FiChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            {isOpen && (
                <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-[#1A1A1D] border border-zinc-800 rounded-xl shadow-xl shadow-black/40 overflow-hidden py-1">
                    {options.map((opt) => (
                        <div
                            key={opt.value}
                            onClick={() => {
                                onChange(opt.value);
                                setIsOpen(false);
                            }}
                            className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${value === opt.value ? 'bg-blue-600/10 text-blue-400 font-medium' : 'text-zinc-300 hover:bg-zinc-800/50'}`}
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const JobFilter = ({ filters, setFilters }) => {
    const handleSearchChange = (e) => {
        setFilters(prev => ({ ...prev, search: e.target.value }));
    };

    const handleRemoteChange = (e) => {
        setFilters(prev => ({ ...prev, isRemote: e.target.checked }));
    };

    const jobTypeOptions = [
        { value: '', label: 'All Types' },
        { value: 'full-time', label: 'Full-time' },
        { value: 'part-time', label: 'Part-time' },
        { value: 'contract', label: 'Contract' },
        { value: 'internship', label: 'Internship' },
    ];

    const categoryOptions = [
        { value: '', label: 'All Categories' },
        { value: 'engineering', label: 'Engineering' },
        { value: 'design', label: 'Design' },
        { value: 'data', label: 'Data' },
        { value: 'management', label: 'Management' },
        { value: 'security', label: 'Security' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'business', label: 'Business' },
        { value: 'customer-service', label: 'Customer Service' },
    ];

    return (
        <div className="bg-[#121214] rounded-2xl border border-zinc-800/80 p-4 sm:p-5 mb-8 shadow-lg shadow-black/20 relative z-20 w-full">
            <div className="flex flex-col lg:flex-row gap-4 items-end lg:items-center">
                
                {/* Search Input */}
                <div className="flex-1 w-full relative">
                    <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                        Search Jobs
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-blue-500 transition-colors">
                            <FiSearch className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            placeholder="e.g. Frontend Developer"
                            value={filters.search}
                            onChange={handleSearchChange}
                            className="w-full bg-[#1A1A1D] border border-zinc-800 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-zinc-600 text-sm"
                        />
                    </div>
                </div>

                {/* Filters Group */}
                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                    {/* Job Type Dropdown */}
                    <CustomSelect 
                        label="Job Type"
                        value={filters.jobType}
                        options={jobTypeOptions}
                        onChange={(val) => setFilters(prev => ({ ...prev, jobType: val }))}
                    />

                    {/* Category Dropdown */}
                    <CustomSelect 
                        label="Category"
                        value={filters.jobCategory}
                        options={categoryOptions}
                        onChange={(val) => setFilters(prev => ({ ...prev, jobCategory: val }))}
                    />
                </div>

                {/* Remote Checkbox */}
                <div className="flex items-center gap-3 pt-3 lg:pt-0 lg:pb-0 lg:mb-1 cursor-pointer">
                    <label className="relative flex items-center cursor-pointer group">
                        <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={filters.isRemote}
                            onChange={handleRemoteChange}
                        />
                        <div className="w-5 h-5 bg-[#1A1A1D] border border-zinc-700 rounded peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-colors flex items-center justify-center group-hover:border-zinc-500 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500/50">
                            <svg 
                                className={`w-3.5 h-3.5 text-white pointer-events-none transition-transform duration-200 ${filters.isRemote ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} 
                                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium text-zinc-300 ml-3 select-none">
                            Remote
                        </span>
                    </label>
                </div>
                
            </div>
        </div>
    );
};

export default JobFilter;

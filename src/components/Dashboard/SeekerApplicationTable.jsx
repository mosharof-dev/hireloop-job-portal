import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiCode, FiPenTool, FiDatabase, FiCloud, FiCpu, FiBriefcase } from 'react-icons/fi';

function timeAgo(dateString) {
    if (!dateString) return "just now";
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return interval + " year" + (interval === 1 ? "" : "s") + " ago";
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return interval + " month" + (interval === 1 ? "" : "s") + " ago";
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return interval + " day" + (interval === 1 ? "" : "s") + " ago";
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval + " hour" + (interval === 1 ? "" : "s") + " ago";
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return interval + " minute" + (interval === 1 ? "" : "s") + " ago";
    return "just now";
}

const getJobIcon = (title) => {
    if (!title) return <FiBriefcase className="w-5 h-5 text-zinc-400" />;
    const t = title.toLowerCase();
    if (t.includes('frontend') || t.includes('developer') || t.includes('software') || t.includes('stack')) return <FiCode className="w-5 h-5 text-zinc-400" />;
    if (t.includes('design') || t.includes('ui') || t.includes('ux')) return <FiPenTool className="w-5 h-5 text-zinc-400" />;
    if (t.includes('data') || t.includes('analytics')) return <FiDatabase className="w-5 h-5 text-zinc-400" />;
    if (t.includes('cloud') || t.includes('architect')) return <FiCloud className="w-5 h-5 text-zinc-400" />;
    if (t.includes('ai') || t.includes('machine learning')) return <FiCpu className="w-5 h-5 text-zinc-400" />;
    return <FiBriefcase className="w-5 h-5 text-zinc-400" />;
}

const getStatusBadge = (status) => {
    const s = status?.toLowerCase() || 'applied';
    
    switch (s) {
        case 'review':
            return <span className="inline-flex items-center px-3 py-1 rounded-full border border-amber-500 text-amber-500 text-[11px] font-bold tracking-wide bg-transparent">Review</span>;
        case 'shortlisted':
            return <span className="inline-flex items-center px-3 py-1 rounded-full border border-emerald-500 text-emerald-500 text-[11px] font-bold tracking-wide bg-transparent">Shortlisted</span>;
        case 'rejected':
            return <span className="inline-flex items-center px-3 py-1 rounded-full border border-red-500 text-red-500 text-[11px] font-bold tracking-wide bg-transparent">Rejected</span>;
        case 'offered':
            return <span className="inline-flex items-center px-3 py-1 rounded-full border border-white text-white text-[11px] font-bold tracking-wide bg-transparent">Offered</span>;
        case 'applied':
        default:
            return <span className="inline-flex items-center px-3 py-1 rounded-full border border-white text-white text-[11px] font-bold tracking-wide bg-transparent">Applied</span>;
    }
}

export default function SeekerApplicationTable({ jobs }) {
    if (!jobs || jobs.length === 0) {
        return (
            <div className="w-full border border-white/8 bg-[#121214] rounded-2xl overflow-hidden shadow-2xl p-16 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-4">
                    <FiBriefcase className="w-8 h-8 text-zinc-500" />
                </div>
                <h3 className="text-white text-lg font-semibold mb-2">No Applications Yet</h3>
                <p className="text-zinc-400 max-w-sm mx-auto mb-6">
                    You haven&apos;t applied to any jobs yet. Start exploring available positions to kickstart your career.
                </p>
                <Link 
                    href="/jobs"
                    className="inline-flex items-center justify-center px-6 py-2.5 bg-white text-black hover:bg-zinc-200 rounded-full font-bold transition-all active:scale-95"
                >
                    Browse Jobs
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full border border-white/8 bg-[#121214] rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse min-w-225">
                    <thead>
                        <tr className="border-b border-white/8 bg-white/2">
                            <th className="py-4 px-6 text-[13px] font-semibold tracking-wide text-zinc-400 uppercase w-[35%]">Job Title</th>
                            <th className="py-4 px-6 text-[13px] font-semibold tracking-wide text-zinc-400 uppercase w-[20%]">Company</th>
                            <th className="py-4 px-6 text-[13px] font-semibold tracking-wide text-zinc-400 uppercase w-[15%]">Applied</th>
                            <th className="py-4 px-6 text-[13px] font-semibold tracking-wide text-zinc-400 uppercase w-[15%]">Status</th>
                            <th className="py-4 px-6 text-[13px] font-semibold tracking-wide text-zinc-400 uppercase w-[15%] text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {jobs.map((job) => (
                            <tr key={job._id || job.id} className="hover:bg-white/2 transition-colors group">
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-11 h-11 shrink-0 bg-[#1A1A1D] border border-white/8 rounded-xl flex items-center justify-center overflow-hidden">
                                            {job.companyLogo ? (
                                                <Image 
                                                    src={job.companyLogo} 
                                                    alt={job.companyName || 'Company Logo'} 
                                                    width={44} 
                                                    height={44} 
                                                    className="object-cover w-full h-full"
                                                />
                                            ) : (
                                                getJobIcon(job.jobTitle)
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="text-white font-medium text-[15px] truncate">{job.jobTitle || 'Unknown Position'}</h3>
                                            <p className="text-zinc-500 text-[13px] mt-0.5 truncate">
                                                {job.jobType || 'Full-time'} • {job.workMode || 'Remote'}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="text-zinc-300 text-[14.5px]">{job.companyName || 'Unknown Company'}</span>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="text-zinc-400 text-[14px]">{timeAgo(job.createdAt)}</span>
                                </td>
                                <td className="py-4 px-6">
                                    {getStatusBadge(job.status)}
                                </td>
                                <td className="py-4 px-6 text-right">
                                    <Link 
                                        href={`/jobs/${job.jobId}`} 
                                        className="text-zinc-400 hover:text-white text-[14px] font-medium transition-colors inline-block"
                                    >
                                        Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

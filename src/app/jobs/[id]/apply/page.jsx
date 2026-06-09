import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import { FiAlertTriangle, FiArrowLeft } from 'react-icons/fi';
import { getJobById } from '@/lib/api/jobs';
import JobApply from './JobApply';
const ApplyPage = async ({ params }) => {
    const {id} = await params;
    const user = await getUserSession();

    if (!user) {
        redirect(`/signin?redirect=/jobs/${id}/apply`);
    }

    if (user.role !== 'seeker') {
        return (
            <div className=" my-12 bg-[#09090b] flex flex-col items-center justify-center p-4 relative overflow-hidden">
                {/* Background glow effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-rose-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

                <div className="relative z-10 max-w-lg w-full bg-[#121214]/80 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 sm:p-10 shadow-2xl text-center flex flex-col items-center">
                    {/* Icon container with pulsing glow */}
                    <div className="relative mb-8 group">
                        <div className="absolute inset-0 bg-rose-500/20 rounded-full blur-xl scale-150 animate-pulse"></div>
                        <div className="relative w-20 h-20 bg-linear-to-br from-rose-500/20 to-red-600/10 border border-rose-500/20 rounded-2xl flex items-center justify-center shadow-inner">
                            <FiAlertTriangle className="w-10 h-10 text-rose-400" />
                        </div>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">Access Restricted</h1>
                    <p className="text-zinc-400 text-base leading-relaxed mb-8">
                        We&apos;re sorry, but only <span className="text-white font-medium">Job Seekers</span> are allowed to apply for jobs. You are currently logged in with a recruiter or employer account.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                        <Link 
                            href={`/jobs/${id}`}
                            className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl py-3.5 font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <FiArrowLeft className="w-4 h-4" /> Go Back
                        </Link>
                        <Link 
                            href="/dashboard/recruiter"
                            className="flex-1 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl py-3.5 font-bold shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_-5px_rgba(37,99,235,0.6)] transition-all duration-300 hover:scale-[1.02] flex items-center justify-center"
                        >
                            Go to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const job = await getJobById(id);
    return (
        <div>
            <JobApply applicant={user} job={job} />
        </div>
    );
};

export default ApplyPage;
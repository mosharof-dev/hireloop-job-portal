import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import { FiAlertTriangle, FiArrowLeft, FiInfo, FiStar, FiCheckCircle } from 'react-icons/fi';
import { getJobById } from '@/lib/api/jobs';
import JobApply from './JobApply';
import { getApplicationByApplicant } from '@/lib/api/application';
import { getPlanById } from '@/lib/api/plans';

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
    let planData = await getPlanById(user.plan);
    const plan = Array.isArray(planData) ? planData[0] : planData;
    console.log("User's current plan details:", plan); // Debug log to check the plan details
   
    
    // Safety check in case getApplicationByApplicant fails or returns undefined
    let application = [];
    try {
        application = await getApplicationByApplicant(user.id);
    } catch (e) {
        console.error("Failed to fetch applications:", e);
    }

    const job = await getJobById(id);
    
    const maxApps = plan?.maxApplicationsPerMonth || 0;
    const isUnlimited = maxApps === 999999;
    const hasReachedLimit = !isUnlimited && application.length >= maxApps;
    const applicationsLeft = isUnlimited ? 'Unlimited' : Math.max(0, maxApps - application.length);

    return (
        <div className="bg-[#09090b] min-h-screen pb-12">
            {/* Top Status Bar / Banner */}
            <div className="max-w-4xl mx-auto pt-8 px-4 sm:px-6 lg:px-8">
                {!hasReachedLimit ? (
                    <div className="relative w-full max-w-3xl mx-auto mb-8 group">
                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-blue-500/5 rounded-[2rem] blur-xl transition-all duration-500 group-hover:bg-blue-500/10"></div>
                        
                        <div className="relative bg-[#121214]/80 backdrop-blur-xl border border-white/5 rounded-[2rem] p-5 sm:p-6 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-all duration-300 hover:border-white/10">
                            
                            <div className="flex items-center gap-5">
                                {/* Icon container with pulsing glow matching website theme */}
                                <div className="relative shrink-0">
                                    <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-lg scale-150 animate-pulse"></div>
                                    <div className="relative w-14 h-14 bg-linear-to-br from-blue-500/20 to-indigo-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center shadow-inner">
                                        {isUnlimited ? (
                                            <FiCheckCircle className="w-6 h-6 text-blue-400" />
                                        ) : (
                                            <FiInfo className="w-6 h-6 text-blue-400" />
                                        )}
                                    </div>
                                </div>
                                
                                <div>
                                    <p className="text-white text-base sm:text-lg font-bold tracking-tight">
                                        You have used <span className="text-blue-400">{application.length}</span> out of <span className="text-blue-400">{isUnlimited ? 'Unlimited' : maxApps}</span> applications.
                                    </p>
                                    <p className="text-zinc-400 text-sm mt-1">
                                        {applicationsLeft} application{applicationsLeft !== 1 ? 's' : ''} remaining in your <span className="text-white font-semibold">{plan?.name || 'Plan'}</span>.
                                    </p>
                                </div>
                            </div>

                            <Link 
                                href="/pricing" 
                                className="w-full sm:w-auto shrink-0 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl px-6 py-3.5 font-bold shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_-5px_rgba(37,99,235,0.6)] transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                            >
                                <FiStar className="w-4 h-4" />
                                Upgrade Plan
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="mt-8 relative max-w-lg mx-auto">
                        {/* Premium Glow Background */}
                        <div className="absolute inset-0 bg-linear-to-r from-amber-500/20 to-orange-600/20 rounded-[2rem] blur-2xl opacity-60"></div>
                        
                        <div className="relative bg-[#121214]/90 backdrop-blur-xl border border-amber-500/20 rounded-[2rem] p-8 sm:p-10 shadow-2xl text-center flex flex-col items-center">
                            <div className="relative mb-6 group">
                                <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl scale-150 animate-pulse"></div>
                                <div className="relative w-20 h-20 bg-linear-to-br from-amber-500/20 to-orange-600/20 border border-amber-500/30 rounded-2xl flex items-center justify-center shadow-inner">
                                    <FiStar className="w-10 h-10 text-amber-400" />
                                </div>
                            </div>
                            
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">Application Limit Reached</h2>
                            <p className="text-zinc-400 text-base leading-relaxed mb-6">
                                You have used all <span className="text-white font-bold">{maxApps}</span> applications for your <span className="text-amber-400 font-medium">{plan?.name || 'Plan'}</span> this month. Upgrade to a premium plan to unlock unlimited opportunities!
                            </p>

                            <div className="flex flex-col gap-3 w-full">
                                <div className="flex items-center justify-center gap-2 text-sm text-zinc-300 mb-2">
                                    <FiCheckCircle className="text-emerald-500" /> Apply to more jobs instantly
                                </div>
                                <Link 
                                    href="/pricing"
                                    className="w-full bg-linear-to-r from-amber-500 to-orange-600 text-white rounded-xl py-3.5 font-bold shadow-[0_0_20px_-5px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.6)] transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                                >
                                    <FiStar className="w-5 h-5" /> Upgrade Plan Now
                                </Link>
                                <Link 
                                    href={`/jobs/${id}`}
                                    className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl py-3.5 font-semibold transition-all duration-300 flex items-center justify-center gap-2 mt-2"
                                >
                                    <FiArrowLeft className="w-4 h-4" /> Back to Job Details
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* The Job Apply Form */}
            {!hasReachedLimit && <JobApply applicant={user} job={job} />}
        </div>
    );
};

export default ApplyPage;
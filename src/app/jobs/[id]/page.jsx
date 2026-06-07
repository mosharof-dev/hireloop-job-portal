import { getJobById } from '@/lib/api/jobs';
import Image from 'next/image';
import Link from 'next/link';
import { 
    FiBriefcase, 
    FiDollarSign, 
    FiClock, 
    FiCalendar, 
    FiCheckCircle, 
    FiArrowRight, 
    FiArrowLeft,
    FiGlobe, 
    FiShare2, 
    FiBookmark,
    FiStar,
    FiShield
} from 'react-icons/fi';

const formatCurrency = (amount, currency) => {
    if (!amount) return '';
    if (currency === 'USD') return `$${amount}`;
    if (currency === 'EUR') return `€${amount}`;
    if (currency === 'GBP') return `£${amount}`;
    return `${amount} ${currency}`;
};

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
};

const splitToBullets = (text) => {
    if (!text) return [];
    return text.split('. ').filter(s => s.trim().length > 0).map(s => s.trim() + (s.endsWith('.') ? '' : '.'));
};

const JobDetailsPage = async ({ params }) => {
    const { id } = await params;
    const job = await getJobById(id);

    if (!job) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center bg-[#09090b]">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold text-white">Job Not Found</h2>
                    <p className="text-zinc-500">The job you are looking for does not exist or has been removed.</p>
                </div>
            </div>
        );
    }

    const {
        jobTitle,
        jobCategory,
        jobType,
        minSalary,
        maxSalary,
        currency,
        deadline,
        responsibilities,
        requirements,
        benefits,
        isRemote,
        companyName,
        companyLogo,
        createdAt
    } = job;

    const salaryText = minSalary && maxSalary 
        ? `${formatCurrency(minSalary, currency)} - ${formatCurrency(maxSalary, currency)}/month`
        : minSalary 
            ? `From ${formatCurrency(minSalary, currency)}/month` 
            : 'Salary Negotiable';

    const respList = splitToBullets(responsibilities);
    const reqList = splitToBullets(requirements);
    const benList = splitToBullets(benefits);

    return (
        <div className="min-h-screen bg-[#09090b] text-zinc-300 pb-24 selection:bg-blue-500/30 font-sans">
            {/* HERO SECTION - Premium Glassmorphic Design */}
            <div className="relative border-b border-white/5 pt-20 pb-16 overflow-hidden">
                {/* Abstract Ambient Background Glows */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
                
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
                    {/* Top Navigation */}
                    <div className="flex items-center justify-between mb-8 md:mb-10">
                        <Link href="/" className="group flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors bg-white/[0.03] hover:bg-white/[0.08] px-4 py-2 rounded-xl border border-white/5 backdrop-blur-md">
                            <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
                            Back to Home
                        </Link>
                        <Link href="/jobs" className="group flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors bg-white/[0.03] hover:bg-white/[0.08] px-4 py-2 rounded-xl border border-white/5 backdrop-blur-md">
                            Browse All Jobs
                            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> 
                        </Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 lg:gap-10 items-start md:items-center">
                        
                        {/* Company Logo with floating effect */}
                        <div className="relative group shrink-0">
                            <div className="absolute inset-0 bg-linear-to-b from-blue-500/20 to-transparent blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#121214]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] flex items-center justify-center overflow-hidden p-6 shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-105 group-hover:border-white/20">
                                {companyLogo ? (
                                    <Image src={companyLogo} alt={companyName || 'Company'} width={100} height={100} className="object-contain drop-shadow-md" />
                                ) : (
                                    <div className="w-full h-full bg-linear-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-4xl shadow-inner">
                                        {companyName?.charAt(0) || 'C'}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Title & Core Info */}
                        <div className="flex-1 w-full">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                                    {jobCategory || 'General'}
                                </span>
                                {isRemote && (
                                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Remote
                                    </span>
                                )}
                            </div>
                            
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white via-white to-zinc-400 tracking-tight mb-4 drop-shadow-sm">
                                {jobTitle}
                            </h1>
                            
                            <h2 className="text-xl sm:text-2xl text-zinc-400 font-medium mb-8 flex items-center gap-2">
                                {companyName}
                            </h2>
                            
                            {/* Premium Badges */}
                            <div className="flex flex-wrap gap-3 sm:gap-4">
                                <div className="flex items-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl px-4 py-2.5 transition-colors backdrop-blur-md">
                                    <FiGlobe className="text-blue-400 w-4 h-4" />
                                    <span className="text-sm font-medium text-zinc-200">{isRemote ? 'Work from Anywhere' : 'On-site Role'}</span>
                                </div>
                                <div className="flex items-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl px-4 py-2.5 transition-colors backdrop-blur-md">
                                    <FiBriefcase className="text-indigo-400 w-4 h-4" />
                                    <span className="text-sm font-medium text-zinc-200 capitalize">{jobType?.replace('-', ' ')}</span>
                                </div>
                                <div className="flex items-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl px-4 py-2.5 transition-colors backdrop-blur-md">
                                    <FiDollarSign className="text-emerald-400 w-4 h-4" />
                                    <span className="text-sm font-medium text-zinc-200">{salaryText}</span>
                                </div>
                            </div>
                        </div>

                        {/* Top Actions (Desktop) */}
                        <div className="hidden lg:flex flex-col gap-3 shrink-0 min-w-[240px]">
                            {/* Animated Apply Button */}
                            <button className="w-full relative group overflow-hidden rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 text-white py-4 font-bold shadow-[0_0_40px_-10px_rgba(37,99,235,0.4)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_60px_-15px_rgba(37,99,235,0.6)]">
                                <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                                    Apply for this Job <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                            
                            <div className="flex gap-3">
                                <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 rounded-2xl py-3.5 flex items-center justify-center gap-2 transition-colors backdrop-blur-md font-medium">
                                    <FiBookmark className="w-4 h-4" /> Save
                                </button>
                                <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 rounded-2xl py-3.5 flex items-center justify-center gap-2 transition-colors backdrop-blur-md font-medium">
                                    <FiShare2 className="w-4 h-4" /> Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    
                    {/* Left Column (Details) */}
                    <div className="lg:col-span-8 space-y-16">
                        
                        {/* Responsibilities */}
                        {responsibilities && (
                            <section>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/20 flex items-center justify-center shadow-inner">
                                        <FiCheckCircle className="text-blue-400 w-5 h-5" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white tracking-tight">Responsibilities</h3>
                                </div>
                                <ul className="space-y-4">
                                    {respList.map((item, idx) => (
                                        <li key={idx} className="group flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300">
                                            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5 border border-blue-500/20 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                                                <FiCheckCircle className="w-4 h-4 text-blue-400" />
                                            </div>
                                            <span className="text-zinc-300 text-base leading-relaxed pt-1 font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Requirements */}
                        {requirements && (
                            <section>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-indigo-500/20 to-indigo-600/10 border border-indigo-500/20 flex items-center justify-center shadow-inner">
                                        <FiShield className="text-indigo-400 w-5 h-5" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white tracking-tight">Requirements</h3>
                                </div>
                                <ul className="space-y-4">
                                    {reqList.map((item, idx) => (
                                        <li key={idx} className="group flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300">
                                            <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5 border border-indigo-500/20 group-hover:bg-indigo-500/20 group-hover:scale-110 transition-all duration-300">
                                                <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                                            </div>
                                            <span className="text-zinc-300 text-base leading-relaxed pt-1 font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Benefits */}
                        {benefits && (
                            <section>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/20 flex items-center justify-center shadow-inner">
                                        <FiStar className="text-emerald-400 w-5 h-5" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white tracking-tight">Benefits & Perks</h3>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-5">
                                    {benList.map((item, idx) => (
                                        <div key={idx} className="group relative bg-[#121214] border border-white/5 rounded-3xl p-6 hover:border-emerald-500/30 transition-all duration-300 overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/5 hover:-translate-y-1">
                                            {/* Hover Glow */}
                                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-colors duration-500"></div>
                                            
                                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 border border-white/10 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-colors">
                                                <FiStar className="w-5 h-5 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                                            </div>
                                            <p className="text-zinc-300 text-[15px] leading-relaxed relative z-10 font-medium">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column (Floating Summary Card) */}
                    <div className="lg:col-span-4">
                        {/* Premium Floating Card */}
                        <div className="sticky top-28">
                            {/* Fancy gradient border wrapper */}
                            <div className="relative p-[1px] rounded-[2rem] bg-linear-to-b from-white/10 via-white/5 to-transparent shadow-2xl shadow-black/50">
                                <div className="bg-[#0f0f13]/90 backdrop-blur-2xl rounded-[2rem] p-8">
                                    
                                    <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                                        <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
                                        Job Overview
                                    </h3>
                                    
                                    <div className="space-y-6 mb-10">
                                        <div className="flex items-center gap-5 group">
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0 group-hover:border-blue-500/30 group-hover:bg-blue-500/10 transition-colors">
                                                <FiClock className="w-5 h-5 text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Date Posted</p>
                                                <p className="font-semibold text-zinc-200">{formatDate(createdAt)}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-5 group">
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0 group-hover:border-rose-500/30 group-hover:bg-rose-500/10 transition-colors">
                                                <FiCalendar className="w-5 h-5 text-rose-400" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Deadline</p>
                                                <p className="font-semibold text-zinc-200">{formatDate(deadline)}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-5 group">
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-colors">
                                                <FiGlobe className="w-5 h-5 text-emerald-400" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Location</p>
                                                <p className="font-semibold text-zinc-200">{isRemote ? 'Remote / Global' : 'On-site'}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-5 group">
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0 group-hover:border-indigo-500/30 group-hover:bg-indigo-500/10 transition-colors">
                                                <FiBriefcase className="w-5 h-5 text-indigo-400" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Job Type</p>
                                                <p className="font-semibold text-zinc-200 capitalize">{jobType?.replace('-', ' ')}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-5 group">
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0 group-hover:border-amber-500/30 group-hover:bg-amber-500/10 transition-colors">
                                                <FiDollarSign className="w-5 h-5 text-amber-400" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Salary</p>
                                                <p className="font-semibold text-zinc-200">{salaryText}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sidebar Actions */}
                                    <div className="space-y-4 pt-6 border-t border-white/5">
                                        <button className="w-full relative group overflow-hidden rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 text-white py-4.5 font-bold shadow-[0_0_30px_-10px_rgba(37,99,235,0.4)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_50px_-15px_rgba(37,99,235,0.6)]">
                                            <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                                                Apply for this Job <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                            <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </button>
                                        
                                        {/* Mobile Only Extra Buttons */}
                                        <div className="flex gap-3 lg:hidden">
                                            <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/5 text-zinc-300 rounded-xl py-3.5 flex items-center justify-center gap-2 transition-colors text-sm font-semibold">
                                                <FiBookmark className="w-4 h-4" /> Save
                                            </button>
                                            <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/5 text-zinc-300 rounded-xl py-3.5 flex items-center justify-center gap-2 transition-colors text-sm font-semibold">
                                                <FiShare2 className="w-4 h-4" /> Share
                                            </button>
                                        </div>

                                        <p className="text-center text-xs font-medium text-zinc-500 mt-3 flex items-center justify-center gap-1.5">
                                            <FiClock className="w-3.5 h-3.5" /> Apply before {formatDate(deadline)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default JobDetailsPage;
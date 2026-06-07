import { getJobById } from '@/lib/api/jobs';
import Image from 'next/image';
import { FiBriefcase, FiDollarSign, FiClock, FiCalendar, FiCheckCircle, FiArrowRight, FiGlobe, FiShare2, FiBookmark } from 'react-icons/fi';

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
            <div className="min-h-[60vh] flex items-center justify-center bg-[#0d0d0e]">
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
        <div className="min-h-screen bg-[#0d0d0e] text-zinc-300 pb-20">
            {/* Hero / Header Section */}
            <div className="relative bg-[#121214] border-b border-zinc-800/80 pt-16 pb-12 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-blue-900/10 to-transparent pointer-events-none"></div>
                
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                        {/* Company Logo */}
                        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#1A1A1D] border border-zinc-800 rounded-3xl flex items-center justify-center overflow-hidden p-5 shadow-xl shrink-0">
                            {companyLogo ? (
                                <Image src={companyLogo} alt={companyName || 'Company'} width={100} height={100} className="object-contain" />
                            ) : (
                                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-3xl">
                                    {companyName?.charAt(0) || 'C'}
                                </div>
                            )}
                        </div>

                        {/* Title & Info */}
                        <div className="flex-1 w-full">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">{jobTitle}</h1>
                                <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mt-1 md:mt-0">
                                    {jobCategory || 'General'}
                                </span>
                            </div>
                            <h2 className="text-xl text-zinc-400 font-medium mb-6 flex items-center gap-2">
                                {companyName}
                            </h2>
                            
                            <div className="flex flex-wrap gap-4 sm:gap-6 text-sm font-medium">
                                <div className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-800 rounded-lg px-3 py-1.5">
                                    <FiGlobe className="text-blue-500 w-4 h-4" />
                                    <span>{isRemote ? 'Remote' : 'On-site'}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-800 rounded-lg px-3 py-1.5">
                                    <FiBriefcase className="text-blue-500 w-4 h-4" />
                                    <span className="capitalize">{jobType?.replace('-', ' ')}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-800 rounded-lg px-3 py-1.5">
                                    <FiDollarSign className="text-blue-500 w-4 h-4" />
                                    <span>{salaryText}</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions (Desktop) */}
                        <div className="hidden md:flex flex-col gap-3 shrink-0 min-w-[220px]">
                            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-xl py-3.5 px-6 font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-blue-600/20 active:scale-95">
                                Apply Now <FiArrowRight className="w-5 h-5" />
                            </button>
                            <div className="flex gap-2">
                                <button className="flex-1 bg-[#1A1A1D] hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-xl py-3 flex items-center justify-center gap-2 transition-colors">
                                    <FiBookmark className="w-4 h-4" /> Save
                                </button>
                                <button className="flex-1 bg-[#1A1A1D] hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-xl py-3 flex items-center justify-center gap-2 transition-colors">
                                    <FiShare2 className="w-4 h-4" /> Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
                    
                    {/* Left Column (Details) */}
                    <div className="lg:col-span-2 space-y-12">
                        {responsibilities && (
                            <section>
                                <div className="flex items-center gap-3 mb-6 border-b border-zinc-800/80 pb-4">
                                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                        <FiCheckCircle className="text-blue-500 w-4 h-4" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Responsibilities</h3>
                                </div>
                                <ul className="space-y-4">
                                    {respList.map((item, idx) => (
                                        <li key={idx} className="flex gap-4 text-zinc-400 leading-relaxed">
                                            <div className="w-2 h-2 rounded-full bg-blue-500/60 mt-2.5 shrink-0" />
                                            <span className="text-[15px]">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {requirements && (
                            <section>
                                <div className="flex items-center gap-3 mb-6 border-b border-zinc-800/80 pb-4">
                                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                        <FiBriefcase className="text-blue-500 w-4 h-4" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Requirements</h3>
                                </div>
                                <ul className="space-y-4">
                                    {reqList.map((item, idx) => (
                                        <li key={idx} className="flex gap-4 text-zinc-400 leading-relaxed">
                                            <div className="w-2 h-2 rounded-full bg-blue-500/60 mt-2.5 shrink-0" />
                                            <span className="text-[15px]">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {benefits && (
                            <section>
                                <div className="flex items-center gap-3 mb-6 border-b border-zinc-800/80 pb-4">
                                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                        <FiDollarSign className="text-blue-500 w-4 h-4" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Benefits & Perks</h3>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {benList.map((item, idx) => (
                                        <div key={idx} className="bg-[#121214] border border-zinc-800/60 rounded-2xl p-5 hover:border-zinc-700 transition-colors shadow-lg shadow-black/10">
                                            <p className="text-zinc-400 text-[15px] leading-relaxed">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column (Summary Card) */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#121214] border border-zinc-800/80 rounded-3xl p-6 lg:p-8 sticky top-24 shadow-2xl">
                            <h3 className="text-xl font-bold text-white mb-6 border-b border-zinc-800/80 pb-4">Job Summary</h3>
                            
                            <div className="space-y-6 mb-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-[#1A1A1D] border border-zinc-800 flex items-center justify-center shrink-0">
                                        <FiClock className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider mb-1">Date Posted</p>
                                        <p className="font-medium text-zinc-200">{formatDate(createdAt)}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-[#1A1A1D] border border-zinc-800 flex items-center justify-center shrink-0">
                                        <FiCalendar className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider mb-1">Deadline</p>
                                        <p className="font-medium text-zinc-200">{formatDate(deadline)}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-[#1A1A1D] border border-zinc-800 flex items-center justify-center shrink-0">
                                        <FiGlobe className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider mb-1">Location</p>
                                        <p className="font-medium text-zinc-200">{isRemote ? 'Remote / Work from Anywhere' : 'On-site'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-[#1A1A1D] border border-zinc-800 flex items-center justify-center shrink-0">
                                        <FiBriefcase className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider mb-1">Job Type</p>
                                        <p className="font-medium text-zinc-200 capitalize">{jobType?.replace('-', ' ')}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-[#1A1A1D] border border-zinc-800 flex items-center justify-center shrink-0">
                                        <FiDollarSign className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider mb-1">Salary</p>
                                        <p className="font-medium text-zinc-200">{salaryText}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions (Mobile & Desktop Sidebar) */}
                            <div className="space-y-4 pt-4 border-t border-zinc-800/80">
                                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-blue-600/20 active:scale-95">
                                    Apply Now <FiArrowRight className="w-5 h-5" />
                                </button>
                                
                                {/* Mobile Share/Save Buttons */}
                                <div className="flex gap-2 md:hidden">
                                    <button className="flex-1 bg-[#1A1A1D] hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-xl py-3 flex items-center justify-center gap-2 transition-colors text-sm font-medium">
                                        <FiBookmark className="w-4 h-4" /> Save
                                    </button>
                                    <button className="flex-1 bg-[#1A1A1D] hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-xl py-3 flex items-center justify-center gap-2 transition-colors text-sm font-medium">
                                        <FiShare2 className="w-4 h-4" /> Share
                                    </button>
                                </div>

                                <p className="text-center text-xs text-zinc-500 mt-2">Apply before {formatDate(deadline)}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default JobDetailsPage;
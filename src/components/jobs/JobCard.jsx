import Link from 'next/link';
import Image from 'next/image';
import { FiMapPin, FiBriefcase, FiDollarSign, FiClock, FiArrowRight, FiGlobe } from 'react-icons/fi';

const JobCard = ({ job }) => {
    const {
        _id,
        jobTitle,
        jobType,
        minSalary,
        maxSalary,
        currency,
        isRemote,
        companyName,
        companyLogo,
        responsibilities,
        createdAt,
        jobCategory
    } = job || {};

    // Generate a short description
    const shortDesc = responsibilities 
        ? (responsibilities.length > 85 ? responsibilities.substring(0, 85) + '...' : responsibilities)
        : 'Join our team and help us build amazing products for our users around the world.';

    // Format location based on remote status
    const location = isRemote ? 'Remote / Global' : 'On-site';

    // Format salary
    const formatCurrency = (amount) => {
        if (!amount) return '';
        if (currency === 'USD') return `$${amount}`;
        if (currency === 'EUR') return `€${amount}`;
        if (currency === 'GBP') return `£${amount}`;
        return `${amount} ${currency}`;
    };

    const salaryText = minSalary && maxSalary 
        ? `${formatCurrency(minSalary)} - ${formatCurrency(maxSalary)}/m`
        : minSalary 
            ? `From ${formatCurrency(minSalary)}/m` 
            : 'Negotiable';

    // Format date roughly (Fallback to 'Recently' if no date)
    const timeAgo = createdAt 
        ? new Date(createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) 
        : 'Recently';

    return (
        <div className="group relative flex flex-col h-full rounded-[2rem] bg-[#09090b] border border-white/50 hover:border-blue-500/30 transition-all duration-500 hover:shadow-[0_0_40px_-15px_rgba(37,99,235,0.3)] hover:-translate-y-1.5 overflow-hidden z-10">
            {/* Background Hover Glows */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-screen"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen"></div>

            <div className="p-7 flex flex-col h-full relative z-20">
                {/* Header: Logo & Category */}
                <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-3 shadow-inner group-hover:scale-105 group-hover:border-blue-500/30 group-hover:bg-blue-500/5 transition-all duration-300 shrink-0">
                        {companyLogo ? (
                            <Image src={companyLogo} alt={companyName || 'Company'} width={40} height={40} className="object-contain drop-shadow-md" />
                        ) : (
                            <div className="w-full h-full bg-linear-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-inner">
                                {companyName?.charAt(0) || 'C'}
                            </div>
                        )}
                    </div>
                    
                    {/* Top Right Label */}
                    <div className="flex flex-col items-end gap-2">
                        {jobCategory && (
                            <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
                                {jobCategory}
                            </span>
                        )}
                        <div className="text-zinc-500 text-[11px] font-medium flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                            <FiClock className="w-3 h-3 text-zinc-400" /> {timeAgo}
                        </div>
                    </div>
                </div>

                {/* Title & Company */}
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-blue-400 group-hover:to-indigo-300 transition-all duration-300 mb-1.5 leading-tight tracking-tight">
                        {jobTitle}
                    </h3>
                    <p className="text-zinc-400 text-[13px] font-semibold tracking-wide uppercase">{companyName}</p>
                </div>
                
                {/* Description */}
                <p className="text-zinc-500 text-[13px] mb-7 flex-grow leading-relaxed">
                    {shortDesc}
                </p>

                {/* Badges Grid */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                    <div className="flex items-center gap-2.5 bg-white/5 border border-white/5 px-3.5 py-2.5 rounded-xl text-[11px] font-semibold text-zinc-300 group-hover:bg-white/10 transition-colors uppercase tracking-wider">
                        {isRemote ? <FiGlobe className="text-blue-400 w-3.5 h-3.5" /> : <FiMapPin className="text-emerald-400 w-3.5 h-3.5" />}
                        <span className="truncate">{location}</span>
                    </div>
                    <div className="flex items-center gap-2.5 bg-white/5 border border-white/5 px-3.5 py-2.5 rounded-xl text-[11px] font-semibold text-zinc-300 group-hover:bg-white/10 transition-colors uppercase tracking-wider">
                        <FiBriefcase className="text-indigo-400 w-3.5 h-3.5" />
                        <span className="truncate">{jobType?.replace('-', ' ')}</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-2.5 bg-white/5 border border-white/5 px-3.5 py-2.5 rounded-xl text-[11px] font-semibold text-zinc-300 group-hover:bg-white/10 transition-colors uppercase tracking-wider">
                        <FiDollarSign className="text-amber-400 w-3.5 h-3.5" />
                        <span className="truncate">{salaryText}</span>
                    </div>
                </div>

                {/* Action Button */}
                <div className="mt-auto pt-5 border-t border-white/5 relative">
                    <Link 
                        href={`/jobs/${_id}`}
                        className="group/btn relative overflow-hidden flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-linear-to-r hover:from-blue-600 hover:to-indigo-600 text-white border border-white/10 hover:border-transparent rounded-2xl py-4 text-sm font-bold transition-all duration-300 active:scale-[0.98] shadow-lg shadow-black/20"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            See Full Details <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default JobCard;

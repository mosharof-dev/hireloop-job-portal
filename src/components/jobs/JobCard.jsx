import Link from 'next/link';
import Image from 'next/image';
import { FiMapPin, FiBriefcase, FiDollarSign, FiClock, FiArrowRight } from 'react-icons/fi';

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
        createdAt
    } = job || {};

    // Generate a short description
    const shortDesc = responsibilities 
        ? (responsibilities.length > 90 ? responsibilities.substring(0, 90) + '...' : responsibilities)
        : 'Join our team and help us build amazing products for our users around the world.';

    // Format location based on remote status
    const location = isRemote ? 'Remote' : 'On-site';

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
        <div className="group relative bg-[#121214] rounded-3xl p-6 flex flex-col h-full border border-zinc-800/80 hover:border-zinc-700 hover:bg-[#151516] transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-[0_0_30px_rgba(59,130,246,0.05)] overflow-hidden">
            
            {/* Top Section: Logo & Date */}
            <div className="flex justify-between items-start mb-5">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-zinc-800 flex items-center justify-center overflow-hidden p-2 shadow-inner">
                    {companyLogo ? (
                        <Image src={companyLogo} alt={companyName || 'Company'} width={36} height={36} className="object-contain" />
                    ) : (
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {companyName?.charAt(0) || 'C'}
                        </div>
                    )}
                </div>
                <div className="bg-zinc-900/80 text-zinc-400 text-[11px] font-medium px-2.5 py-1.5 rounded-full border border-zinc-800 flex items-center gap-1.5">
                    <FiClock className="w-3 h-3" /> {timeAgo}
                </div>
            </div>

            {/* Title & Company */}
            <div className="mb-4">
                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-1.5 leading-tight">{jobTitle}</h3>
                <p className="text-zinc-400 text-sm font-medium">{companyName}</p>
            </div>
            
            {/* Description */}
            <p className="text-zinc-500 text-sm mb-6 flex-grow leading-relaxed">
                {shortDesc}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
                <div className="flex items-center gap-1.5 bg-zinc-900/60 border border-zinc-800/80 px-2.5 py-1.5 rounded-lg text-[12px] font-medium text-zinc-300">
                    <FiMapPin className="text-blue-500 w-3.5 h-3.5" />
                    <span>{location}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-zinc-900/60 border border-zinc-800/80 px-2.5 py-1.5 rounded-lg text-[12px] font-medium text-zinc-300">
                    <FiBriefcase className="text-blue-500 w-3.5 h-3.5" />
                    <span className="capitalize">{jobType?.replace('-', ' ')}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-zinc-900/60 border border-zinc-800/80 px-2.5 py-1.5 rounded-lg text-[12px] font-medium text-zinc-300">
                    <FiDollarSign className="text-blue-500 w-3.5 h-3.5" />
                    <span>{salaryText}</span>
                </div>
            </div>

            {/* Action */}
            <div className="mt-auto pt-5 border-t border-zinc-800/60">
                <Link 
                    href={`/jobs/${_id}`}
                    className="group/btn flex items-center justify-center gap-2 w-full bg-zinc-900/50 hover:bg-white text-zinc-300 hover:text-black border border-zinc-800 hover:border-white rounded-xl py-3 text-[14px] font-bold transition-all duration-300 active:scale-[0.98]"
                >
                    Apply Now <FiArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
            </div>
        </div>
    );
};

export default JobCard;

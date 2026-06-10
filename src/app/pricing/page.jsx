"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiZap, FiBriefcase, FiUser } from 'react-icons/fi';
import PricingCard from '@/components/pricing/PricingCard';
import FAQAccordion from '@/components/pricing/FAQAccordion';

const jobSeekerPlans = [
    {
        name: "Free",
        price: "$0",
        period: "/forever",
        description: "Perfect for getting started and exploring opportunities.",
        features: [
            "Browse & save up to 10 jobs",
            "Apply to up to 3 jobs per month",
            "Basic profile visibility",
            "Email alerts for new jobs"
        ],
        icon: <FiUser className="w-6 h-6" />,
        color: "from-zinc-500 to-zinc-700",
        glow: "shadow-zinc-500/20",
        buttonText: "Current Plan",
        popular: false
    },
    {
        name: "Pro",
        price: "$19",
        period: "/month",
        description: "Ideal for active job seekers wanting more visibility.",
        features: [
            "Apply to up to 30 jobs per month",
            "Unlimited saved jobs",
            "Application tracking dashboard",
            "Salary insights & company reviews"
        ],
        icon: <FiZap className="w-6 h-6" />,
        color: "from-blue-500 to-indigo-600",
        glow: "shadow-blue-500/40",
        buttonText: "Upgrade to Pro",
        popular: true
    },
    {
        name: "Premium",
        price: "$39",
        period: "/month",
        description: "For serious professionals who want the ultimate edge.",
        features: [
            "Everything in Pro",
            "Unlimited applications",
            "Profile boost to top recruiters",
            "Early access to new jobs",
            "Priority 24/7 support"
        ],
        icon: <FiStar className="w-6 h-6" />,
        color: "from-amber-400 to-orange-500",
        glow: "shadow-amber-500/40",
        buttonText: "Get Premium",
        popular: false
    }
];

const recruiterPlans = [
    {
        name: "Free",
        price: "$0",
        period: "/forever",
        description: "Great for a company's first year of hiring.",
        features: [
            "Up to 3 active job posts",
            "Basic applicant management",
            "Standard listing visibility",
            "Company profile page"
        ],
        icon: <FiBriefcase className="w-6 h-6" />,
        color: "from-zinc-500 to-zinc-700",
        glow: "shadow-zinc-500/20",
        buttonText: "Current Plan",
        popular: false
    },
    {
        name: "Growth",
        price: "$49",
        period: "/month",
        description: "For growing teams actively hiring new talent.",
        features: [
            "Up to 10 active job posts",
            "Applicant tracking system (ATS)",
            "Basic analytics & reporting",
            "Dedicated email support"
        ],
        icon: <FiZap className="w-6 h-6" />,
        color: "from-blue-500 to-indigo-600",
        glow: "shadow-blue-500/40",
        buttonText: "Upgrade to Growth",
        popular: true
    },
    {
        name: "Enterprise",
        price: "$149",
        period: "/month",
        description: "Full suite for large organizations and agencies.",
        features: [
            "Up to 50 active job posts",
            "Advanced analytics dashboard",
            "Featured & pinned job listings",
            "Team collaboration tools",
            "Custom branding",
            "Priority support & account manager"
        ],
        icon: <FiStar className="w-6 h-6" />,
        color: "from-purple-500 to-fuchsia-600",
        glow: "shadow-purple-500/40",
        buttonText: "Contact Sales",
        popular: false
    }
];

const faqs = [
    {
        question: "Can I cancel my subscription at any time?",
        answer: "Yes, you can cancel your subscription at any time from your account settings. You will continue to have access to your plan until the end of your current billing cycle."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and Apple Pay for secure and seamless transactions."
    },
    {
        question: "Are there any hidden fees?",
        answer: "No, the prices shown are exactly what you'll pay. We believe in 100% transparent pricing with no setup fees or hidden costs."
    },
    {
        question: "Can I switch plans later?",
        answer: "Absolutely! You can upgrade or downgrade your plan at any time. If you upgrade, prorated charges will be applied. If you downgrade, your new rate will apply at the next billing cycle."
    }
];

const PricingPage = () => {
    const [activeTab, setActiveTab] = useState('seekers');

    const currentPlans = activeTab === 'seekers' ? jobSeekerPlans : recruiterPlans;

    return (
        <div className="min-h-screen bg-[#09090b] text-white py-20 px-4 sm:px-6 lg:px-8 selection:bg-blue-500/30">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto text-center mb-16 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 relative z-10">
                    Simple, transparent <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-500">pricing</span>
                </h1>
                <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto relative z-10">
                    Whether you&apos;re looking for your dream job or hunting for top talent, we have a plan that fits your needs perfectly.
                </p>

                {/* Toggle Switch */}
                <div className="mt-10 inline-flex bg-[#121214] border border-white/10 rounded-2xl p-1.5 relative z-10 backdrop-blur-xl">
                    <button
                        onClick={() => setActiveTab('seekers')}
                        className={`relative px-8 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                            activeTab === 'seekers' ? 'text-white shadow-lg' : 'text-zinc-400 hover:text-zinc-200'
                        }`}
                    >
                        {activeTab === 'seekers' && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 rounded-xl"
                                initial={false}
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">For Job Seekers</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('recruiters')}
                        className={`relative px-8 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                            activeTab === 'recruiters' ? 'text-white shadow-lg' : 'text-zinc-400 hover:text-zinc-200'
                        }`}
                    >
                        {activeTab === 'recruiters' && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 rounded-xl"
                                initial={false}
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">For Recruiters</span>
                    </button>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 relative z-10">
                <AnimatePresence mode="wait">
                    {currentPlans.map((plan, index) => (
                        <PricingCard key={`${activeTab}-${plan.name}`} plan={plan} index={index} />
                    ))}
                </AnimatePresence>
            </div>

            {/* FAQ Section */}
            <div className="max-w-3xl mx-auto mt-32 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                    <p className="text-zinc-400">Everything you need to know about the product and billing.</p>
                </div>

                <FAQAccordion faqs={faqs} />
            </div>
        </div>
    );
};

export default PricingPage;

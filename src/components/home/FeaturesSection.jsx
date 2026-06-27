"use client";

import { motion } from 'framer-motion';
import { FiSearch, FiTrendingUp, FiBookmark, FiStar } from 'react-icons/fi';

const features = [
  {
    icon: <FiSearch className="text-2xl" />,
    title: 'Smart Job Search',
    description: 'Our AI-driven search engine helps you find jobs that perfectly match your skills, experience, and preferences in seconds.',
    colorClass: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  },
  {
    icon: <FiTrendingUp className="text-2xl" />,
    title: 'Salary Insights',
    description: 'Get transparent salary estimates and market trends to ensure you negotiate the compensation you truly deserve.',
    colorClass: 'text-green-400 bg-green-500/10 border-green-500/20',
  },
  {
    icon: <FiBookmark className="text-2xl" />,
    title: 'Save & Track',
    description: 'Bookmark jobs you love and track the status of your applications directly from your personalized dashboard.',
    colorClass: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  },
  {
    icon: <FiStar className="text-2xl" />,
    title: 'Top Companies',
    description: 'Connect with verified recruiters from industry-leading startups and Fortune 500 companies hiring globally.',
    colorClass: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-[#0a0a0c] text-white">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-blue-400 font-bold tracking-wider uppercase text-sm mb-4 block">Why Choose HireLoop</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Everything you need to land your next role</h2>
            <p className="text-lg text-zinc-400">
              We provide powerful tools for both job seekers and recruiters to make the hiring process seamless, transparent, and fast.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-zinc-900/40 border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.1)] transition-all hover:-translate-y-2 group backdrop-blur-md"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 border ${feature.colorClass}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

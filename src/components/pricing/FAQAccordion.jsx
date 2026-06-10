"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

const FAQAccordion = ({ faqs }) => {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="space-y-4">
            {faqs.map((faq, index) => (
                <div 
                    key={index}
                    className="bg-[#121214]/60 border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/10 backdrop-blur-md"
                >
                    <button
                        onClick={() => toggleFaq(index)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                    >
                        <span className="text-lg font-semibold text-zinc-100">{faq.question}</span>
                        <motion.div
                            animate={{ rotate: openFaq === index ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <FiChevronDown className="w-5 h-5 text-zinc-400" />
                        </motion.div>
                    </button>
                    <AnimatePresence>
                        {openFaq === index && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="px-6 pb-5 text-zinc-400 leading-relaxed"
                            >
                                {faq.answer}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
};

export default FAQAccordion;

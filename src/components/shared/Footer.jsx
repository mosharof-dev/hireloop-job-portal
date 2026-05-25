'use client';

import Link from 'next/link';
import Image from 'next/image';
import logo from '@/images/logo.png';
import { FaFacebookF, FaPinterestP, FaLinkedinIn } from 'react-icons/fa';

const footerSections = [
  {
    title: 'Product',
    links: [
      { label: 'Job discovery', href: '/jobs' },
      { label: 'Worker AI', href: '/worker-ai' },
      { label: 'Companies', href: '/companies' },
      { label: 'Salary data', href: '/salaries' },
    ],
  },
  {
    title: 'Navigations',
    links: [
      { label: 'Help center', href: '/help' },
      { label: 'Career library', href: '/library' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Brand Guideline', href: '/brand' },
      { label: 'Newsroom', href: '/news' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#060608] text-white border-t border-zinc-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        {/* Top Grid: Logo + Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 md:gap-12 pb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col items-start gap-4">
            <Link href="/" className="flex items-center">
              <Image 
                src={logo} 
                alt="Programming Hero" 
                height={40} 
                className="h-10 w-auto object-contain" 
                priority 
              />
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm mt-2">
              The AI-native career platform. Built for people who take their work seriously.
            </p>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerSections.map((section) => (
              <div key={section.title} className="flex flex-col gap-4">
                <h3 className="text-[#8B86FF] font-semibold text-[14px] tracking-wider uppercase">
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link 
                        href={link.href} 
                        className="text-zinc-400 hover:text-white text-[14px] transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Bar: Social Icons + Copyright */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-12 border-t border-zinc-900/80">
          
          {/* Social Media Links */}
          <div className="flex items-center gap-3">
            {/* Facebook */}
            <Link 
              href="#" 
              aria-label="Facebook" 
              className="w-9 h-9 bg-zinc-900 hover:bg-[#4f46e5] text-zinc-400 hover:text-white rounded-xl flex items-center justify-center transition-all duration-200"
            >
              <FaFacebookF className="w-4 h-4" />
            </Link>

            {/* Brand Purple Icon */}
            <Link 
              href="#" 
              aria-label="Pinterest" 
              className="w-9 h-9 bg-zinc-900 hover:bg-[#4f46e5] text-white rounded-xl flex items-center justify-center transition-all duration-200 shadow-md shadow-[#5c5cf6]/10"
            >
              <FaPinterestP className="w-4 h-4" />
            </Link>

            {/* LinkedIn */}
            <Link 
              href="#" 
              aria-label="LinkedIn" 
              className="w-9 h-9 bg-zinc-900 hover:bg-[#4f46e5] text-zinc-400 hover:text-white rounded-xl flex items-center justify-center transition-all duration-200"
            >
              <FaLinkedinIn className="w-4 h-4" />
            </Link>
          </div>

          {/* Copyright & Legal Links */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-[13px] text-zinc-500 font-medium">
            <span>Copyright 2024 — Programming Hero</span>
            <span className="hidden sm:inline text-zinc-800">|</span>
            <div className="flex items-center gap-3">
              <Link href="/#" className="hover:text-zinc-300 transition-colors">
                Terms & Policy
              </Link>
              <span className="text-zinc-800">-</span>
              <Link href="#" className="hover:text-zinc-300 transition-colors">
                Privacy Guideline
              </Link>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}

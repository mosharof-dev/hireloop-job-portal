'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import logo from '@/images/logo.png';

const publicLinks = [
  { label: 'Browse Jobs', href: '/jobs' },
  { label: 'Company', href: '/companies' },
  { label: 'Pricing', href: '/pricing' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-[#0D0D0E]/90 backdrop-blur-md border-b border-zinc-900 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        
        {/* Left Side: Logo */}
        <div className="shrink-0">
          <Link href="/" className="flex items-center">
            <Image 
              src={logo} 
              alt="Programming Hero" 
              height={40} 
              className="h-10 w-auto object-contain" 
              priority 
            />
          </Link>
        </div>

            {/* Right Side: Navigation Links & Auth Buttons */}
        <div className="hidden lg:flex items-center">
          <div className="flex items-center bg-[#151516]/95 border border-zinc-800/80 rounded-full pl-6 pr-2 py-2 gap-6 shadow-lg shadow-black/30">
            {/* Nav Links */}
            <ul className="flex items-center gap-6">
              {publicLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className={`px-3 py-1.5 rounded-full text-[14px] transition-colors ${
                    pathname === link.href ? 'text-white font-medium bg-white/10' : 'text-gray-300 hover:text-white'
                  }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Vertical Line Separator */}
            <div className="w-px h-4 bg-zinc-800"></div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-5">
              <Link 
                href="/signin" 
                className="text-[14px] font-semibold text-[#8B86FF] hover:text-[#a5a1ff] transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link 
                href="/register" 
                className="bg-white text-black hover:bg-zinc-200 rounded-full px-5 py-2.5 text-[14px] font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex lg:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-zinc-400 hover:text-white p-2 rounded-lg transition-colors focus:outline-none"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes menuFadeIn {
              from {
                opacity: 0;
                transform: translateY(-8px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-menu-slide {
              animation: menuFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
          `}} />
          <div 
            className="lg:hidden w-full bg-[#0D0D0E]/98 backdrop-blur-xl border-t border-zinc-900 px-6 py-8 flex flex-col gap-8 shadow-2xl transition-all duration-300 animate-menu-slide"
          >
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold tracking-wider text-zinc-500 uppercase px-4 mb-2">Navigation</span>
              <ul className="flex flex-col gap-2">
                {publicLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 ${
                        pathname === link.href 
                          ? 'bg-white/5 text-white font-semibold' 
                          : 'text-zinc-400 hover:text-white hover:bg-white/5 active:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {link.label === 'Browse Jobs' && (
                          <svg className="w-5 h-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        )}
                        {link.label === 'Company' && (
                          <svg className="w-5 h-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        )}
                        {link.label === 'Pricing' && (
                          <svg className="w-5 h-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        <span className="text-[15px]">{link.label}</span>
                      </div>
                      <svg className="w-4 h-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-px w-full bg-zinc-900/80"></div>

            <div className="flex flex-col gap-4">
              <Link 
                href="/signin" 
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-full py-3.5 rounded-2xl border border-zinc-800 bg-[#121214] text-center text-[15px] font-semibold text-[#8B86FF] hover:text-[#a5a1ff] active:scale-[0.98] transition-all duration-200"
              >
                Sign In
              </Link>
              <Link 
                href="/register" 
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-full py-4 rounded-2xl bg-white text-black text-center text-[15px] font-bold active:scale-[0.98] transition-all duration-200 shadow-lg shadow-white/5"
              >
                Get Started
              </Link>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
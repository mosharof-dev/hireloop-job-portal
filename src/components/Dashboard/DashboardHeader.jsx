import React from "react";
import { FiSearch, FiMenu } from "react-icons/fi";
import Image from "next/image";

export default function DashboardHeader({ onMenuClick }) {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-neutral-800 bg-[#161616]">
      {/* Left side: Mobile Menu Toggle & Search Bar */}
      <div className="flex items-center flex-1 gap-4">
        {/* Mobile menu button */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden text-neutral-400 hover:text-white transition-colors"
        >
          <FiMenu size={24} />
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl hidden sm:block">
          <div className="relative flex items-center w-full h-10 rounded-lg focus-within:shadow-lg bg-[#1F1F1F] border border-neutral-800 overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-neutral-400">
              <FiSearch size={18} />
            </div>
            <input
              className="peer h-full w-full outline-none text-sm text-neutral-200 bg-transparent pr-2 placeholder-neutral-500"
              type="text"
              id="search"
              placeholder="Search applications, jobs, or talent..."
            />
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 sm:gap-6 ml-4">
        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-sm font-semibold text-white leading-tight">Alex Sterling</span>
            <span className="text-xs text-neutral-500">TechFlow Inc.</span>
          </div>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-neutral-800 shrink-0">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
}

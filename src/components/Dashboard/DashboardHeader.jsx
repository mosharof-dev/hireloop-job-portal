"use client";
import React from "react";
import { FiSearch, FiMenu, FiUser } from "react-icons/fi";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";

export default function DashboardHeader({ onMenuClick }) {
  const { data: sessionData } = useSession();
  const user = sessionData?.user;

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
            <span className="text-sm font-semibold text-white leading-tight capitalize">
              {user?.name || "Loading..."}
            </span>
            <span className="text-xs text-neutral-500 capitalize">
              {user?.role || "User"}
            </span>
          </div>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-neutral-800 shrink-0 flex items-center justify-center bg-neutral-800">
            {user?.image ? (
              <Image 
                src={user.image} 
                alt="Profile" 
                width={40} 
                height={40} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <FiUser className="text-neutral-400 size-5 sm:size-6" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/images/logo.png";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiUsers,
  FiCreditCard,
  FiChevronRight,
} from "react-icons/fi";
import { useSession, authClient } from "@/lib/auth-client";
import { FaRegUserCircle } from "react-icons/fa";

const publicLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/companies" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { data: sessionData, isPending } = useSession();
  const user = sessionData?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
    // window.location.reload();
    window.location.href = "/signin";
  };

  const renderAuthButtons = () => {
    if (isPending) {
      return (
        <div className="w-20 h-8 rounded-full bg-zinc-900 animate-pulse"></div>
      );
    }

    if (user) {
      return (
        <>
          <span className="text-[14px] font-semibold flex items-center text-zinc-300">
            <FaRegUserCircle className="mr-2" /> {user.name}
          </span>
          <button
            onClick={handleSignOut}
            className="border border-red-500/30 bg-red-500/5 hover:bg-red-500/10 text-red-400 hover:text-red-300 rounded-full px-5 py-2 text-[14px] font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Logout
          </button>
        </>
      );
    }

    return (
      <>
        <Link
          href="/signin"
          className="text-[14px] font-semibold text-blue-500 hover:text-blue-400 transition-colors duration-200"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className="bg-white text-black hover:bg-zinc-200 rounded-full px-5 py-2.5 text-[14px] font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          Get Started
        </Link>
      </>
    );
  };

  const renderMobileAuthButtons = () => {
    if (isPending) {
      return (
        <div className="w-full h-12 rounded-2xl bg-zinc-900 animate-pulse"></div>
      );
    }

    if (user) {
      return (
        <>
          <div className="flex items-center justify-center w-full py-3.5 rounded-2xl border border-zinc-900 bg-zinc-950/40 text-center text-[15px] font-semibold text-zinc-300">
            <FaRegUserCircle className="mr-2" /> {user.name}
          </div>
          <button
            onClick={() => {
              handleSignOut();
              setIsOpen(false);
            }}
            className="flex items-center justify-center w-full py-4 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20 text-center text-[15px] font-bold active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            Logout
          </button>
        </>
      );
    }

    return (
      <>
        <Link
          href="/signin"
          onClick={() => setIsOpen(false)}
          className="flex items-center justify-center w-full py-3.5 rounded-2xl border border-zinc-800 bg-[#121214] text-center text-[15px] font-semibold text-blue-400 hover:text-blue-300 active:scale-[0.98] transition-all duration-200"
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
      </>
    );
  };

  const dashboard = {
    seeker: "/dashboard/seeker",
    recruiter: "/dashboard/recruiter",
  };

  if (user?.email) {
    publicLinks.push({
      label: "Dashboard",
      href: dashboard[user?.role || "seeker"],
    });
  }

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
                      pathname === link.href
                        ? "text-white font-medium bg-white/10"
                        : "text-gray-300 hover:text-white"
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
            <div className="flex items-center gap-5">{renderAuthButtons()}</div>
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
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden w-full bg-[#0D0D0E]/98 backdrop-blur-xl border-t border-zinc-900 px-6 py-8 flex flex-col gap-8 shadow-2xl transition-all duration-300 animate-menu-slide">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold tracking-wider text-zinc-500 uppercase px-4 mb-2">
              Navigation
            </span>
            <ul className="flex flex-col gap-2">
              {publicLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 ${
                      pathname === link.href
                        ? "bg-white/5 text-white font-semibold"
                        : "text-zinc-400 hover:text-white hover:bg-white/5 active:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {link.label === "Browse Jobs" && (
                        <FiSearch className="w-5 h-5 opacity-80" />
                      )}
                      {link.label === "Company" && (
                        <FiUsers className="w-5 h-5 opacity-80" />
                      )}
                      {link.label === "Pricing" && (
                        <FiCreditCard className="w-5 h-5 opacity-80" />
                      )}
                      <span className="text-[15px]">{link.label}</span>
                    </div>
                    <FiChevronRight className="w-4 h-4 text-zinc-600" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="h-px w-full bg-zinc-900/80"></div>

          <div className="flex flex-col gap-4">{renderMobileAuthButtons()}</div>
        </div>
      )}
    </nav>
  );
}

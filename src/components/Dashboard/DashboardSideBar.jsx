"use client";
import React from "react";
import { FiHome, FiBriefcase, FiUsers, FiSettings, FiCheckCircle, FiX } from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: FiHome, href: "/dashboard/recruiter", label: "Dashboard" },
  { icon: FiUsers, href: "/dashboard/recruiter/company", label: "My Company" },
  { icon: FiBriefcase, href: "/dashboard/recruiter/jobs", label: "Manage Jobs" },
  { icon: FiCheckCircle, href: "/dashboard/recruiter/jobs/new", label: "Applications" },
  { icon: FiSettings, href: "/dashboard/recruiter/settings", label: "Settings" },
];

const SidebarContent = ({ pathname, setIsMobileMenuOpen }) => (
  <>
    {/* Logo */}
    <div className="px-6 py-6 border-b border-neutral-800/50">
      <Link href="/" className="text-2xl font-bold text-white tracking-tight" onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)}>
        Hire<span className="text-blue-500">Loop</span>
      </Link>
    </div>

    {/* Profile Info */}
    <div className="px-6 py-6 border-b border-neutral-800 flex items-center gap-3">
      <img
        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        alt="Alex Sterling"
        className="w-12 h-12 rounded-full object-cover border border-neutral-700"
      />
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-white">Alex Sterling</span>
        <span className="text-xs text-neutral-500">Recruiter</span>
        <div className="mt-1 flex items-center">
           <span className="text-[9px] font-bold tracking-wider text-yellow-500 border border-yellow-500/30 bg-yellow-500/10 px-2 py-0.5 rounded uppercase">Premium Account</span>
        </div>
      </div>
    </div>

    {/* Navigation */}
    <nav className="flex flex-col gap-1 px-4 py-6">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            href={item.href}
            key={item.label}
            onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all ${
              isActive
                ? "bg-neutral-800/60 text-white relative before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:bg-white before:rounded-r-md"
                : "text-neutral-400 hover:text-white hover:bg-neutral-800/40"
            }`}
          >
            <item.icon className={`size-5 ${isActive ? "text-white" : "text-neutral-500"}`} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  </>
);

const DashboardSideBar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 min-h-screen bg-[#111111] border-r border-neutral-800 flex flex-col hidden lg:flex shrink-0">
        <SidebarContent pathname={pathname} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      </aside>

      {/* Mobile Drawer Sidebar */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          {/* Sidebar Drawer */}
          <aside className="w-64 h-full bg-[#111111] border-r border-neutral-800 flex flex-col relative z-10 animate-in slide-in-from-left duration-200">
            {/* Close Button */}
            <button 
              className="absolute top-6 right-4 text-neutral-400 hover:text-white" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
               <FiX size={24} />
            </button>
            <SidebarContent pathname={pathname} setIsMobileMenuOpen={setIsMobileMenuOpen} />
          </aside>
        </div>
      )}
    </>
  );
};

export default DashboardSideBar;

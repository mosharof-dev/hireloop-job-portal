"use client";
import React from "react";
import { 
  FiHome, 
  FiBriefcase, 
  FiUsers, 
  FiSettings, 
  FiCheckCircle, 
  FiX, 
  FiSearch, 
  FiBookmark, 
  FiFileText, 
  FiCreditCard, 
  FiUser,
  FiGrid,
  FiBox,
  FiDollarSign
} from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";

const recruiterNavItems = [
  { icon: FiHome, href: "/dashboard/recruiter", label: "Dashboard" },
  { icon: FiUsers, href: "/dashboard/recruiter/company", label: "My Company" },
  { icon: FiBriefcase, href: "/dashboard/recruiter/jobs", label: "Manage Jobs" },
  { icon: FiCheckCircle, href: "/dashboard/recruiter/jobs/new", label: "Applications" },
  { icon: FiSettings, href: "/dashboard/recruiter/settings", label: "Settings" },
];

const seekerNavItems = [
  { icon: FiHome, href: "/dashboard/seeker", label: "Dashboard" },
  { icon: FiSearch, href: "/dashboard/seeker/jobs", label: "Jobs" },
  { icon: FiBookmark, href: "/dashboard/seeker/saved-jobs", label: "Saved Jobs" },
  { icon: FiFileText, href: "/dashboard/seeker/applications", label: "Applications" },
  { icon: FiCreditCard, href: "/dashboard/seeker/billing", label: "Billing" },
  { icon: FiSettings, href: "/settings", label: "Settings" },
];

const adminNavItems = [
  { icon: FiGrid, href: "/dashboard/admin", label: "Dashboard" },
  { icon: FiUsers, href: "/dashboard/admin/users", label: "Users" },
  { icon: FiBox, href: "/dashboard/admin/companies", label: "Companies" },
  { icon: FiBriefcase, href: "/dashboard/admin/jobs", label: "Jobs" },
  { icon: FiDollarSign, href: "/dashboard/admin/payments", label: "Payments" },
  { icon: FiSettings, href: "/dashboard/admin/settings", label: "Settings" },
];

const getPlanBadge = (planString) => {
  const plan = (planString || "").toLowerCase();
  if (plan.includes("premium")) {
    return {
      text: "Premium Account",
      className: "text-[#F59E0B] border-[#F59E0B]/30 bg-[#F59E0B]/10",
    };
  }
  if (plan.includes("pro")) {
    return {
      text: "Pro Account",
      className: "text-[#3B82F6] border-[#3B82F6]/30 bg-[#3B82F6]/10",
    };
  }
  if (plan.includes("admin")) {
    return {
      text: "Admin Account",
      className: "text-[#10B981] border-[#10B981]/30 bg-[#10B981]/10",
    };
  }
  return {
    text: "Free Account",
    className: "text-neutral-400 border-neutral-700 bg-neutral-800/50",
  };
};

const SidebarContent = ({ pathname, setIsMobileMenuOpen, user }) => {
  const isAdmin = user?.role === "admin";
  const isRecruiter = user?.role === "recruiter";
  const navItems = isAdmin ? adminNavItems : (isRecruiter ? recruiterNavItems : seekerNavItems);
  const badge = getPlanBadge(user?.plan);

  return (
    <>
      {/* Logo */}
      <div className="px-6 h-[73px] flex items-center border-b border-neutral-800/80">
        <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)}>
          <div className="text-[26px] font-black tracking-tight flex items-center">
            <span className="text-blue-500">hire</span>
            <span className="text-orange-500">loop</span>
            <span className="text-blue-500 ml-0.5 text-3xl leading-[0] mb-2">.</span>
          </div>
        </Link>
      </div>

      {/* Profile Info */}
      <div className="px-6 py-6 border-b border-neutral-800/80 flex items-center gap-4">
        {/* Exact same Avatar logic as DashboardHeader */}
        <div className="w-10 h-10 rounded-full overflow-hidden border border-neutral-800 shrink-0 flex items-center justify-center bg-neutral-800">
          {user?.image ? (
            <Image 
              src={user.image} 
              alt="Profile" 
              width={40} 
              height={40} 
              className="w-full h-full object-cover" 
            />
          ) : (
            <FiUser className="text-neutral-400 size-6" />
          )}
        </div>
        
        <div className="flex flex-col flex-1 min-w-0" style={{ marginLeft: "12px" }}>
          <div className="text-[14px] font-bold text-white capitalize truncate leading-tight mb-1">
            {user?.name || "Loading..."}
          </div>
          <div className="text-[11px] font-medium text-neutral-500 capitalize tracking-wide truncate uppercase mb-2">
            {user?.role || "User"}
          </div>
          
          {/* Dynamic Plan Badge */}
          <div className="flex items-center">
             <span className={`text-[9px] font-black tracking-widest px-2 py-0.5 rounded uppercase border ${badge.className}`}>
               {badge.text}
             </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto flex flex-col" style={{ gap: "8px" }}>
        <span className="text-[10px] font-bold text-neutral-600 tracking-[0.2em] uppercase px-3 mb-2 block">
          Main Menu
        </span>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              href={item.href}
              key={item.label}
              onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)}
              className={`flex items-center px-4 py-3 rounded-lg text-[14px] font-semibold transition-colors duration-200 ${
                isActive
                  ? "text-white bg-[#1A1A1C] border border-neutral-800"
                  : "text-neutral-400 hover:text-white hover:bg-[#151516] border border-transparent"
              }`}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                <item.icon className={`w-full h-full ${isActive ? "text-blue-500" : "text-neutral-500"}`} />
              </div>
              <span className="truncate flex-1 leading-none pt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

const DashboardSideBar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const pathname = usePathname();
  const { data: sessionData } = useSession();
  const user = sessionData?.user;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 min-h-screen bg-[#0D0D0E] border-r border-neutral-800 flex flex-col hidden lg:flex shrink-0">
        <SidebarContent pathname={pathname} setIsMobileMenuOpen={setIsMobileMenuOpen} user={user} />
      </aside>

      {/* Mobile Drawer Sidebar */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          {/* Sidebar Drawer */}
          <aside className="w-64 h-full bg-[#0D0D0E] border-r border-neutral-800 flex flex-col relative z-10 animate-in slide-in-from-left duration-200 shadow-2xl">
            {/* Close Button */}
            <button 
              className="absolute top-6 right-4 text-neutral-400 hover:text-white" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
               <FiX size={24} />
            </button>
            <SidebarContent pathname={pathname} setIsMobileMenuOpen={setIsMobileMenuOpen} user={user} />
          </aside>
        </div>
      )}
    </>
  );
};

export default DashboardSideBar;

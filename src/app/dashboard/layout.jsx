"use client";

import DashboardSideBar from "@/components/Dashboard/DashboardSideBar";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import React, { useState } from "react";

const DashboardLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0D0D0D]">
      <DashboardSideBar 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          onMenuClick={() => setIsMobileMenuOpen(true)} 
        />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

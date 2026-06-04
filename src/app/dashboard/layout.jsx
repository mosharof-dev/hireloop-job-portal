import DashboardSideBar from "@/components/Dashboard/DashboardSideBar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen container mx-auto px-4 sm:px-6 lg:px-8">
      <DashboardSideBar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default DashboardLayout;

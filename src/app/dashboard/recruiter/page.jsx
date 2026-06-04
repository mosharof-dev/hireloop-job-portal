"use client";

import DashboardStats from "@/components/Dashboard/DashboardStats";
import { useSession } from "@/lib/auth-client";
import { h1 } from "framer-motion/client";

import React from "react";
import { FiCheckCircle, FiFileText, FiUsers, FiZap } from "react-icons/fi";

const RecruiterDashboard = () => {
  // Data for the cards
  const statsData = [
    {
      id: 1,
      title: "Total Job Posts",
      value: "48",
      icon: <FiFileText size={20} />,
    },
    {
      id: 2,
      title: "Total Applicants",
      value: "1,284",
      icon: <FiUsers size={20} />,
    },
    {
      id: 3,
      title: "Active Jobs",
      value: "18",
      icon: <FiZap size={20} />,
    },
    {
      id: 4,
      title: "Jobs Closed",
      value: "32",
      icon: <FiCheckCircle size={20} />,
    },
  ];
  const { data: sessionData, isPending } = useSession();
  const user = sessionData?.user;
  console.log(user, "user data");
  if (isPending) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome back, {user.name}</h1>
      <DashboardStats />
    </div>
  );
};

export default RecruiterDashboard;

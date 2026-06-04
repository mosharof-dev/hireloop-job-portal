
import StatCard from "@/components/Dashboard/StatCard";
import { FiFileText, FiUsers, FiZap, FiCheckCircle } from "react-icons/fi";

export default function DashboardStats() {
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

  return (
    // Background color set to black/dark for the whole dashboard area
    <div className="p-6 bg-black min-h-screen">
      {/* Mobile-first grid setup */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>
    </div>
  );
}

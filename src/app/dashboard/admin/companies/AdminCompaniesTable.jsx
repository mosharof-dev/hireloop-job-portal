"use client";

import React, { useState } from "react";
import Image from "next/image";
import { updateCompany } from "@/lib/actions/companies";
import toast from "react-hot-toast";

const StatusBadge = ({ status }) => {
  const s = status?.toLowerCase() || "pending";

  if (s === "approved") {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-sm">
        <svg width="8" height="8" viewBox="0 0 8 8" className="shrink-0" style={{ filter: 'drop-shadow(0 0 1px #10b981)' }}>
          <circle cx="4" cy="4" r="4" fill="#10b981" />
        </svg>
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Approved</span>
      </div>
    );
  }

  if (s === "rejected") {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 shadow-sm">
        <svg width="8" height="8" viewBox="0 0 8 8" className="shrink-0" style={{ filter: 'drop-shadow(0 0 4px #f43f5e)' }}>
          <circle cx="4" cy="4" r="4" fill="#f43f5e" />
        </svg>
        <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Rejected</span>
      </div>
    );
  }

  // Default to Pending
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 shadow-sm">
      <svg width="8" height="8" viewBox="0 0 8 8" className="shrink-0" style={{ filter: 'drop-shadow(0 0 4px #f59e0b)' }}>
        <circle cx="4" cy="4" r="4" fill="#f59e0b" />
      </svg>
      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Pending</span>
    </div>
  );
};

const AdminCompaniesTable = ({ initialCompanies = [] }) => {
  // Local state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalItems = initialCompanies?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const currentData =
    initialCompanies?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
    ) || [];

  const getInitials = (name) => {
    if (!name) return "NA";
    return name.substring(0, 2).toUpperCase();
  };

  const formatDate = (dateString) => {
    try {
      if (!dateString) return "N/A";
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }).format(new Date(dateString));
    } catch (e) {
      return dateString;
    }
  };

  const handleApprove = async(id) => {
    // Add your API action call here
    const res = await updateCompany(id, { status: "approved" });
    console.log(`Approved company with ID: ${id}`, res);
    if (res.matchedCount) {
      toast.success("Company approved successfully");
    }
  };

  const handleReject = async (id) => {
    // Add your API action call here
    const res = await updateCompany(id, { status: "rejected" });
    console.log(`Rejected company with ID: ${id}`, res);
    if (res.matchedCount) {
      toast.success("Company rejected successfully");
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="w-full bg-[#121214] border border-zinc-800 rounded-xl shadow-2xl overflow-hidden text-zinc-300">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800/80 text-[11px] uppercase tracking-widest text-zinc-500 bg-[#18181b]/80">
              <th className="px-6 py-4 font-medium">Company Name</th>
              <th className="px-6 py-4 font-medium">Website</th>
              <th className="px-6 py-4 font-medium">Industry</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Job Count</th>
              <th className="px-6 py-4 font-medium">Date Submitted</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {currentData.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-12 text-center text-zinc-500"
                >
                  No companies found.
                </td>
              </tr>
            ) : (
              currentData.map((company) => {
                return (
                  <tr
                    key={company._id}
                    className="hover:bg-zinc-800/30 transition-colors group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700/50 flex items-center justify-center text-sm font-bold text-zinc-300 relative overflow-hidden shadow-sm">
                          {/* Fallback initials */}
                          <span className="absolute inset-0 flex items-center justify-center">
                            {getInitials(company.name)}
                          </span>
                          {/* Logo if available */}
                          {company.logoUrl && (
                            <Image
                              src={company.logoUrl}
                              alt={company.name}
                              fill
                              sizes="40px"
                              className="object-cover relative z-10"
                              onError={(e) => {
                                e.target.style.opacity = "0";
                              }}
                            />
                          )}
                        </div>
                        <span className="font-semibold text-zinc-200 tracking-wide">
                          {company.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
                      {company.website ? (
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-zinc-200 transition-colors"
                        >
                          {company.website.replace(/^https?:\/\//, "")}
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-zinc-800/80 border border-zinc-700/50 text-zinc-300 shadow-inner">
                        {company.industry || "Unknown"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={company.status} />
                    </td>
                     <td className="px-6 py-4 whitespace-nowrap">
                     {company.appliedCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
                      {formatDate(company.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {/* Using opacity-0 group-hover:opacity-100 to show actions only on hover, as seen in some modern UIs. But wait, in the design they are always visible. Let's make them always visible but slightly muted. */}
                      <div className="flex items-center justify-end gap-2">
                        {company.status?.toLowerCase() !== "approved" && (
                          <button
                            onClick={() => handleApprove(company._id)}
                            className="px-4 py-1.5 text-xs font-semibold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 rounded-md hover:bg-emerald-500/20 transition-all active:scale-95"
                          >
                            Approve
                          </button>
                        )}
                        {company.status?.toLowerCase() !== "rejected" && (
                          <button
                            onClick={() => handleReject(company._id)}
                            className="px-4 py-1.5 text-xs font-semibold text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-md hover:bg-rose-500/20 transition-all active:scale-95"
                          >
                            Reject
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* Pagination Footer */}
        {totalItems > 0 && (
          <div className="px-6 py-4 border-t border-zinc-800 flex items-center justify-between bg-[#18181b]/60">
            <div className="text-sm text-zinc-500">
              Showing{" "}
              <span className="font-semibold text-zinc-300">
                {(currentPage - 1) * itemsPerPage + 1}-
                {Math.min(currentPage * itemsPerPage, totalItems)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-zinc-300">{totalItems}</span>{" "}
              companies
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-md text-zinc-500 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              {getPageNumbers().map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-semibold transition-colors ${
                    currentPage === pageNum
                      ? "bg-white text-black shadow-md"
                      : "text-zinc-500 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-md text-zinc-500 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCompaniesTable;

"use client";
import { updateUserRole } from "@/lib/actions/users";
import React, { useState } from "react";
import { FiUser, FiBriefcase, FiShield } from "react-icons/fi";

const getInitials = (name) => {
  if (!name) return "U";
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name[0].toUpperCase();
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const RoleBadge = ({ role }) => {
  const r = role?.toLowerCase();

  let Icon = FiUser;
  let colorClass = "text-zinc-300";
  let bgClass = "bg-white/5";
  let borderClass = "border-transparent";

  if (r === "recruiter") {
    Icon = FiBriefcase;
    colorClass = "text-blue-400";
    bgClass = "bg-blue-500/10";
    borderClass = "border-blue-500/20";
  } else if (r === "admin") {
    Icon = FiShield;
    colorClass = "text-amber-500";
    bgClass = "bg-amber-500/10";
    borderClass = "border-amber-500/20";
  } else {
    colorClass = "text-zinc-300";
    bgClass = "bg-zinc-500/10";
    borderClass = "border-zinc-500/20";
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border ${borderClass} ${bgClass} ${colorClass} text-[12px] font-medium tracking-wide`}
    >
      <Icon className="w-3.5 h-3.5" />
      <span className="capitalize">{role || "Seeker"}</span>
    </span>
  );
};

const StatusBadge = ({ status }) => {
  // Mocking status logic. If not provided, we assume 'Active' or derive from some field.
  const s = status?.toLowerCase() || "active";
  const isActive = s === "active";

  const colorClass = isActive ? "text-emerald-500" : "text-red-500";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-transparent ${colorClass}`}
    >
      <svg viewBox="0 0 8 8" className="w-2 h-2 shrink-0">
        <circle cx="4" cy="4" r="4" fill="currentColor" />
      </svg>
      <span className="text-[12px] font-medium capitalize">{s}</span>
    </span>
  );
};

export default function AdminUserTable({ users = [] }) {
  // Modern approach: Store only the optimistic overrides instead of syncing full state with useEffect.
  const [optimisticUpdates, setOptimisticUpdates] = useState({});
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    user: null,
    newRole: null,
  });

  // Pagination state (mocked for now based on image)
  const [currentPage, setCurrentPage] = useState(1);
  const totalUsers = users.length;
  const itemsPerPage = 4;
  const totalPages = Math.ceil(totalUsers / itemsPerPage) || 1;

  const getUserId = (user) => user?._id?.$oid || user?._id || user?.id;

  // Apply optimistic updates during render
  const displayUsers = users
    .map((user) => {
      const userId = getUserId(user);
      return { ...user, ...(optimisticUpdates[userId] || {}) };
    })
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const executeRoleChange = async (user, newRole) => {
    const userId = getUserId(user);

    // Optimistic update
    setOptimisticUpdates((prev) => ({
      ...prev,
      [userId]: { ...prev[userId], role: newRole },
    }));

    try {
      const data = await updateUserRole(userId, newRole);
      console.log("Role updated successfully:", data);

      // Clear optimistic update after success to rely on server data
      setOptimisticUpdates((prev) => {
        const next = { ...prev };
        delete next[userId];
        return next;
      });
    } catch (error) {
      console.error("Failed to update role:", error);
      alert("Failed to update role. Please try again.");

      // Revert optimistic update on failure
      setOptimisticUpdates((prev) => {
        const next = { ...prev };
        delete next[userId];
        return next;
      });
    }
  };

  const handleRoleChangeWithWarning = async (user, newRole) => {
    const currentRole = user.role?.toLowerCase();

    // Warning when demoting an admin
    if (currentRole === "admin" && newRole !== "admin") {
      setConfirmModal({ isOpen: true, user, newRole });
      return;
    }

    await executeRoleChange(user, newRole);
  };

  const handleStatusChange = async (userId, newStatus) => {
    // Optimistic update
  };

  return (
    <div className="w-full border border-white/8 bg-[#121214] rounded-2xl overflow-hidden shadow-2xl">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse min-w-200">
          <thead>
            <tr className="border-b border-white/8 bg-white/2">
              <th className="py-4 px-6 text-[13px] font-semibold tracking-wide text-zinc-400 w-[25%]">
                User Name
              </th>
              <th className="py-4 px-6 text-[13px] font-semibold tracking-wide text-zinc-400 w-[25%]">
                Email Address
              </th>
              <th className="py-4 px-6 text-[13px] font-semibold tracking-wide text-zinc-400 w-[15%]">
                Role
              </th>
              <th className="py-4 px-6 text-[13px] font-semibold tracking-wide text-zinc-400 w-[15%]">
                Join Date
              </th>
              <th className="py-4 px-6 text-[13px] font-semibold tracking-wide text-zinc-400 w-[10%]">
                Status
              </th>
              <th className="py-4 px-6 text-[13px] font-semibold tracking-wide text-zinc-400 w-[10%] text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {displayUsers.map((user) => (
              <tr
                key={user.id || user._id}
                className="hover:bg-white/2 transition-colors group"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 shrink-0 bg-white/5 text-zinc-300 rounded-full flex items-center justify-center text-[13px] font-medium">
                      {/* Could use an image if user.avatar exists */}
                      {getInitials(user.name)}
                    </div>
                    <span className="text-zinc-200 text-[14px] font-medium truncate">
                      {user.name || "Unknown User"}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-zinc-400 text-[14px]">
                    {user.email}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <RoleBadge role={user.role} />
                </td>
                <td className="py-4 px-6">
                  <span className="text-zinc-400 text-[14px]">
                    {formatDate(user.createdAt)}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <StatusBadge status={user.status || "Active"} />
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2 flex-wrap max-w-62.5 ml-auto">
                    {user.role?.toLowerCase() !== "admin" && (
                      <button
                        onClick={() =>
                          handleRoleChangeWithWarning(user, "admin")
                        }
                        className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 hover:bg-amber-500/20 text-[11px] font-semibold transition-all"
                      >
                        Make Admin
                      </button>
                    )}
                    {user.role?.toLowerCase() !== "recruiter" && (
                      <button
                        onClick={() =>
                          handleRoleChangeWithWarning(user, "recruiter")
                        }
                        className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 text-[11px] font-semibold transition-all"
                      >
                        Make Recruiter
                      </button>
                    )}
                    {user.role?.toLowerCase() !== "seeker" && (
                      <button
                        onClick={() =>
                          handleRoleChangeWithWarning(user, "seeker")
                        }
                        className="px-3 py-1 rounded-full bg-zinc-500/10 border border-zinc-500/20 text-zinc-300 hover:bg-zinc-500/20 text-[11px] font-semibold transition-all"
                      >
                        Make Seeker
                      </button>
                    )}
                    <button
                      onClick={() =>
                        handleStatusChange(
                          getUserId(user),
                          user.status?.toLowerCase() === "suspended"
                            ? "active"
                            : "suspended",
                        )
                      }
                      className={`text-[12px] font-medium ${user.status?.toLowerCase() === "suspended" ? "text-emerald-500 hover:text-emerald-400" : "text-red-500 hover:text-red-400"} transition-colors`}
                    >
                      {user.status?.toLowerCase() === "suspended"
                        ? "Activate"
                        : "Suspend"}
                    </button>
                    {user.status?.toLowerCase() === "suspended" && (
                      <button className="text-[12px] font-medium text-zinc-400 hover:text-white transition-colors">
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {displayUsers.length === 0 && (
              <tr>
                <td colSpan="6" className="py-8 text-center text-zinc-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="border-t border-white/8 px-6 py-4 flex items-center justify-between bg-[#121214]">
        <div className="text-[12px] text-zinc-500 font-medium">
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalUsers)}{" "}
          to {Math.min(currentPage * itemsPerPage, totalUsers)} of {totalUsers}{" "}
          users
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-white disabled:opacity-50 disabled:hover:text-zinc-500 transition-colors"
          >
            &lt;
          </button>

          {/* Mocked pages display for now, mimicking design */}
          <button
            className={`w-8 h-8 flex items-center justify-center rounded-md text-[13px] font-medium transition-colors ${currentPage === 1 ? "bg-white text-black" : "text-zinc-400 hover:bg-white/5 hover:text-white"}`}
          >
            1
          </button>
          {totalPages >= 2 && (
            <button
              className={`w-8 h-8 flex items-center justify-center rounded-md text-[13px] font-medium transition-colors ${currentPage === 2 ? "bg-white text-black" : "text-zinc-400 hover:bg-white/5 hover:text-white"}`}
            >
              2
            </button>
          )}
          {totalPages >= 3 && (
            <button
              className={`w-8 h-8 flex items-center justify-center rounded-md text-[13px] font-medium transition-colors ${currentPage === 3 ? "bg-white text-black" : "text-zinc-400 hover:bg-white/5 hover:text-white"}`}
            >
              3
            </button>
          )}
          {totalPages > 3 && (
            <>
              <span className="w-8 h-8 flex items-center justify-center text-zinc-500 text-[13px]">
                ...
              </span>
              <button
                className={`w-8 h-8 flex items-center justify-center rounded-md text-[13px] font-medium transition-colors ${currentPage === totalPages ? "bg-white text-black" : "text-zinc-400 hover:bg-white/5 hover:text-white"}`}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-white disabled:opacity-50 disabled:hover:text-zinc-500 transition-colors"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Admin Demotion Warning Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#121214] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4 text-amber-500">
              <FiShield className="w-6 h-6" />
              <h3 className="text-lg font-semibold text-white">
                Remove Admin Privileges?
              </h3>
            </div>
            <p className="text-zinc-400 text-[14px] mb-6 leading-relaxed">
              You are about to change the role of{" "}
              <strong className="text-white font-semibold">
                {confirmModal.user?.name}
              </strong>{" "}
              from Admin to{" "}
              <strong className="text-white font-semibold capitalize">
                {confirmModal.newRole}
              </strong>
              . They will lose access to all admin-level features. Are you sure?
            </p>
            <div className="flex items-center justify-end gap-3 mt-8">
              <button
                onClick={() =>
                  setConfirmModal({ isOpen: false, user: null, newRole: null })
                }
                className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  executeRoleChange(confirmModal.user, confirmModal.newRole);
                  setConfirmModal({ isOpen: false, user: null, newRole: null });
                }}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20 hover:bg-amber-500/20 transition-colors"
              >
                Yes, Demote Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

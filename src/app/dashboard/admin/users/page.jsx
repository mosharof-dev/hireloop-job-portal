import { getUserList } from "@/lib/api/users";
import React from "react";
import AdminUserTable from "@/components/Dashboard/AdminUserTable";

export const metadata = {
  title: "Manage Users | Hireloop Admin",
};

const AdminUserPage = async () => {
  const data = await getUserList();
  const users = data?.users || [];

  return (
    <div className="w-full h-full p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            User Management
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Manage all seekers and recruiters on the platform.
          </p>
        </div>
        <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-zinc-300">
          Total Users: {users.length}
        </div>
      </div>

      <AdminUserTable users={users} />
    </div>
  );
};

export default AdminUserPage;

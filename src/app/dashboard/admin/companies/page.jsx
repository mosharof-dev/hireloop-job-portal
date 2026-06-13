import React from 'react';

import AdminCompaniesTable from './AdminCompaniesTable';
import { getCompanies } from '@/lib/api/companies';

const AdminApprovalCompaniesPage = async () => {
    const companies = await getCompanies();
    
    return (
        <div className="p-6 sm:p-10 bg-[#0d0d0e] min-h-[calc(100vh-4rem)] text-white">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Company Approvals</h1>
                    <p className="text-zinc-400">Review and manage company profiles on the platform.</p>
                </div>
                
                <AdminCompaniesTable initialCompanies={companies} />
            </div>
        </div>
    );
};

export default AdminApprovalCompaniesPage;
import React from 'react';
import CompanyProfile from './CompanyProfile';
import { getUserSession } from '@/lib/core/session';
import { getCompanyProfile } from '@/lib/api/companies';

const CompanyPage =  async () => {
    const user = await getUserSession();
    const company = await getCompanyProfile(user.id);

    console.log('Company Page User:', user);
    console.log('Company Page Company:', company);
    return (
        <div>
            <CompanyProfile recruiter={user} recruiterCompany={company} />
        </div>
    );
};

export default CompanyPage;
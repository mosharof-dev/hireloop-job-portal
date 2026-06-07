import React from 'react';
import PostJobForm from './PostJobForm';
import { getLoggedInRecruiterCompany } from '@/lib/api/companies';

const PostJobPage = async () => {
    const company = await getLoggedInRecruiterCompany();

    console.log('Post Job Page company:', company);
    return (
        <div>
            <PostJobForm company={company} />
        </div>
    );
};

export default PostJobPage;
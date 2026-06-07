import { getJobById } from '@/lib/api/jobs';
import React from 'react';

const JobDetailsPage = async ({ params }) => {
    const { id } = await params;

    const job = await getJobById(id);
    console.log(job, "job details data");

    return (
        <div>
            <h1>Job Details</h1>
            <p>Job ID: {id}</p>
            <p>Coming soon... Job details page</p>
        </div>
    );
};

export default JobDetailsPage;
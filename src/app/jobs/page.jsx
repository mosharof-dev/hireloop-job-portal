import { getAllJobs } from '@/lib/api/jobs';
import React from 'react';

const GetAllJobs = async () => {

    const jobs = await getAllJobs();
    
    console.log("All Jobs:", jobs)

    return (
        <div>
            <h1>All Jobs {jobs.length}</h1>
        </div>
    );
};

export default GetAllJobs;
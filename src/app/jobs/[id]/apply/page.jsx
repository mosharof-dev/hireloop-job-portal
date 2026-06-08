import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';

const ApplyPage = async ({ params }) => {
    const {id} = await params;
    const user = await getUserSession();

    if (!user) {
        redirect(`/signin?redirect=/jobs/${id}/apply`);
    }
    return (
        <div>
           Coming Soon...
        </div>
    );
};

export default ApplyPage;
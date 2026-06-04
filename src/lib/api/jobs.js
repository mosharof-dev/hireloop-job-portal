
 const API_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000'

// get company all jobs function
export const getCompanyJobs = async (companyId, status= 'active') => {
    try {
        const res = await fetch(`${API_URL}/api/jobs?companyId=${companyId}&status=${status}`);
        const data = await res.json();
        return data;
    }
    catch (error) {
        console.error('Error fetching company jobs:', error);
        throw error;
    }
};